// this class represents a shader for a material
export default class Shader {
  private shader: WebGLShader;

  constructor(gl: WebGLRenderingContext, type: ShaderType, source: string) {
    // it should create a WebGL shader
    const shader = gl.createShader(type);

    if (!shader) {
      throw new Error("Shader could not be created");
    }

    // it should set the shader source
    gl.shaderSource(shader, source);

    // it should compile the shader
    gl.compileShader(shader);

    // it should check if the shader compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
  }

  delete(gl: WebGLRenderingContext): void {
    // it should delete the shader
    gl.deleteShader(this.shader);
  }
}

interface ShaderType {
  vertex: number;
  fragment: number;
}
