export default class Mat4 {
  matrix: Float32Array;
  constructor() {
    this.matrix = new Float32Array(16);
  }

  getMatrix(): Float32Array {
    return this.matrix;
  }
}
