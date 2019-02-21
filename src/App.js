import React, { Component } from 'react';
import './App.css';
import video from './video.mp4';
import watermark from './watermark.png';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}


	render() {
		const range = [];
		for (let i = 0; i < 1280; i++) {
			range.push(i);
		}
		return (
			<div className="app">
				<video
					src={video}
					controls
					onTimeUpdate={() => {

						//Create and Size Canvas

						const canvas = document.createElement('canvas');
						canvas.width = 1280;
						canvas.height = 720;
						
						// Draw and Update Image Values
						const context = canvas.getContext('2d');
						context.drawImage(document.querySelector('video'), 0, 0, 720, 1280);
						context.drawImage(
							document.querySelector('.watermark'),
							parseInt(document.querySelector('select').value),
							parseInt(document.querySelector('select').value)
						);
						if (document.querySelector('input[name=live]').checked) {
							this.setState({ image: canvas.toDataURL() });
						}
					}}
				/>
				<div>
				<div className="watermarkButton" style={{}}>

					<span className="watermarkButtonX">Watermark X
					<select className="positionX">
						{range.map(i => (
							<option key={i}>{i}</option>
						))}
					</select></span>

					<span className="watermarkButtonY">Watermark Y
					<select className="positionY">
						{range.map(i => (
							<option key={i}>{i}</option>
						))}
					</select></span>

					

					<span>Live</span>
					<input type="checkbox" name="live" />
					</div>
					
					<button className = "watermarkButton watermarkSubmit"
						onClick={() => {
							const canvas = document.createElement('canvas');
							canvas.width = 1280;
							canvas.height = 720;
							const context = canvas.getContext('2d');
							context.drawImage(document.querySelector('video'), 0, 0, 1280, 720);
							context.drawImage(
								document.querySelector('.watermark'),
								parseInt(document.querySelector('.positionX').value),
								parseInt(document.querySelector('.positionY').value)
							);
							this.setState({ image: canvas.toDataURL() });
						}}
					>
						Watermark!
					</button>
					<img alt="watermarks" className="watermark" src={watermark} style={{ visibility: 'hidden' }} />
					<img alt="watermarks" className="watermarkDisplay" height="405px" width="560px" src={this.state.image} />
				</div>
			</div>
		);
	}
}

export default App;
