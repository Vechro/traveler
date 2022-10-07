import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import * as THREE from "three";
import vertex from "./assets/shaders/vertex.glsl";

@customElement("globe-element")
export class GlobeElement extends LitElement {
  @query("#canvas", true)
  canvas!: HTMLCanvasElement;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  renderer?: THREE.WebGLRenderer;

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({
      // https://neo.gsfc.nasa.gov/view.php?datasetId=BlueMarbleNG-TB
      map: new THREE.TextureLoader().load("/earth-uv-map.jpg"),
    })
  );

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: false,
    });
    window.addEventListener("resize", () => this.onResize(), false);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.scene.add(this.sphere);

    this.camera.position.z = 10;

    this.paint();
  }

  private onResize() {
    this.renderer?.setSize(innerWidth, innerHeight);
    this.renderer?.setPixelRatio(devicePixelRatio);
  }

  paint() {
    requestAnimationFrame(this.paint.bind(this));
    this.renderer?.render(this.scene, this.camera);
  }

  render() {
    return html` <canvas id="canvas" width="400" height="400"></canvas> `;
  }

  static styles = css`
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      contain: size layout paint;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "globe-element": GlobeElement;
  }
}
