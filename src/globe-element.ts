import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import * as THREE from "three";
import atmosphereFrag from "./assets/shaders/atmosphere.frag";
import atmosphereVert from "./assets/shaders/atmosphere.vert";
import sphereFrag from "./assets/shaders/sphere.frag";
import sphereVert from "./assets/shaders/sphere.vert";
import { Vec } from "@tldraw/vec";
import "./math";

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

  private pointerStart: number[] | null = null;
  private pointerDelta: number[] = [0, 0];

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: false,
    });
    window.addEventListener("resize", () => this.onResize(), false);
    window.addEventListener("wheel", (event) => this.onWheel(event), false);
    this.onResize();

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
    this.group.rotation.x = this.pointerDelta[1];
    this.group.rotation.y = this.pointerDelta[0];
  }

  private onGrabStart(event: PointerEvent) {
    this.pointerStart = Vec.sub(event.normalizedPosition(), this.pointerDelta);
  }

  private onGrabMove(event: MouseEvent) {
    if (this.pointerStart) {
      this.pointerDelta = Vec.sub(
        event.normalizedPosition(),
        this.pointerStart
      );
    }
  }

  private onGrabEnd() {
    this.pointerStart = null;
  }

  private onWheel(event: WheelEvent) {
    const [_, y] = event.normalizedDelta();

    this.camera.position.z = Vec.clamp(
      this.camera.position.z + y / 50,
      6.67,
      15
    );
  }

  render() {
    return html`
      <canvas
        id="canvas"
        width="400"
        height="400"
        @pointerdown=${this.onGrabStart}
        @mousemove=${this.onGrabMove}
        @pointerup=${this.onGrabEnd}
        @pointerout=${this.onGrabEnd}
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
