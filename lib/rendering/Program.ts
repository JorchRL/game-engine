import Shader from "./Shader";

// This class represents a WebGL shader program.
export default class Program {
  constructor(
    vertexShader: Shader,
    fragmentShader: Shader,
    gl: WebGLRenderingContext
  ) {
    // it should create a WebGL program
    const program = gl.createProgram();

    if (!program) {
      throw new Error("Program could not be created");
    }
    // it should attach the vertex shader to the program
    gl.attachShader(program, vertexShader);

    // it should attach the fragment shader to the program
    gl.attachShader(program, fragmentShader);

    // it should link the program
    gl.linkProgram(program);

    // it should check if the program linked successfully
    // if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    //   throw new Error(gl.getProgramInfoLog(program));
    // }
  }

  // it should have a method to get the location of an attribute

  // it should have a method to get the location of a uniform
  // it should have a method to set a uniform
  // it should have a method to set an attribute

  // it should have a method to set the projection matrix

  // it should have a method to set the view matrix

  // it should have a method to set the model matrix

  // it should have a method to set the normal matrix
}
