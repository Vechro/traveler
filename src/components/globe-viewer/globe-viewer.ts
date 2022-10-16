import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import * as THREE from "three";
import {
  Box3,
  MathUtils,
  Matrix4,
  Quaternion,
  Raycaster,
  Sphere,
  Spherical,
  Vector2,
  Vector3,
  Vector4,
} from "three";
// https://visibleearth.nasa.gov/images/73909/december-blue-marble-next-generation-w-topography-and-bathymetry/73912l
import CameraControls from "camera-controls";
import earthUvMap from "../../assets/earth-uv-map.jpg";
import "../../extension";
import { MenuList } from "../menu-list";
import { styles } from "./globe-viewer.styles";
import atmosphereFrag from "./shaders/atmosphere.frag?raw";
import atmosphereVert from "./shaders/atmosphere.vert?raw";
import sphereFrag from "./shaders/sphere.frag?raw";
import sphereVert from "./shaders/sphere.vert?raw";

type Point = {
  id: number;
  name: string;
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
};

@customElement("globe-viewer")
export class GlobeViewer extends LitElement {
  static styles = styles;

  constructor() {
    super();
    CameraControls.install({
      THREE: {
        Vector2,
        Vector3,
        Vector4,
        Quaternion,
        Matrix4,
        Spherical,
        Box3,
        Sphere,
        Raycaster,
        MathUtils: {
          DEG2RAD: MathUtils.DEG2RAD,
          clamp: MathUtils.clamp,
        },
      },
    });
  }

  @query("canvas", true)
  canvas!: HTMLCanvasElement;

  @query(".points-menu", true)
  pointsMenu!: MenuList;

  private clock = new THREE.Clock();
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    67,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  private controls?: CameraControls;
  private renderer?: THREE.WebGLRenderer;

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

  clickPointer = new Vector2();
  grabPointer = new Vector2();
  raycaster = new THREE.Raycaster();

  @property()
  pointsList: Point[] = [];

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true,
    });
    addEventListener("resize", this.onResize, false);
    this.onResize();

    this.atmosphere.scale.set(1.1, 1.1, 1.1);
    this.scene.add(this.atmosphere);

    this.group.add(this.sphere);
    this.scene.add(this.group);

    this.camera.position.z = 10;

    this.controls = new CameraControls(this.camera, this.canvas);
    this.controls.dampingFactor = 0.1;
    this.controls.draggingDampingFactor = 0.1;
    this.controls.mouseButtons.right = CameraControls.ACTION.NONE;
    this.controls.touches.three = CameraControls.ACTION.NONE;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 15;

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
    const delta = this.clock.getDelta();
    this.controls?.update(delta);
    this.renderer?.render(this.scene, this.camera);
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
      new THREE.SphereGeometry(0.03, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xff5000 })
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
    this.controls?.rotateTo(spherical.theta, spherical.phi, true);
  };

  private handlePointClose = (point: Point) => {
    this.scene.remove(point.mesh);
    this.pointsList = this.pointsList.filter((p) => p.id !== point.id);
  };

  pointListElements() {
    return html`
      ${this.pointsList.map(
        (point) =>
          html`
            <menu-item
              @pointerup=${() => this.orientPointTowardCamera(point)}
              .closeable=${true}
              @close=${() => this.handlePointClose(point)}
            >
              ${point.name}
            </menu-item>
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
        <menu-list slot="menu-list">
          <menu-item @pointerdown=${this.addPoint}>Add point</menu-item>
        </menu-list>
        <canvas
          @pointerdown=${this.onGrabStart}
          @pointerup=${this.onGrabEnd}
          @pointerout=${this.onGrabEnd}
        ></canvas>
        <menu-panel class="points-menu">
          <h3 slot="header">Points</h3>
          <menu-list>${this.pointListElements()}</menu-list>
        </menu-panel>
      </context-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "globe-viewer": GlobeViewer;
  }
}
