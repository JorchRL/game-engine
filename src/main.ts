import "./style.css";

import { MyGame } from "./MyGame";

document.addEventListener("DOMContentLoaded", main);

function main() {
  // Create a new instance of MyGame and start it.
  const game = new MyGame({ canvasId: "canvas" });
  game.start();
}
