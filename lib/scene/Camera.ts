import Mat4 from "../math/Mat4";
// this class is used to represent a camera in the scene
export default class Camera {
  public _projectionMatrix: Mat4;
  public _viewMatrix: Mat4;

  constructor() {
    this._projectionMatrix = new Mat4();
    this._viewMatrix = new Mat4();
  }

  get projectionMatrix(): Float32Array {
    return this._projectionMatrix.getMatrix();
  }

  get viewMatrix(): Float32Array {
    return this._viewMatrix.getMatrix();
  }
}
