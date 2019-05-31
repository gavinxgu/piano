import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import { Scene } from "@babylonjs/core/scene";

export class MouseEventCounter {
    public leftButton: boolean;
    public rightButton: boolean;
    public centerButton: boolean;
    constructor(scene: Scene) {
        this.leftButton = false;
        this.rightButton = false;
        this.centerButton = false;

        scene.onPrePointerObservable.add((pointerInfo, eventState) => {
            switch (pointerInfo.event.button) {
                default:
                case 0:
                    this.leftButton = true;
                case 1:
                    this.centerButton = true;
                case 2:
                    this.rightButton = true;
            }
        }, PointerEventTypes.POINTERDOWN, false);

        scene.onPrePointerObservable.add((pointerInfo, eventState) => {
            switch (pointerInfo.event.button) {
                default:
                case 0:
                    this.leftButton = false;
                case 1:
                    this.centerButton = false;
                case 2:
                    this.rightButton = false;
            }
        }, PointerEventTypes.POINTERUP, false);
    }
}
