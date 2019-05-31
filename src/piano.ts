import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Light } from "@babylonjs/core/Lights/light";
import { Color4, Vector3 } from "@babylonjs/core/Maths";
import { AssetsManager } from "@babylonjs/core/Misc/assetsManager";
import { Scene } from "@babylonjs/core/scene";

import { BLACK_KEY_ATTR, BLACK_KEYS, Key, pitchMap, pitchNames, WHITE_KEY_ATTR } from "./key";
import { MyLoadingScreen } from "./loadingScreen";
import { MouseEventCounter } from "./mouseEventCounter";

export const keyboardController = (piano: Piano, offset = 3) => {
  const pianoKeyPressLocks = new Map<number, boolean>();
  const pianokeyMap = piano.keys;
  const pcKeyPianoKeyMap: { [key: string]: number } = { "a": 3, "w": 4, "s": 5, "e": 6, "d": 7, "f": 8, "t": 9, "g": 10, "y": 11, "h": 12, "u": 13, "j": 14, "k": 15, "o": 16, "l": 17, "p": 18, ";": 19, "'": 20 };
  // 初始化按键锁
  for (const [index] of pianokeyMap) {
    pianoKeyPressLocks.set(index, false);
  }

  const keydownHandler = (e: KeyboardEvent) => {
    const keyIndex = pcKeyPianoKeyMap[e.key] + offset * 12;
    // 如果keyIndex存在并且没有按下
    if (keyIndex && pianoKeyPressLocks.get(keyIndex) === false) {
      pianoKeyPressLocks.set(keyIndex, true);
      const key = pianokeyMap.get(keyIndex);
      if (key) {
        key.press();
      }
    }
  };

  const keyupHandler = (e: KeyboardEvent) => {
    const keyIndex = pcKeyPianoKeyMap[e.key] + offset * 12;
    // 如果keyIndex存在并且没有按下
    if (keyIndex) {
      pianoKeyPressLocks.set(keyIndex, false);
      const key = pianokeyMap.get(keyIndex);
      if (key) {
        key.release();
      }
    }
  };

  window.addEventListener("keydown", keydownHandler);
  window.addEventListener("keyup", keyupHandler);

  return () => {
    // 移除监听
    window.removeEventListener("keydown", keydownHandler);
    window.removeEventListener("keyup", keyupHandler);
  };
};

export class Piano {
  public keys: Map<number, Key>;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera: FreeCamera;
  private _light: Light;
  private _mouseEventCounter: MouseEventCounter;

  constructor(canvas: HTMLCanvasElement) {
    this.keys = new Map<number, Key>();
    // Create canvas and engine.
    this._canvas = canvas;
    this._engine = new Engine(this._canvas, true, undefined, true);
    this._engine.loadingScreen = new MyLoadingScreen(() => {
      this.doRender();
    });
    // Create a basic BJS Scene object.
    this._scene = new Scene(this._engine);
    this._scene.clearColor = new Color4(0.8, 0.8, 0.8);
    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    this._camera = new FreeCamera("camera1", new Vector3(0, 90, -45), this._scene);
    // this._camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this._scene);
    // Target the camera to scene origin.
    this._camera.setTarget(Vector3.Zero());
    // Attach the camera to the canvas.
    // this._camera.attachControl(this._canvas, false);
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);

    this._mouseEventCounter = new MouseEventCounter(this._scene);
  }

  public createKeys() {
    let currentKey = null;

    for (let i = 0; i < 88; i++) {
      if (currentKey === null) {
        currentKey = new Key({
          index: 0,
          key: 10, // A2
          level: 0,
        }, this._scene, this._mouseEventCounter);
      } else {
        currentKey = new Key({
          index: currentKey.index + 1,
          key: currentKey.key + 1 === 13 ? 1 : currentKey.key + 1, // A2
          level: currentKey.key + 1 === 13 ? currentKey.level + 1 : currentKey.level,
        }, this._scene, this._mouseEventCounter);
      }

      const isBlack = BLACK_KEYS.includes(currentKey.key);
      this.keys.set(i, currentKey);
      const preKey = this.keys.get(i - 1);
      const padding = 0.1;

      if (preKey) {
        if (BLACK_KEYS.includes(preKey.key)) {
          // 前项是黑键
          currentKey.mesh.position.x = preKey.mesh.position.x + (WHITE_KEY_ATTR.width + padding) / 2;
        } else {
          // 前项是白键
          if (BLACK_KEYS.includes(currentKey.key)) {
            // 当前项是黑键
            currentKey.mesh.position.x = preKey.mesh.position.x + (WHITE_KEY_ATTR.width + padding) / 2;
          } else {
            // 当前项是白键
            currentKey.mesh.position.x = preKey.mesh.position.x + (WHITE_KEY_ATTR.width + padding);
          }
        }
      } else {
        // 第一个按键 A2
        currentKey.mesh.position.x = -65;
      }

      currentKey.mesh.position.z = isBlack ? (WHITE_KEY_ATTR.length - BLACK_KEY_ATTR.length) / 2 : 0;
    }
  }

  public createScene(): void {
    this.createKeys();
  }

  public loadAssets() {
    const assetsManager = new AssetsManager(this._scene);
    pitchNames.forEach((name) => {
      assetsManager.addBinaryFileTask(name, pitchMap[name]);
    });

    assetsManager.load();

    assetsManager.onProgress = (remainingCount, totalCount, lastFinishedTask) => {
      this._engine.loadingUIText = "We are loading the scene. " + (totalCount - remainingCount) + " of " + totalCount + " items has been loaded.";
    };

    assetsManager.onFinish = (tasks) => {
      // this.doRender();
    };

  }

  public doRender(): void {
    this.createScene();
    // Create the scene.
    keyboardController(this);
    // Run the render loop.
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // The canvas/window resize event handler.
    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }
}
