import { ILoadingScreen } from "babylonjs";
import spin from "./assets/spin.svg";

export class MyLoadingScreen implements ILoadingScreen {
    // optional, but needed due to interface definitions
    public loadingUIBackgroundColor: string;
    private _overlay: HTMLDivElement;
    private _spin: HTMLImageElement;
    private _text: HTMLParagraphElement;
    private _loading: boolean;
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
        this._overlay.addEventListener("click", () => {
            if (!this._loading) {
                // 这个trick用来解除: The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
                const context = new AudioContext();
                context.resume().then(() => {
                    console.log('Playback resumed successfully');
                });
                document.body.removeChild(this._overlay);
            }
        });
        this._loading = false;
    }

    public set loadingUIText(value: string) {
        this._text.innerText = value;
    }

    public get loadingUIText() {
        return this._text.innerText;
    }

    public displayLoadingUI() {
        this._loading = true;
        document.body.appendChild(this._overlay);
    }

    public hideLoadingUI() {
        this._spin.style.display = "none";
        this.loadingUIText = "Click or Touch to countinue";
        this._loading = false;
    }
}
