import React, { Component } from 'react';
import './App.css';
import video from './video.mp4';
import watermark from './watermark.png';

class App extends Component {
	state = {};

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
						console.log('Button clicked!');
						const canvas = document.createElement('canvas');
						canvas.width = 1280;
						canvas.height = 720;
						var context = canvas.getContext('2d');
						context.drawImage(document.querySelector('video'), 0, 0, 720, 1280);
						context.drawImage(
							document.querySelector('.watermark'),
							parseInt(document.querySelector('select').value),
							document.querySelector('input').value
						);
						if (document.querySelector('input[name=live]').checked) {
							this.setState({ image: canvas.toDataURL() });
						}
					}}
				/>
				<div style={{}}>
					<span>Watermark X</span>
					<select>
						{range.map(i => (
							<option>{i}</option>
						))}
					</select>
					<span>Watermark Y</span>
					<input type="text" name="y" />
					<span>Live</span>
					<input type="checkbox" name="live" />
					<button
						onClick={() => {
							console.log('Button clicked!');
							const canvas = document.createElement('canvas');
							canvas.width = 1280;
							canvas.height = 720;
							var context = canvas.getContext('2d');
							context.drawImage(document.querySelector('video'), 0, 0, 1280, 720);
							context.drawImage(
								document.querySelector('.watermark'),
								parseInt(document.querySelector('select').value),
								document.querySelector('input').value
							);
							this.setState({ image: canvas.toDataURL() });
						}}
					>
						Watermark!
					</button>
					<img className="watermark" src={watermark} style={{ visibility: 'hidden' }} />
					<img src={this.state.image} />
				</div>
			</div>
		);
	}
}

export default App;
