import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import * as THREE from "three";
import { Spherical, Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// https://visibleearth.nasa.gov/images/73909/december-blue-marble-next-generation-w-topography-and-bathymetry/73912l
import earthUvMap from "../../assets/earth-uv-map.jpg";
import "../../extension";
import { MenuList } from "../menu-list";
import { styles } from "./globe-viewer.styles";
import atmosphereFrag from "./shaders/atmosphere.frag";
import atmosphereVert from "./shaders/atmosphere.vert";
import sphereFrag from "./shaders/sphere.frag";
import sphereVert from "./shaders/sphere.vert";

type Point = {
  id: number;
  name: string;
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
};

@customElement("globe-viewer")
export class GlobeViewer extends LitElement {
  static styles = styles;

  @query("canvas", true)
  canvas!: HTMLCanvasElement;

  @query(".point-list-menu", true)
  pointListMenu!: MenuList;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(67, innerWidth / innerHeight, 0.1, 1000);
  renderer?: THREE.WebGLRenderer;
  controls?: OrbitControls;

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.ShaderMaterial({
      vertexShader: sphereVert,
      fragmentShader: sphereFrag,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(earthUvMap),
        },
      },
    })
  );

  atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );

  group = new THREE.Group();

  clickPointer = new THREE.Vector2();
  grabPointer = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  @property()
  pointsList: Point[] = [];

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: false,
    });
    addEventListener("resize", this.onResize, false);
    this.onResize();

    this.atmosphere.scale.set(1.1, 1.1, 1.1);
    this.scene.add(this.atmosphere);

    this.group.add(this.sphere);
    this.scene.add(this.group);

    this.camera.position.z = 10;

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.enablePan = false;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 15;
    this.controls.rotateSpeed = 0.5;

    this.paint();
  }

  private onResize = () => {
    this.renderer?.setSize(innerWidth, innerHeight);
    this.renderer?.setPixelRatio(devicePixelRatio);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  };

  paint() {
    requestAnimationFrame(this.paint.bind(this));
    this.renderer?.render(this.scene, this.camera);
    this.controls?.update();
  }

  private onGrabStart = (event: PointerEvent) => {
    if (event.button === 0) {
      this.canvas.style.cursor = "grabbing";
    }
  };

  private onGrabEnd = () => {
    this.canvas.style.cursor = "default";
  };

  private addPoint = () => {
    this.raycaster.setFromCamera(this.clickPointer, this.camera);
    const intersects = this.raycaster.intersectObjects([this.sphere], false);
    const point = intersects.shift()?.point;
    if (!point) {
      return;
    }
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff7000 })
    );
    dot.position.copy(point);
    this.scene.add(dot);
    this.pointsList = [
      ...this.pointsList,
      {
        id: this.pointsList.length,
        name: `Point #${this.pointsList.length}`,
        mesh: dot,
      },
    ];
  };

  private handleClickPointer = (event: MouseEvent) => {
    this.clickPointer = new Vector2(...event.normalizedPosition());
  };

  private resetClickPointer = () => {
    this.clickPointer = new Vector2();
  };

  private orientPointTowardCamera = (point: Point) => {
    const spherical = new Spherical().setFromVector3(point.mesh.position);
    this.controls?.object.position.setFromSphericalCoords(
      this.controls.getDistance(),
      spherical.phi,
      spherical.theta
    );
  };

  pointListElements() {
    return html`
      ${this.pointsList.map(
        (point) =>
          html`
            <div @pointerup=${() => this.orientPointTowardCamera(point)}>
              ${point.name}
            </div>
          `
      )}
    `;
  }

  render() {
    return html`
      <context-menu
        @open=${this.handleClickPointer}
        @close=${this.resetClickPointer}
      >
        <div slot="menu-items">
          <context-menu-item @pointerdown=${this.addPoint}>
            Add point
          </context-menu-item>
        </div>
        <canvas
          @pointerdown=${this.onGrabStart}
          @pointerup=${this.onGrabEnd}
          @pointerout=${this.onGrabEnd}
        ></canvas>
        <menu-list class="point-list-menu">
          ${this.pointListElements()}
        </menu-list>
      </context-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "globe-viewer": GlobeViewer;
  }
}
