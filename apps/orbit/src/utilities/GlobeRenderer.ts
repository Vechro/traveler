import type { Camera, FramingInfo, RendererInterface } from "@google/model-viewer/lib/model-viewer-base";
import type { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class GlobeRenderer implements RendererInterface {
  constructor(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.camera.matrixAutoUpdate = false;
  }

  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  scene: Scene;

  load = (progressCallback: (progress: number) => void): Promise<FramingInfo> => {
    return progressCallback(1.0), Promise.resolve({ framedRadius: 5, fieldOfViewAspect: innerWidth / innerHeight });
  }
  render = ({ viewMatrix, projectionMatrix }: Camera): void => {
    this.camera.updateMatrix();
    this.camera.projectionMatrix.fromArray(projectionMatrix);
    this.camera.matrix.fromArray(viewMatrix);
    this.renderer.render(this.scene, this.camera);
  };
  resize = (_width: number, _height: number): void => undefined;
}
