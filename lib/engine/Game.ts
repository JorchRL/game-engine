// This class represents the game loop. It is responsible for updating the game state and rendering the scene. It is also responsible for handling user input. It is intended to be subclassed by the game developer. The game developer should override the update and render methods.
export default class Game {
  protected gl: WebGLRenderingContext;
  protected canvas: HTMLCanvasElement;
  private lastTimestamp: number = 0;
  private running: boolean = false;
  private paused: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("The canvas element is not an instance of HTMLCanvasElement.");
    }
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl") as WebGLRenderingContext;
    if (!this.gl) {
      console.error("WebGL is not supported in your browser.")
    }

    this.lastTimestamp = 0;
    this.running = false;
  }

  public start(): void {
    if (!this.running) {
      this.running = true;
      this.loop();
    }
  }

  private loop(timestamp: number = 0): void {
    if (!this.running) return;

    if (!this.paused) {
      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      this.handleInput();
      this.update(deltaTime);
    }

    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  protected handleInput(): void {

  }

  protected update(deltaTime: number): void {

  }

  protected render(): void {

  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public getGL(): WebGLRenderingContext {
    return this.gl;
  }
}
