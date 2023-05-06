import "@google/model-viewer";
import type { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import { toVector3D } from "@google/model-viewer/lib/model-viewer-base";
import "@vechro/turtle";
import type { ContentChangeEvent, EditorPanel, MenuList } from "@vechro/turtle";
import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
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
import earthUvMap from "&/assets/earth-uv-map.jpg";
import cross from "&/assets/icons/cross.svg?raw";
import pin from "&/assets/icons/pin.svg?raw";
import { RestMixin } from "&/components/rest-mixin";
import { StoreMixin, type Marker } from "&/components/store-mixin";
import { MouseEventX } from "&/extension";
import { GlobeRenderer } from "&/utilities/GlobeRenderer";
import { debounce } from "@google/model-viewer/lib/utilities";
import { styles } from "./globe-viewer.styles";
import atmosphereFrag from "./shaders/atmosphere.frag?raw";
import atmosphereVert from "./shaders/atmosphere.vert?raw";
import sphereFrag from "./shaders/sphere.frag?raw";
import sphereVert from "./shaders/sphere.vert?raw";

@customElement("globe-viewer")
export class GlobeViewer extends RestMixin(StoreMixin(LitElement)) {
  static override styles = styles;

  @query("canvas", true)
  canvas!: HTMLCanvasElement;

  @query("dialog", true)
  dialog!: HTMLDialogElement;

  @query("editor-panel", true)
  editorPanel!: EditorPanel;

  @query("model-viewer", true)
  modelViewer!: ModelViewerElement;

  @query(".points-menu", true)
  pointsMenu!: MenuList;

  private activeMarker?: Marker;

  private camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.01, 1000);
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
    })
  );

  atmosphere = new Mesh(
    new SphereGeometry(5, 64, 64),
    new ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      blending: AdditiveBlending,
      side: BackSide,
    })
  );

  globeGroup = new Group();

  private clickPointer = new Vector2();
  private raycaster = new Raycaster();

  override firstUpdated() {
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: this.canvas,
    });

    window.addEventListener("resize", this.onResize);
    this.onResize();

    this.atmosphere.scale.set(1.1, 1.1, 1.1);
    this.scene.add(this.atmosphere);

    this.globeGroup.add(this.sphere);
    this.scene.add(this.globeGroup);

    this.globeRenderer = new GlobeRenderer(this.renderer, this.scene, this.camera);

    this.modelViewer.registerRenderer(this.globeRenderer);

    this.readMarkersFromDatabase();
  }

  private updateCameraFieldOfView = () => {
    this.camera.fov = this.modelViewer.getFieldOfView();
    this.camera.updateProjectionMatrix();
  };

  private saveToRest = async () => {
    const { id } = await this.user;
    const { error } = await (await this.rest).from("profiles").upsert({
      id,
      markers: this.markers.get(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error("Failed to save profile in database", { cause: error });
    }
  };

  private readMarkersFromDatabase = async () => {
    const { id } = await this.user;
    const { data, error } = await (await this.rest).from("profiles").select("markers").eq("id", id);

    if (error) {
      throw new Error("Failed to read profile in database", { cause: error });
    }

    if (data[0]?.markers != null) {
      this.markers.set(data[0].markers as Marker[]);
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    // TODO: unsubscribe as well?
    this.markers.listen(() => this.requestUpdate());
    this.markers.listen(() => this.saveToRest());
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
  }

  private onResize = () => {
    this.renderer?.setSize(innerWidth, innerHeight);
    this.renderer?.setPixelRatio(devicePixelRatio);
  };

  private addPoint = (event: PointerEvent) => {
    if (event.button !== 0) return;
    this.raycaster.setFromCamera(this.clickPointer, this.camera);
    const intersects = this.raycaster.intersectObject(this.sphere, false);
    const point = intersects[0]?.point;
    if (!point) return;
    const marker: Marker = {
      id: self.crypto.randomUUID(),
      name: `Point #${this.markers.get().length}`,
      position: point.toArray(),
      content: "",
    };
    this.markers.set([...this.markers.get(), marker]);
  };

  private handleClickPointer = (event: MouseEvent) => {
    this.clickPointer.fromArray(MouseEventX.from(event).normalizedPosition());
  };

  private resetClickPointer = () => {
    this.clickPointer.set(0, 0);
  };

  private handleContentChange = debounce((event: ContentChangeEvent) => {
    const { headerText, contentHtml } = event.detail;
    if (headerText) this.activeMarker!.name = headerText;
    if (contentHtml) this.activeMarker!.content = contentHtml;
  }, 300);

  private handleEditorOpen = (marker: Marker) => {
    this.activeMarker = marker;
    this.orientCameraToPoint(new Vector3(...marker.position));
    this.editorPanel.header = marker.name;
    this.editorPanel.content = marker.content;
    this.dialog.showModal();
    this.editorPanel.addEventListener("content-change", this.handleContentChange);
  };

  private handleEditorClose = () => {
    const newMarkers = this.markers.get();
    for (const newMarker of newMarkers) {
      if (newMarker.id === this.activeMarker!.id) {
        newMarker.name = this.activeMarker!.name;
        newMarker.content = this.activeMarker!.content;
      }
    }
    this.markers.set(newMarkers);
    this.dialog.close();
    this.editorPanel.removeEventListener("content-change", this.handleContentChange);
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
      const newMarkers = this.markers.get();
      for (const newMarker of newMarkers) {
        if (newMarker.id === marker.id) {
          newMarker.name = target.value;
        }
      }
      this.markers.set(newMarkers);
    }
  };

  private handlePointClose = (event: PointerEvent, marker: Marker) => {
    event.stopPropagation();
    this.markers.set(this.markers.get().filter(({ id }) => id !== marker.id));
  };

  private pointListElements = () =>
    repeat(
      this.markers.get(),
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
              <light-button @pointerup=${() => this.handleEditorOpen(marker)}>${unsafeSVG(pin)}</light-button>
              <light-button @pointerup=${(event: PointerEvent) => this.handlePointClose(event, marker)}>
                ${unsafeSVG(cross)}
              </light-button>
            </div>
          </menu-item>
        `
    );

  hotspotElements = () =>
    repeat(
      this.markers.get(),
      ({ id }) => id,
      (marker) => {
        const positionSerialized = toVector3D(new Vector3(...marker.position)).toString();
        return html`
          <button
            class="hotspot"
            slot="hotspot-${marker.id}"
            @click=${() => this.handleEditorOpen(marker)}
            data-position=${positionSerialized}
            data-normal=${positionSerialized}
          >
            <div class="annotation">${marker.name}</div>
          </button>
        `;
      }
    );

  override render() {
    return html`
      <dialog>
        <editor-panel @close=${this.handleEditorClose}></editor-panel>
      </dialog>
      <context-menu @open=${this.handleClickPointer} @close=${this.resetClickPointer}>
        <menu-list class="context-menu" slot="context-menu">
          <menu-item @pointerdown=${this.addPoint}>Add point</menu-item>
        </menu-list>
        <model-viewer
          src="."
          loading="eager"
          camera-controls
          disable-pan
          interaction-prompt="none"
          min-camera-orbit="auto 0deg 15m"
          max-camera-orbit="auto 180deg auto"
          @camera-change=${this.updateCameraFieldOfView}
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
