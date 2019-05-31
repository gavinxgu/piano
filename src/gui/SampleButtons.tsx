import { Midi } from "@tonejs/midi/dist/Midi";
import * as React from "react";
import { player } from "../index";
import CityOfStarsMidi from "../sheets/CITY OF STARS.mid";
import lalalandMidi from "../sheets/lala land .mid";
// import ALovelyNightMidi from "../sheets/A Lovely Night (Ost La La Land).mid";
import AllegrettoMidi from "../sheets/光年之外.mid";

const SheetButton = (props: { text: string, midiURL: string }) => {
    const clickHandler = () => {
        Midi.fromUrl(props.midiURL).then((data) => {
            player.stop();
            player.load(data);
            player.play();
        });
    };

    return (
        <div>
            <div className="sheetBtn" onClick={clickHandler}>
                {props.text}
            </div>
        </div>
    );
};

export class SampleButtons extends React.Component {

    public componentDidMount() {
        Midi.fromUrl(CityOfStarsMidi).then((data) => {
            player.stop();
            player.load(data);
            player.play();
        });
    }

    public render() {
        return (
            <div id={"btnContainer"}>
                <p id={"sheetsTitle"}>Sample Sheets</p>
                <SheetButton text={"光年之外"} midiURL={AllegrettoMidi} />
                <SheetButton text={"La La Land"} midiURL={lalalandMidi} />
                <SheetButton text={"City Of Stars"} midiURL={CityOfStarsMidi} />
                {/* <SheetButton text={"A Lovely Night"} midiURL={ALovelyNightMidi} /> */}
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="sheetBtn" onClick={player.play}><div className="triangle" /></div>
                    <div className="sheetBtn" onClick={player.resume}> | | </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="sheetBtn" onClick={player.stop}><div className="box" /></div>
                </div>
            </div>
        );
    }
}
