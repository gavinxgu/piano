import * as BABYLON from "babylonjs";

export class MouseEventCounter {
    public leftButton: boolean;
    public rightButton: boolean;
    public centerButton: boolean;
    constructor(scene: BABYLON.Scene) {
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
        }, BABYLON.PointerEventTypes.POINTERDOWN, false);

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
        }, BABYLON.PointerEventTypes.POINTERUP, false);
    }
}
