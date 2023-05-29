import { Program, createDefaultProgram } from "./Program";
import Scene from "../scene/Scene";
import Camera from "../scene/Camera";
// import Mat4 from "../math/mat4";
import { Shader, ShaderType } from "./Shader";

// This class is a wrapper for the WebGLRenderingContext.
export class Renderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private currentProgram: Program | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
    if (!this.gl) {
      alert("WebGL is not supported in your browser.");
    }

    // set the clear color to black and enable depth testing
    this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
  }

  public clear(): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  public resize(): void {
    // Set the size of the canvas to match the size of the window.
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Tell WebGL how to convert from clip space to pixels.
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  public render(): void {
    // TODO: We need to refactor all of this into their own classes.
    // But first we need to make it render geometry to the screen.
    const gl = this.gl;

    const program = createDefaultProgram(gl);

    const posAttributeLocation = gl.getAttribLocation(
      program.program,
      "a_position"
    );

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [0, 0, 0, 0.2, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posAttributeLocation);
    gl.vertexAttribPointer(posAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    this.resize();
    this.clear();

    gl.useProgram(program.program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

// This class represents a WebGL texture.
class Texture {}

// This class represents a WebGL Vertex Array Object.
class VertexArrayObject {}

// This class represents a WebGL buffer.
class Buffer {}
