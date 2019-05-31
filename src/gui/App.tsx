import * as React from "react";
import logo from "../assets/SteinwayLogo.svg";
import { SampleButtons } from "./SampleButtons";
export class App extends React.Component {
    public render() {
        return (
            <>
                <div id="steinwayLogo-container">
                    <img id="steinwayLogo" src={logo} alt="" />
                </div>
                <SampleButtons />
                <div id="footer">
                    <p>author<a href="https://github.com/gavinxgu" target="_blank">@gavinxgu</a></p>
                    <p>engine<a href="https://www.babylonjs.com/" target="_blank">@babylonjs</a></p>
                    <p>audio<a href="http://theremin.music.uiowa.edu/MISpiano.html" target="_blank">@University of Iowa Electronic Music Studios</a></p>
                </div>
            </>
        );
    }
}
