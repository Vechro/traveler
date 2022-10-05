import createGlobe from "cobe";
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import Phenomenon from "phenomenon";

@customElement("globe-element")
export class GlobeElement extends LitElement {
  constructor() {
    super();
  }

  private pointerInteracting: number | null = null;
  private pointerInteractionMovement = 0.0;

  @query("#canvas", true)
  canvas!: HTMLCanvasElement;

  @property({ type: Number })
  width: number | undefined;

  @property({ type: Number })
  height: number | undefined;
  canvasWidth = 400;
  canvasHeight = 400;

  globe!: Phenomenon;
  private phi = 0.0;

  firstUpdated() {
    this.globe = createGlobe(this.canvas, {
      devicePixelRatio: 1,
      width: 400,
      height: 400,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16_000,
      mapBrightness: 10.0,
      baseColor: [0.4, 0.4, 0.8],
      markerColor: [1, 0.5, 1],
      glowColor: [1, 1, 1],
      offset: [0, 0],
      opacity: 1.0,
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = this.phi;
      },
    });
  }

  _updateSize() {
    this.canvasWidth = this.width || window.innerWidth;
    this.canvasHeight = this.height || window.innerHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }

  _pointerDown(e: PointerEvent) {
    this.pointerInteracting = e.clientX - this.pointerInteractionMovement;
  }
  _pointerOut() {
    this.pointerInteracting = null;
  }
  _mouseMove(e: MouseEvent) {
    if (this.pointerInteracting !== null) {
      const delta = e.clientX - this.pointerInteracting;
      this.pointerInteractionMovement = delta;
      this.phi = delta / 200.0;
    }
  }

  render() {
    return html`
      <canvas
        id="canvas"
        width=${this.canvasWidth}
        height=${this.canvasHeight}
        @pointerdown=${this._pointerDown}
        @pointerout=${this._pointerOut}
        @pointerup=${this._pointerOut}
        @mousemove=${this._mouseMove}
        @pointermove=${this._mouseMove}
      ></canvas>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
    }

    canvas {
      width: 400px;
      height: 400px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "globe-element": GlobeElement;
  }
}
