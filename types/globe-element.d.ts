import { LitElement } from "lit";
import * as THREE from "three";
export declare class GlobeElement extends LitElement {
    canvas: HTMLCanvasElement;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    sphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
    atmosphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
    firstUpdated(): void;
    private onResize;
    paint(): void;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "globe-element": GlobeElement;
    }
}
