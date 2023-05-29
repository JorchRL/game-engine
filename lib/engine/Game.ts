// This class represents the game loop. It is responsible for updating the game state and rendering the scene. It is also responsible for handling user input. It is intended to be subclassed by the game developer. The game developer should override the update and render methods.

import { GameStatus, GameOptions, DEFAULT_GAME_OPTIONS } from "./Game.types";
import { Renderer } from "../rendering/Renderer";

export default class Game {
  private _renderer: Renderer;
  private _gameStatus: GameStatus;

  constructor(GameOptions: GameOptions = DEFAULT_GAME_OPTIONS) {
    this._renderer = this._initRenderer(GameOptions.canvasId);
    this._gameStatus = GameStatus.INIT;
  }

  private _initRenderer(canvasId: string) {
    try {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      return new Renderer(canvas);
    } catch {
      const canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      return new Renderer(canvas);
    }
  }

  public start(): void {
    console.log("starting game");
    if (this._gameStatus === GameStatus.INIT) {
      console.log("starting game loop");
      this._gameStatus = GameStatus.RUNNING;
      this._loop();
    }
  }

  public pause(): void {
    this._gameStatus = GameStatus.PAUSED;
  }

  public resume(): void {
    this._gameStatus = GameStatus.RUNNING;
  }

  public stop(): void {
    this._gameStatus = GameStatus.STOPPED;
  }

  private _loop(): void {
    if (!this._canLoop()) {
      return;
    }
    this._preHandleInput();
    this._preUpdate();
    this._preRender();
    requestAnimationFrame(this._loop.bind(this));
  }

  private _canLoop(): boolean {
    return (
      this._gameStatus === GameStatus.RUNNING ||
      this._gameStatus === GameStatus.PAUSED
    );
  }

  /// Override these methods in your subclass.

  protected handleInput(): void {}
  protected update(): void {}

  private render(): void {
    // we will keep render() internal to the Game class for now.
    this._renderer.render();
  }

  private _preHandleInput(): void {
    if (this._gameStatus === GameStatus.PAUSED) {
      return;
    }
    this.handleInput();
  }

  private _preUpdate(): void {
    // Do stuff just before the update method is called.
    if (this._gameStatus === GameStatus.PAUSED) {
      return;
    }
    this.update();
  }

  private _preRender(): void {
    // Do stuff just before the render method is called.
    this.render();
  }
}
