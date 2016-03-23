
import Rx from 'rx';
import {
	header, section, ul, li, label,
	button, br, a, h1, table, tr, td, th, tbody, thead, div,
	canvas, video
} from '@cycle/dom';

window.requestAnimFrame = (function() {
	return	window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

const hslToRgb = (h, s, l) => {
	var r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [r * 255, g * 255, b * 255];
};

const draw = () => {
	let ctx = document.getElementById('screen').getContext('2d');
	let video = document.getElementById('video');

	const tr = 255;
	const tg = 0;
	const tb = 0;

	requestAnimFrame(draw);
	ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
		0, 0, ctx.canvas.width, ctx.canvas.height);

	let pixels = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let	i = 0;
	let brightness;

	for (; i < pixels.data.length; i += 4) {
		// brightness code from Tab Atkins' canvas demos
		brightness = ((3 * pixels.data[i] + 4 * pixels.data[i + 1] + pixels.data[i + 2]) >>> 3) / 256;

		pixels.data[i] = ((tr * brightness) + 0.5) >> 0;
		pixels.data[i + 1] = ((tg * brightness) + 0.5) >> 0;
		pixels.data[i + 2] = ((tb * brightness) + 0.5) >> 0;
	}
	ctx.putImageData(pixels, 0, 0);
};

window.draw = draw;

const App = (sources) => {

	// fetchUsers(dom) -> usersRequest(http) -> usersResponse(http) -> displayUsers(dom)

	const fetchVideoClick$ = sources.DOM.select('#fetch-video').events('click');

	/*
	let video$$ = sources.WebRTC.getUserMedia({
		audio: false,
		video: true
	});
	*/

	const constraints = {
		audio: false,
		video: true
	};

	const video$$ = fetchVideoClick$.map(() =>
		sources.WEBRTC.getUserMedia(constraints)).mergeAll().startWith(false);

	return {
		DOM: video$$.map(video$ => {
			//console.log(video$);
			return section([
				header('.navbar.navbar-default', [
					div('.container', [
						div('.navbar-header', [
							a('.navbar-brand', 'Cycle.js WebRTC Prototype')
						])
					])
				]),
				div('.container', [
					br(),
					button('.btn#fetch-video', 'Fetch video'),
					div('.row', [
						div('.col-xs-6',
							video('#video', {
								muted: 'muted',
								autoplay: 'autoplay',
								src: (video$) ? window.URL.createObjectURL(video$) : ''
							})
						),
						div('.col-xs-6',
							canvas('#screen')
						)
					])
				])
			]);
		})
	};
};

export default App;
