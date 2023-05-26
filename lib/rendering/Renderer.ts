import Program from "./Program";
import Scene from "../scene/Scene";
import Camera from "../scene/Camera";
import Mat4 from "../math/mat4";

// This class is a wrapper for the WebGLRenderingContext.
class Renderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private currentProgram: Program | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.gl = this.canvas.getContext("webgl") as WebGLRenderingContext;
    if (!this.gl) {
      alert("WebGL is not supported in your browser.");
    }

    // set the clear color to black and enable depth testing
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
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

  public render(scene: Scene, camera: Camera): void {
    this.resize();
    this.clear();

    for (const object of scene.objects) {
      // set the shader program
      const program = object.shader.program;
      this.gl.useProgram(program);

      // pass the matrices to the shader program
      const viewMatrixLocation = this.gl.getUniformLocation(program, "u_view");
      if (viewMatrixLocation) {
        this.gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix);
      }
      const projectionMatrixLocation = this.gl.getUniformLocation(
        program,
        "u_projection"
      );
      if (projectionMatrixLocation) {
        this.gl.uniformMatrix4fv(
          projectionMatrixLocation,
          false,
          camera.projectionMatrix
        );
      }

      // render the object
    }
  }
}

// This class represents a WebGL texture.
class Texture {}

// This class represents a WebGL Vertex Array Object.
class VertexArrayObject {}

// This class represents a WebGL buffer.
class Buffer {}
