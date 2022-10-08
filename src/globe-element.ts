import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import * as THREE from "three";
import { Vector2 } from "three";
import atmosphereFrag from "./assets/shaders/atmosphere.frag";
import atmosphereVert from "./assets/shaders/atmosphere.vert";
import sphereFrag from "./assets/shaders/sphere.frag";
import sphereVert from "./assets/shaders/sphere.vert";

@customElement("globe-element")
export class GlobeElement extends LitElement {
  @query("#canvas", true)
  canvas!: HTMLCanvasElement;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  renderer?: THREE.WebGLRenderer;

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: sphereVert,
      fragmentShader: sphereFrag,
      uniforms: {
        globeTexture: {
          // https://neo.gsfc.nasa.gov/view.php?datasetId=BlueMarbleNG-TB
          value: new THREE.TextureLoader().load("/earth-uv-map.jpg"),
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

  mouse: Vector2 = new Vector2(undefined, undefined);

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: false,
    });
    window.addEventListener("resize", () => this.onResize(), false);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(devicePixelRatio);

    this.atmosphere.scale.set(1.1, 1.1, 1.1);
    this.scene.add(this.atmosphere);

    this.group.add(this.sphere);
    this.scene.add(this.group);

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
    this.group.rotation.x = -this.mouse.y;
    this.group.rotation.y = this.mouse.x;
  }

  private onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  }

  render() {
    return html`
      <canvas
        id="canvas"
        width="400"
        height="400"
        @mousemove=${this.onMouseMove}
      ></canvas>
    `;
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
