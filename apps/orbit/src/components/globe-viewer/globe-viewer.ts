import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import * as THREE from "three";
import { Box3, MathUtils, Matrix4, Quaternion, Raycaster, Sphere, Spherical, Vector2, Vector3, Vector4 } from "three";
// https://visibleearth.nasa.gov/images/73909/december-blue-marble-next-generation-w-topography-and-bathymetry/73912l
import "@vechro/turtle";
import type { MenuList } from "@vechro/turtle";
import CameraControls from "camera-controls";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import earthUvMap from "../../assets/earth-uv-map.jpg";
import cross from "../../assets/icons/cross.svg?raw";
import edit from "../../assets/icons/edit.svg?raw";
import pin from "../../assets/icons/pin.svg?raw";
import "../../extension";
import { DatabaseMixin, Marker } from "../database-mixin";
import { styles } from "./globe-viewer.styles";
import atmosphereFrag from "./shaders/atmosphere.frag?raw";
import atmosphereVert from "./shaders/atmosphere.vert?raw";
import sphereFrag from "./shaders/sphere.frag?raw";
import sphereVert from "./shaders/sphere.vert?raw";

interface MarkerMesh extends Marker {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
}

@customElement("globe-viewer")
export class GlobeViewer extends DatabaseMixin(LitElement) {
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
  private camera = new THREE.PerspectiveCamera(67, innerWidth / innerHeight, 0.1, 1000);
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
    }),
  );

  atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    }),
  );

  globeGroup = new THREE.Group();
  markerGroup = new THREE.Group();

  clickPointer = new Vector2();
  grabPointer = new Vector2();
  raycaster = new THREE.Raycaster();

  @property()
  markerList: MarkerMesh[] = [];

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: true,
    });
    addEventListener("resize", this.onResize);
    this.onResize();

    this.atmosphere.scale.set(1.1, 1.1, 1.1);
    this.scene.add(this.atmosphere);

    this.globeGroup.add(this.sphere);
    this.scene.add(this.globeGroup);
    this.scene.add(this.markerGroup);

    this.camera.position.z = 10;

    this.controls = new CameraControls(this.camera, this.canvas);
    this.controls.dampingFactor = 0.1;
    this.controls.draggingDampingFactor = 0.1;
    this.controls.mouseButtons.right = CameraControls.ACTION.NONE;
    this.controls.touches.three = CameraControls.ACTION.NONE;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 15;

    this.readMarkersFromDatabase();

    this.paint();
  }

  readMarkersFromDatabase = () => {
    this.database?.then(async (db) => {
      const markers = (await db.getAllFromIndex("markers", "id")) as Marker[];
      this.markerGroup.clear();
      this.markerList = markers.map((marker) => ({
        ...marker,
        mesh: this.createDotAt(marker.position),
      }));
      this.markerList.reverse();
    });
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener("resize", this.onResize);
  }

  private onResize = () => {
    this.renderer?.setSize(innerWidth, innerHeight);
    this.renderer?.setPixelRatio(devicePixelRatio);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  };

  protected paint() {
    requestAnimationFrame(this.paint.bind(this));
    const delta = this.clock.getDelta();
    this.controls?.update(delta);
    this.renderer?.render(this.scene, this.camera);
  }

  private onGrabStart = (event: PointerEvent) => {
    if (event.button === 0) {
      this.grabPointer = new Vector2(...event.normalizedPosition());
      this.canvas.style.cursor = "grabbing";
    }
  };

  private onGrabEnd = (event: PointerEvent) => {
    this.canvas.style.cursor = "default";
    const endPosition = new Vector2(...event.normalizedPosition());
    if (this.grabPointer.distanceToSquared(endPosition) < 0.01) {
      this.raycaster.setFromCamera(endPosition, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.markerList.map(({ mesh }) => mesh),
        false,
      );
      const point = intersects.shift()?.point;
      if (!point) return;
      this.orientCameraToPoint(point);
    }
  };

  private static dotMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xff5000 }),
  );

  private createDotAt = (position: Vector3) => {
    const mesh = GlobeViewer.dotMesh.clone();
    mesh.position.copy(position);
    this.markerGroup.add(mesh);
    return mesh;
  };

  private addPoint = (event: PointerEvent) => {
    if (event.button !== 0) return;
    this.raycaster.setFromCamera(this.clickPointer, this.camera);
    const intersects = this.raycaster.intersectObjects([this.sphere], false);
    const point = intersects.shift()?.point;
    if (!point) return;
    const marker: Marker = {
      id: Math.floor(Math.random() * 1_000_000_000),
      name: `Point #${this.markerList.length}`,
      position: point,
    };
    this.database?.then((db) => db.add("markers", marker));
    this.readMarkersFromDatabase();
  };

  private handleClickPointer = (event: MouseEvent) => {
    this.clickPointer = new Vector2(...event.normalizedPosition());
  };

  private resetClickPointer = () => {
    this.clickPointer = new Vector2();
  };

  orientCameraToPoint = (point: Vector3) => {
    const { theta, phi } = new Spherical().setFromVector3(point);
    this.controls?.rotateTo(theta, phi, true);
    this.controls?.dollyTo(7, true);
  };

  private orientCameraToMarker = ({ mesh }: MarkerMesh) => {
    this.orientCameraToPoint(mesh.position);
  };

  private handleTitleRename = (event: KeyboardEvent, marker: Marker) => {
    if (!event.currentTarget) return;
    const target = event.currentTarget as EventTarget & HTMLInputElement;
    if (event.key === "Enter" || event.key === "Escape") {
      target.blur();
    }
    this.database?.then((db) => {
      db.put("markers", {
        id: marker.id,
        position: marker.position,
        name: target.value,
      });
    });
  };

  private handlePointClose = (event: PointerEvent, marker: MarkerMesh) => {
    event.stopPropagation();
    marker.mesh.removeFromParent();
    this.database?.then((db) => db.delete("markers", marker.id))?.then(() => this.readMarkersFromDatabase());
  };

  pointListElements() {
    return html`
      ${
      this.markerList.map(
        (point) =>
          html`
            <menu-item>
              <input
                type="text"
                class="marker-title"
                maxlength="32"
                value=${point.name}
                @keydown=${(event: KeyboardEvent) => this.handleTitleRename(event, point)}
              />
              <div slot="interaction-bar">
                <span class="bar-item">${unsafeSVG(edit)}</span>
                <span class="bar-item" @pointerup=${() => this.orientCameraToMarker(point)}>${unsafeSVG(pin)}</span>
                <span class="bar-item" @pointerup=${(event: PointerEvent) => this.handlePointClose(event, point)}>
                  ${unsafeSVG(cross)}
                </span>
              </div>
            </menu-item>
          `,
      )
    }
    `;
  }

  render() {
    return html`
      <context-menu @open=${this.handleClickPointer} @close=${this.resetClickPointer}>
        <menu-list class="context-menu" slot="context-menu">
          <menu-item @pointerdown=${this.addPoint}>Add point</menu-item>
        </menu-list>
        <canvas @pointerdown=${this.onGrabStart} @pointerup=${this.onGrabEnd} @pointerout=${this.onGrabEnd}></canvas>
        <menu-panel class="points-menu">
          <h3 class="title" slot="header">Points</h3>
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