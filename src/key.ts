import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { Sound } from "@babylonjs/core/Audio/sound";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3, Color4 } from "@babylonjs/core/Maths";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

import "@babylonjs/core/Audio/audioEngine";
import "@babylonjs/core/Audio/audioSceneComponent";

// console.log(pitchNames.map((name) => `import ${name} from "../sounds/uiowa.music/output/ff.${name}.mp3";`).join("\n"))
import A0 from "../sounds/uiowa.music/output/ff.A0.mp3";
import A1 from "../sounds/uiowa.music/output/ff.A1.mp3";
import A2 from "../sounds/uiowa.music/output/ff.A2.mp3";
import A3 from "../sounds/uiowa.music/output/ff.A3.mp3";
import A4 from "../sounds/uiowa.music/output/ff.A4.mp3";
import A5 from "../sounds/uiowa.music/output/ff.A5.mp3";
import A6 from "../sounds/uiowa.music/output/ff.A6.mp3";
import A7 from "../sounds/uiowa.music/output/ff.A7.mp3";
import Ab1 from "../sounds/uiowa.music/output/ff.Ab1.mp3";
import Ab2 from "../sounds/uiowa.music/output/ff.Ab2.mp3";
import Ab3 from "../sounds/uiowa.music/output/ff.Ab3.mp3";
import Ab4 from "../sounds/uiowa.music/output/ff.Ab4.mp3";
import Ab5 from "../sounds/uiowa.music/output/ff.Ab5.mp3";
import Ab6 from "../sounds/uiowa.music/output/ff.Ab6.mp3";
import Ab7 from "../sounds/uiowa.music/output/ff.Ab7.mp3";
import B0 from "../sounds/uiowa.music/output/ff.B0.mp3";
import B1 from "../sounds/uiowa.music/output/ff.B1.mp3";
import B2 from "../sounds/uiowa.music/output/ff.B2.mp3";
import B3 from "../sounds/uiowa.music/output/ff.B3.mp3";
import B4 from "../sounds/uiowa.music/output/ff.B4.mp3";
import B5 from "../sounds/uiowa.music/output/ff.B5.mp3";
import B6 from "../sounds/uiowa.music/output/ff.B6.mp3";
import B7 from "../sounds/uiowa.music/output/ff.B7.mp3";
import Bb0 from "../sounds/uiowa.music/output/ff.Bb0.mp3";
import Bb1 from "../sounds/uiowa.music/output/ff.Bb1.mp3";
import Bb2 from "../sounds/uiowa.music/output/ff.Bb2.mp3";
import Bb3 from "../sounds/uiowa.music/output/ff.Bb3.mp3";
import Bb4 from "../sounds/uiowa.music/output/ff.Bb4.mp3";
import Bb5 from "../sounds/uiowa.music/output/ff.Bb5.mp3";
import Bb6 from "../sounds/uiowa.music/output/ff.Bb6.mp3";
import Bb7 from "../sounds/uiowa.music/output/ff.Bb7.mp3";
import C1 from "../sounds/uiowa.music/output/ff.C1.mp3";
import C2 from "../sounds/uiowa.music/output/ff.C2.mp3";
import C3 from "../sounds/uiowa.music/output/ff.C3.mp3";
import C4 from "../sounds/uiowa.music/output/ff.C4.mp3";
import C5 from "../sounds/uiowa.music/output/ff.C5.mp3";
import C6 from "../sounds/uiowa.music/output/ff.C6.mp3";
import C7 from "../sounds/uiowa.music/output/ff.C7.mp3";
import C8 from "../sounds/uiowa.music/output/ff.C8.mp3";
import D1 from "../sounds/uiowa.music/output/ff.D1.mp3";
import D2 from "../sounds/uiowa.music/output/ff.D2.mp3";
import D3 from "../sounds/uiowa.music/output/ff.D3.mp3";
import D4 from "../sounds/uiowa.music/output/ff.D4.mp3";
import D5 from "../sounds/uiowa.music/output/ff.D5.mp3";
import D6 from "../sounds/uiowa.music/output/ff.D6.mp3";
import D7 from "../sounds/uiowa.music/output/ff.D7.mp3";
import Db1 from "../sounds/uiowa.music/output/ff.Db1.mp3";
import Db2 from "../sounds/uiowa.music/output/ff.Db2.mp3";
import Db3 from "../sounds/uiowa.music/output/ff.Db3.mp3";
import Db4 from "../sounds/uiowa.music/output/ff.Db4.mp3";
import Db5 from "../sounds/uiowa.music/output/ff.Db5.mp3";
import Db6 from "../sounds/uiowa.music/output/ff.Db6.mp3";
import Db7 from "../sounds/uiowa.music/output/ff.Db7.mp3";
import E1 from "../sounds/uiowa.music/output/ff.E1.mp3";
import E2 from "../sounds/uiowa.music/output/ff.E2.mp3";
import E3 from "../sounds/uiowa.music/output/ff.E3.mp3";
import E4 from "../sounds/uiowa.music/output/ff.E4.mp3";
import E5 from "../sounds/uiowa.music/output/ff.E5.mp3";
import E6 from "../sounds/uiowa.music/output/ff.E6.mp3";
import E7 from "../sounds/uiowa.music/output/ff.E7.mp3";
import Eb1 from "../sounds/uiowa.music/output/ff.Eb1.mp3";
import Eb2 from "../sounds/uiowa.music/output/ff.Eb2.mp3";
import Eb3 from "../sounds/uiowa.music/output/ff.Eb3.mp3";
import Eb4 from "../sounds/uiowa.music/output/ff.Eb4.mp3";
import Eb5 from "../sounds/uiowa.music/output/ff.Eb5.mp3";
import Eb6 from "../sounds/uiowa.music/output/ff.Eb6.mp3";
import Eb7 from "../sounds/uiowa.music/output/ff.Eb7.mp3";
import F1 from "../sounds/uiowa.music/output/ff.F1.mp3";
import F2 from "../sounds/uiowa.music/output/ff.F2.mp3";
import F3 from "../sounds/uiowa.music/output/ff.F3.mp3";
import F4 from "../sounds/uiowa.music/output/ff.F4.mp3";
import F5 from "../sounds/uiowa.music/output/ff.F5.mp3";
import F6 from "../sounds/uiowa.music/output/ff.F6.mp3";
import F7 from "../sounds/uiowa.music/output/ff.F7.mp3";
import G1 from "../sounds/uiowa.music/output/ff.G1.mp3";
import G2 from "../sounds/uiowa.music/output/ff.G2.mp3";
import G3 from "../sounds/uiowa.music/output/ff.G3.mp3";
import G4 from "../sounds/uiowa.music/output/ff.G4.mp3";
import G5 from "../sounds/uiowa.music/output/ff.G5.mp3";
import G6 from "../sounds/uiowa.music/output/ff.G6.mp3";
import G7 from "../sounds/uiowa.music/output/ff.G7.mp3";
import Gb1 from "../sounds/uiowa.music/output/ff.Gb1.mp3";
import Gb2 from "../sounds/uiowa.music/output/ff.Gb2.mp3";
import Gb3 from "../sounds/uiowa.music/output/ff.Gb3.mp3";
import Gb4 from "../sounds/uiowa.music/output/ff.Gb4.mp3";
import Gb5 from "../sounds/uiowa.music/output/ff.Gb5.mp3";
import Gb6 from "../sounds/uiowa.music/output/ff.Gb6.mp3";
import Gb7 from "../sounds/uiowa.music/output/ff.Gb7.mp3";

