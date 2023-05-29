import { Shader } from "./Shader";

// This class represents a WebGL shader program.
export class Program {
  private _program: WebGLProgram | null = null;
  constructor(
    gl: WebGLRenderingContext,
    vertexShader: Shader,
    fragmentShader: Shader
  ) {
    this._program = gl.createProgram();

    if (!this._program) {
      throw new Error("Program could not be created");
    }

    gl.attachShader(this._program, vertexShader.shaderObject);

    gl.attachShader(this._program, fragmentShader.shaderObject);

    gl.linkProgram(this._program);

    if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
      throw new Error(
        gl.getProgramInfoLog(this._program) as string | undefined
      );
    }
  }

  get program(): WebGLProgram {
    if (!this._program) {
      throw new Error("Program is null");
    }
    return this._program;
  }
}

export function createDefaultProgram(gl: WebGL2RenderingContext): Program {
  const vertexShader = new Shader(gl, gl.VERTEX_SHADER);
  const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER);
  return new Program(gl, vertexShader, fragmentShader);
}
