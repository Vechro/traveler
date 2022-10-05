import createGlobe from "cobe";
import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import Phenomenon from "phenomenon";

@customElement("globe-element")
export class GlobeElement extends LitElement {
  @query("#canvas")
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
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = this.phi;
        this.phi += 0.01;
      },
    });
  }

  _updateSize() {
    this.canvasWidth = this.width || window.innerWidth;
    this.canvasHeight = this.height || window.innerHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }

  render() {
    return html`
      <canvas
        id="canvas"
        width=${this.canvasWidth}
        height=${this.canvasHeight}
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
