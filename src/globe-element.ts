import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthUvMap from "./assets/earth-uv-map.jpg";
import atmosphereFrag from "./assets/shaders/atmosphere.frag";
import atmosphereVert from "./assets/shaders/atmosphere.vert";
import sphereFrag from "./assets/shaders/sphere.frag";
import sphereVert from "./assets/shaders/sphere.vert";
import "./math";

@customElement("globe-element")
export class GlobeElement extends LitElement {
  @query("#canvas", true)
  canvas!: HTMLCanvasElement;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  renderer?: THREE.WebGLRenderer;
  controls?: OrbitControls;

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: sphereVert,
      fragmentShader: sphereFrag,
      uniforms: {
        globeTexture: {
          // https://neo.gsfc.nasa.gov/view.php?datasetId=BlueMarbleNG-TB
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

  firstUpdated() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      alpha: false,
    });
    window.addEventListener("resize", () => this.onResize(), false);
    this.onResize();

    this.atmosphere.scale.set(1.1, 1.1, 1.1);
    this.scene.add(this.atmosphere);

    this.group.add(this.sphere);
    this.scene.add(this.group);

    this.camera.position.z = 10;

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 6.67;
    this.controls.maxDistance = 15;
    this.controls.rotateSpeed = 0.5;

    this.paint();
  }

  private onResize() {
    this.renderer?.setSize(innerWidth, innerHeight);
    this.renderer?.setPixelRatio(devicePixelRatio);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.controls?.update();
  }

  paint() {
    requestAnimationFrame(this.paint.bind(this));
    this.renderer?.render(this.scene, this.camera);
    this.controls?.update();
  }

  private onGrabStart() {
    this.canvas.style.cursor = "grabbing";
  }

  private onGrabEnd() {
    this.canvas.style.cursor = "default";
  }

  render() {
    return html`
      <canvas
        id="canvas"
        width="400"
        height="400"
        @pointerdown=${this.onGrabStart}
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
