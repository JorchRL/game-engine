// this class represents a shader for a material
export class Shader {
  _shaderObject: WebGLShader | null;
  constructor(
    gl: WebGL2RenderingContext,
    type: ShaderType,
    source: string | null = null
  ) {
    // it should create a WebGL shader
    this._shaderObject = gl.createShader(type);

    if (!this._shaderObject) {
      throw new Error("Shader could not be created");
    }

    if (type === gl.VERTEX_SHADER && !source) {
      source = defaultVertexShaderSource;
    } else if (type === gl.FRAGMENT_SHADER && !source) {
      source = defaultFragmentShaderSource;
    } else {
      throw new Error("Shader source is required");
    }

    gl.shaderSource(this._shaderObject, source);
    gl.compileShader(this._shaderObject);

    if (!gl.getShaderParameter(this._shaderObject, gl.COMPILE_STATUS)) {
      throw new Error(
        gl.getShaderInfoLog(this._shaderObject) as string | undefined
      );
    }
  }

  //getter for the shader object
  get shaderObject(): WebGLShader {
    if (!this._shaderObject) {
      throw new Error("Shader object is null");
    }
    return this._shaderObject;
  }

  delete(gl: WebGLRenderingContext): void {
    // it should delete the shader
    // gl.deleteShader(this.shader);
  }
}

export enum ShaderType {
  vertex = WebGL2RenderingContext.VERTEX_SHADER,
  fragment = WebGL2RenderingContext.FRAGMENT_SHADER,
}

const defaultVertexShaderSource = `#version 300 es

in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

const defaultFragmentShaderSource = `#version 300 es

precision mediump float;

out  vec4 outColor;

void main() {
  outColor = vec4(1, 1, 0.5, 1);
}
`;
