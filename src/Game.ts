import Game from "../lib/engine/Game";

export class MyGame extends Game {
    constructor(canvas: HTMLCanvasElement) {
      super(canvas);
    }
  
    handleInput() { 

    }
  
    update(deltaTime: number) {

    }
      
    render() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }
  }