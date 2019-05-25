import logo from "./assets/SteinwayLogo.svg";
import { Piano } from "./piano";
import "./styles/index.scss";

// 添加字体
// <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet">
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css?family=Quicksand&display=swap";
fontLink.rel = "stylesheet";
document.body.appendChild(fontLink);

// 创建logo
const imgContainer = document.createElement("div");
const img = document.createElement("img");
img.src = logo;
img.id = "steinwayLogo";
imgContainer.id = "steinwayLogo-container";
imgContainer.appendChild(img);
document.body.appendChild(imgContainer);

// 创建footer
const footer = document.createElement("div");
footer.id = "footer";
footer.innerHTML = `
<p>author<a href='https://github.com/gavinxgu' target="_blank">@gavinxgu</a></p>
<p>engine<a href='https://www.babylonjs.com/' target="_blank">@babylonjs</a></p>
<p>audio<a href='http://theremin.music.uiowa.edu/MISpiano.html' target="_blank">@University of Iowa Electronic Music Studios</a></p>
`;
document.body.appendChild(footer);

// Get the canvas DOM element
const canvas = document.createElement("canvas");
canvas.id = "renderCanvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
window.addEventListener("DOMContentLoaded", () => {
  // Create the game using the 'renderCanvas'.
  let piano = new Piano(canvas);

  // Create the scene.
  piano.createScene();

  // Start render loop.
  piano.loadAssets();

  if (module.hot) {
    module.hot.accept("./piano.ts", () => {
      // tslint:disable-next-line: no-console
      console.log("Accepting the updated piano module!");
      piano = new Piano(canvas);
      // Create the scene.
      piano.createScene();
      // Start render loop.
      piano.doRender();
    });
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
