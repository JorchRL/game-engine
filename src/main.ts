import "./style.css";

import { MyGame } from "./Game";



document.addEventListener("DOMContentLoaded", main);
function main() {
  const game = new MyGame();
  game.start();
}
