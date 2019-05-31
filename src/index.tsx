// import screenfull from "screenfull";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./gui/App";
import { Piano } from "./piano";
import { Player } from "./player";
// CITY OF STARS.mid
import "./styles/index.scss";

// 渲染3D场景
const canvas = document.createElement("canvas");
canvas.id = "renderCanvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Create the game using the 'renderCanvas'.
export let piano = new Piano(canvas);

export const player = new Player(piano);

// 渲染react组件
ReactDOM.render(<App />, document.getElementById("app"));

// Start render loop.
piano.loadAssets();

if (module.hot) {
  module.hot.accept("./piano.ts", () => {
    // tslint:disable-next-line: no-console
    console.log("Accepting the updated piano module!");
    piano = new Piano(canvas);
    // Start render loop.
    piano.doRender();
  });

  module.hot.accept("./gui/App.tsx", () => {
    // tslint:disable-next-line: no-console
    console.log("Accepting the updated gui App module!");
    // Start render loop.
    ReactDOM.render(<App />, document.getElementById("app"));
  });
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