import { MouseEventCounter } from "./mouseEventCounter";

export const pitchNames = ["A0", "Bb0", "B0",
    "C1", "Db1", "D1", "Eb1", "E1", "F1", "Gb1", "G1", "Ab1", "A1", "Bb1", "B1",
    "C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2",
    "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
    "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4",
    "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5",
    "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6", "A6", "Bb6", "B6",
    "C7", "Db7", "D7", "Eb7", "E7", "F7", "Gb7", "G7", "Ab7", "A7", "Bb7", "B7",
    "C8"];

export const pitchMap: { [key: string]: string } = {
    A0, Bb0, B0, C1, Db1, D1, Eb1, E1, F1, Gb1, G1, Ab1, A1, Bb1, B1, C2, Db2, D2, Eb2, E2, F2, Gb2, G2, Ab2, A2, Bb2, B2, C3, Db3, D3, Eb3, E3, F3, Gb3, G3, Ab3, A3, Bb3, B3, C4, Db4, D4, Eb4, E4, F4, Gb4, G4, Ab4, A4, Bb4, B4, C5, Db5, D5, Eb5, E5, F5, Gb5, G5, Ab5, A5, Bb5, B5, C6, Db6, D6, Eb6, E6, F6, Gb6, G6, Ab6, A6, Bb6, B6, C7, Db7, D7, Eb7, E7, F7, Gb7, G7, Ab7, A7, Bb7, B7, C8,
};

