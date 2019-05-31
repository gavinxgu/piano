import { Midi } from "@tonejs/midi";
import { Piano } from "./piano";

// 一个钢琴播放器
// 支持midi音频
export class Player {
    private _piano: Piano;
    private _sheet: Midi | null;
    private _offset: number;
    private _isPaused: boolean;
    private _pressKeySTOs: Set<number>;
    constructor(piano: Piano) {
        this._piano = piano;
        this._offset = 0;
        this._sheet = null;
        this._isPaused = true;
        this._pressKeySTOs = new Set<number>();
    }

    public get offset() {
        return this._offset;
    }

    public set offset(offset: number) {
        this._offset = offset;
    }

    public load(sheet: Midi) {
        this._sheet = sheet;
        this._offset = 0;
    }

    public play() {
        this._isPaused = false;
        if (this._sheet) {
            const pianokeyMap = this._piano.keys;
            const speed = 1000;
            const setTimeout = window.setTimeout;
            this._sheet.tracks.forEach((track) => {
                track.notes.forEach((note) => {
                    if (note.time - this._offset >= 0) {
                        const pressKeySTO = setTimeout(() => {
                            this._offset = note.time;
                            this._pressKeySTOs.delete(pressKeySTO);
                            const key = pianokeyMap.get(note.midi - 21);
                            if (key && !this._isPaused) {
                                key.press();
                                setTimeout(() => {
                                    key.release();
                                }, note.duration * speed);
                            }
                        }, (note.time - this._offset) * speed);
                        this._pressKeySTOs.add(pressKeySTO);
                    }
                });
            });
        } else {
            console.warn("Play abort. No sheet select!");
        }
    }

    public resume() {
        this._isPaused = true;
        for (const STO of this._pressKeySTOs) {
            clearTimeout(STO);
        }
        this._pressKeySTOs.clear();
    }

    public stop() {
        this.resume();
        this._offset = 0;
    }

    public restart() {
        this._offset = 0;
        this.play();
    }
}

export const autoSheetPlayer = (piano: Piano, sheet: Midi, offset: number = 0, hooks?: { onProcess?: () => void }) => {
    const pianokeyMap = piano.keys;
    const speed = 1000;
    sheet.tracks.forEach((track) => {
        track.notes.forEach((note) => {
            if (note.time - offset >= 0) {
                setTimeout(() => {
                    const key = pianokeyMap.get(note.midi - 21);
                    if (key) {
                        key.press();
                        setTimeout(() => {
                            key.release();
                        }, note.duration * speed);
                    }
                }, (note.time - offset) * speed);
            }
        });
    });
};
