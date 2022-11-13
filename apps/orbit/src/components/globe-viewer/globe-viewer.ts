import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import * as THREE from "three";
import { PerspectiveCamera, Spherical, Vector2, Vector3 } from "three";
// https://visibleearth.nasa.gov/images/73909/december-blue-marble-next-generation-w-topography-and-bathymetry/73912l
import "@google/model-viewer";
import { $controls } from "@google/model-viewer/lib/features/controls";
import type { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import type { SmoothControls } from "@google/model-viewer/lib/three-components/SmoothControls";
import "@vechro/turtle";
import type { MenuList } from "@vechro/turtle";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import earthUvMap from "../../assets/earth-uv-map.jpg";
import cross from "../../assets/icons/cross.svg?raw";
import edit from "../../assets/icons/edit.svg?raw";
import pin from "../../assets/icons/pin.svg?raw";
import "../../extension";
import { GlobeRenderer } from "../../utilities/GlobeRenderer";
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

  @query("canvas", true)
  canvas!: HTMLCanvasElement;

  @query("model-viewer", true)
  modelViewer!: ModelViewerElement;

  @query(".points-menu", true)
  pointsMenu!: MenuList;

  private camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.01, 1000);
  private controls!: SmoothControls;
  private scene = new THREE.Scene();
  private globeRenderer!: GlobeRenderer;
  private renderer!: THREE.WebGLRenderer;

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

    this.globeRenderer = new GlobeRenderer(
      this.renderer,
      this.scene,
      this.camera,
    );

    this.modelViewer.registerRenderer(this.globeRenderer);
    this.controls = (this.modelViewer as never)[$controls];

    this.readMarkersFromDatabase();
  }

  private updateCameraFieldOfView = () => {
    this.camera.fov = this.modelViewer.getFieldOfView();
    this.camera.updateProjectionMatrix();
  };

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
    this.controls.setOrbit(theta, phi, 7);
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
                <span class="bar-item" @pointerup=${() => this.orientCameraToPoint(point.position)}>${
            unsafeSVG(pin)
          }</span>
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
        <model-viewer loading="eager" camera-controls disable-pan src="." interaction-prompt="none" @camera-change=${this.updateCameraFieldOfView}>
          <canvas slot="canvas"></canvas>
        </model-viewer>
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
