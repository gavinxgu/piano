import { ILoadingScreen } from "babylonjs";
import spin from "./assets/spin.svg";

export class MyLoadingScreen implements ILoadingScreen {
    // optional, but needed due to interface definitions
    public loadingUIBackgroundColor: string;
    private _overlay: HTMLDivElement;
    private _spin: HTMLImageElement;
    private _text: HTMLParagraphElement;
    constructor() {
        this.loadingUIBackgroundColor = "";
        this._overlay = document.createElement("div");
        this._overlay.id = "loadingOverlay";
        this._spin = document.createElement("img");
        this._spin.id = "loadingSpin";
        this._spin.src = spin;
        this._text = document.createElement("p");
        this._text.id = "loadingText";
        this._text.innerText = this.loadingUIText;
        this._overlay.appendChild(this._spin);
        this._overlay.appendChild(this._text);
    }

    public set loadingUIText(value: string) {
        this._text.innerText = value;
    }

    public get loadingUIText() {
        return this._text.innerText;
    }

    public displayLoadingUI() {
        document.body.appendChild(this._overlay);
    }

    public hideLoadingUI() {
        document.body.removeChild(this._overlay);
    }
}
