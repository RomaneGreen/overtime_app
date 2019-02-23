
import React, {Component} from "react";
import "./App.css";
import video from "./video.mp4";
import watermark from "./watermark.png";

const width = 1280;
const height = 720;
const range = Array(300).fill().map((x, i) => <option key={i}>{i}</option>);

class App extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.canvasMagic(".watermark", "select", "select");
    }

    canvasMagic(el, x, y) {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        const context = canvas.getContext("2d");
        context.drawImage(document.querySelector("video"), 0, 0, width, height);
        context.drawImage(
            document.querySelector(el),
            parseInt(document.querySelector(x).value),
            parseInt(document.querySelector(y).value)
        );
        if(document.querySelector("input[name=live]").checked) {
            this.setState({image: canvas.toDataURL()});
        }
    }

    render() {
        return (
            <div className="app">
                <video src={video} controls/>

                <div>
                    <div className="watermarkButton">

                        <span className="watermarkButtonX">Watermark X
                            <select className="positionX">{range}</select>
                        </span>

                        <span className="watermarkButtonY">Watermark Y
                            <select className="positionY">{range}</select>
                        </span>


                        <span>Live</span>
                        <input type="checkbox" name="live"/>
                    </div>


                    <button className="watermarkButton watermarkSubmit"
                            onClick={() => this.canvasMagic(".watermark", ".positionX", ".positionY")}> Watermark!
                    </button>

                    <img alt="watermarks" className="watermark" src={watermark} style={{visibility: "hidden"}}/>
                    <img alt="watermarks" className="imageDisplay" height="405px" width="560px" src={this.state.image}/>
                </div>
            </div>
        );
    }
}

export default App;