interface ICreateKeyOptions {
    index: number;
    key: number; // A2
    level: number;
}

/**
 * sleep睡眠函数
 * @param ms 睡眠秒数
 */
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * decay延音函数
 * @param t 松开按键之时起的时间
 * @param alpha 衰减系数
 * @param init 初始音量
 */
export function decay(t: number, alpha: number, init: number) {
    const x = -alpha * t + Math.exp(1);
    return x > 1 ? init * Math.log(-alpha * t + Math.exp(1)) : 0;
}

// 黑键在一个八度12键中的key值
export const BLACK_KEYS = [2, 4, 7, 9, 11];

// 白键长14.4cm 宽2.4cm
export const WHITE_KEY_ATTR = {
    height: 1,
    length: 14.4,
    width: 2.4,
};

// 黑键长8.6cm 宽0.9cm
export const BLACK_KEY_ATTR = {
    height: 2,
    length: 8.6,
    width: 0.9,
};

// 钢琴琴键
export class Key {
    public mesh: Mesh;
    public readonly index: number;
    public readonly key: number;
    public readonly level: number;
    public readonly size: {
        height: number,
        length: number,
        width: number,
    };
    private _sound: Sound;
    private _scene: Scene;

    constructor(options: ICreateKeyOptions, scene: Scene, mouseEventCounter: MouseEventCounter) {
        const isBlack = BLACK_KEYS.includes(options.key);
        this.mesh = MeshBuilder.CreateBox(`key${options.index}`,
            { width: isBlack ? BLACK_KEY_ATTR.width : WHITE_KEY_ATTR.width, depth: isBlack ? BLACK_KEY_ATTR.length : WHITE_KEY_ATTR.length, height: isBlack ? BLACK_KEY_ATTR.height : WHITE_KEY_ATTR.height, faceColors: isBlack ? [new Color4(), new Color4(), new Color4(), new Color4(), new Color4(), new Color4()] : [] }, scene);
        this.index = options.index;
        this.key = options.key;
        this.level = options.level;
        this.size = isBlack ? this.size = { ...BLACK_KEY_ATTR } : this.size = { ...WHITE_KEY_ATTR };

        this._sound = new Sound(pitchNames[this.index], pitchMap[pitchNames[this.index]], scene);
        this._scene = scene;
        // 绑定事件
        this.mesh.actionManager = new ActionManager(scene);
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickDownTrigger,
                () => {
                    this.press();
                    // console.log("OnPickDownTrigger");
                },
            ),
        );

        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickUpTrigger,
                async () => {
                    this.release();
                    // for (let i = 1; i < 20; i++) {
                    //     const volume = decay(i * 50, 0.005, 1);
                    //     console.log(this.index, volume);
                    //     sound.setVolume(volume);
                    //     await sleep(50);
                    // }
                    // sound.stop();
                    // console.log("OnPickUpTrigger");
                },
            ),
        );

        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPointerOutTrigger,
                async () => {
                    if (mouseEventCounter.leftButton) { this.release(); }
                    // for (let i = 1; i < 20; i++) {
                    //     const volume = decay(i * 50, 0.005, 1);
                    //     console.log(this.index, volume);
                    //     sound.setVolume(volume);
                    //     await sleep(50);
                    // }
                    // sound.stop();
                    // console.log("OnPointerOutTrigger");
                },
            ),
        );

        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPointerOverTrigger,
                async () => {
                    if (mouseEventCounter.leftButton) { this.press(); }
                    // console.log("OnPointerOverTrigger");
                },
            ),
        );
    }

    public press() {
        this.mesh.position.y = -0.3;
        const myMaterial = new StandardMaterial("myMaterial", this._scene);

        myMaterial.diffuseColor = new Color3(1, 0, 1);
        myMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
        myMaterial.emissiveColor = new Color3(0.6, 0.6, 0.6);
        this.mesh.material = myMaterial;
        this._sound.play();
    }

    public release() {
        this.mesh.position.y = 0;
        this.mesh.material = null;
    }
}
