import "@google/model-viewer";
import type { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import { toVector3D } from "@google/model-viewer/lib/model-viewer-base";
import "@vechro/turtle";
import type { MenuList } from "@vechro/turtle";
import { html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import {
  AdditiveBlending,
  BackSide,
  Group,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Spherical,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
// https://visibleearth.nasa.gov/images/73909/december-blue-marble-next-generation-w-topography-and-bathymetry/73912l
import earthUvMap from "../../assets/earth-uv-map.jpg";
import cross from "../../assets/icons/cross.svg?raw";
import edit from "../../assets/icons/edit.svg?raw";
import pin from "../../assets/icons/pin.svg?raw";
import { MouseEventX } from "../../extension";
import { GlobeRenderer } from "../../utilities/GlobeRenderer";
import { DatabaseMixin, Marker } from "../database-mixin";
import { styles } from "./globe-viewer.styles";
import atmosphereFrag from "./shaders/atmosphere.frag?raw";
import atmosphereVert from "./shaders/atmosphere.vert?raw";
import sphereFrag from "./shaders/sphere.frag?raw";
import sphereVert from "./shaders/sphere.vert?raw";

@customElement("globe-viewer")
export class GlobeViewer extends DatabaseMixin(LitElement) {
  static styles = styles;

  @query("canvas", true)
  canvas!: HTMLCanvasElement;

  @query("model-viewer", true)
  modelViewer!: ModelViewerElement;

  @query(".points-menu", true)
  pointsMenu!: MenuList;

  private camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.01,
    1000,
  );
  private scene = new Scene();
  private globeRenderer!: GlobeRenderer;
  private renderer!: WebGLRenderer;

  sphere = new Mesh(
    new SphereGeometry(5, 64, 64),
    new ShaderMaterial({
      vertexShader: sphereVert,
      fragmentShader: sphereFrag,
      uniforms: {
        globeTexture: {
          value: new TextureLoader().load(earthUvMap),
        },
      },
    }),
  );

  atmosphere = new Mesh(
    new SphereGeometry(5, 64, 64),
    new ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      blending: AdditiveBlending,
      side: BackSide,
    }),
  );

  globeGroup = new Group();

  private clickPointer = new Vector2();
  private raycaster = new Raycaster();

  @state()
  markerList: Marker[] = [];

  firstUpdated() {
    this.renderer = new WebGLRenderer({
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

    this.globeRenderer = new GlobeRenderer(
      this.renderer,
      this.scene,
      this.camera,
    );

    this.modelViewer.registerRenderer(this.globeRenderer);

    this.readMarkersFromDatabase();
  }

  private updateCameraFieldOfView = () => {
    this.camera.fov = this.modelViewer.getFieldOfView();
    this.camera.updateProjectionMatrix();
  };

  private readMarkersFromDatabase = async () => {
    return this.database?.then(async (db) => {
      const markers = await db.getAllFromIndex("markers", "id");
      this.markerList = markers.map((marker) => ({
        ...marker,
        position: new Vector3().copy(marker.position),
      }));
      this.markerList.reverse();
    });
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    removeEventListener("resize", this.onResize);
    this.renderer.dispose();
  }

  private onResize = () => {
    this.renderer?.setSize(innerWidth, innerHeight);
    this.renderer?.setPixelRatio(devicePixelRatio);
  };

  private addPoint = (event: PointerEvent) => {
    if (event.button !== 0) return;
    this.raycaster.setFromCamera(this.clickPointer, this.camera);
    const intersects = this.raycaster.intersectObjects([this.sphere], false);
    const point = intersects.shift()?.point;
    if (!point) return;
    const marker: Marker = {
      id: self.crypto.randomUUID(),
      name: `Point #${this.markerList.length}`,
      position: point,
    };
    this.database
      ?.then((db) => db.add("markers", marker))
      .then(() => this.readMarkersFromDatabase());
  };

  private handleClickPointer = (event: MouseEvent) => {
    this.clickPointer = new Vector2(...MouseEventX.from(event).normalizedPosition());
  };

  private resetClickPointer = () => {
    this.clickPointer = new Vector2();
  };

  orientCameraToPoint = (point: Vector3) => {
    const { theta, phi } = new Spherical().setFromVector3(point);
    this.modelViewer.cameraOrbit = `${theta}rad ${phi}rad 7m`;
  };

  private handleTitleRename = (event: KeyboardEvent, marker: Marker) => {
    if (!event.currentTarget) return;
    const target = event.currentTarget as EventTarget & HTMLInputElement;
    if (event.key === "Enter" || event.key === "Escape") {
      target.blur();
      this.database
        ?.then((db) => {
          db.put("markers", {
            id: marker.id,
            position: marker.position,
            name: target.value,
          });
        })
        .then(() => this.readMarkersFromDatabase());
    }
  };

  private handlePointClose = (event: PointerEvent, marker: Marker) => {
    event.stopPropagation();
    this.database
      ?.then((db) => db.delete("markers", marker.id))
      .then(() => this.readMarkersFromDatabase());
  };

  pointListElements = () =>
    repeat(
      this.markerList,
      ({ id }) => id,
      (marker) =>
        html`
          <menu-item>
            <input
              type="text"
              class="marker-title"
              maxlength="32"
              value=${marker.name}
              @keydown=${(event: KeyboardEvent) => this.handleTitleRename(event, marker)}
            />
            <div slot="interaction-bar">
              <span class="bar-item">${unsafeSVG(edit)}</span>
              <span
                class="bar-item"
                @pointerup=${() => this.orientCameraToPoint(marker.position)}
                >${unsafeSVG(pin)}</span
              >
              <span
                class="bar-item"
                @pointerup=${(event: PointerEvent) => this.handlePointClose(event, marker)}
              >
                ${unsafeSVG(cross)}
              </span>
            </div>
          </menu-item>
        `,
    );

  hotspotElements = () =>
    repeat(
      this.markerList,
      ({ id }) => id,
      ({ id, name, position }) =>
        html` <button
          class="hotspot"
          slot="hotspot-${id}"
          @click=${() => this.orientCameraToPoint(position)}
          data-position=${toVector3D(position).toString()}
          data-normal=${toVector3D(position).toString()}
        >
          <div class="annotation">${name}</div>
        </button>`,
    );

  render() {
    return html`
      <context-menu
        @open=${this.handleClickPointer}
        @close=${this.resetClickPointer}
      >
        <menu-list class="context-menu" slot="context-menu">
          <menu-item @pointerdown=${this.addPoint}>Add point</menu-item>
        </menu-list>
        <model-viewer
          loading="eager"
          camera-controls
          disable-pan
          src="."
          interaction-prompt="none"
          @camera-change=${this.updateCameraFieldOfView}
          min-camera-orbit="auto 0deg 15m"
          max-camera-orbit="auto 180deg auto"
        >
          <canvas slot="canvas"></canvas>
          ${this.hotspotElements()}
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
