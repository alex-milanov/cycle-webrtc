
import Rx from 'rx';
import {
	header, section, ul, li, label,
	button, br, a, h1, table, tr, td, th, tbody, thead, div,
	canvas, video
} from '@cycle/dom';

import canvasApi from './canvas';

const App = sources => {
	// fetchUsers(dom) -> usersRequest(http) -> usersResponse(http) -> displayUsers(dom)

	const fetchVideoClick$ = sources.DOM.select('#fetch-video').events('click');
	const drawClick$ = sources.DOM.select('#draw').events('click');

	/*
	let video$$ = sources.WebRTC.getUserMedia({
		audio: false,
		video: true
	});
	*/

	const constraints = {
		audio: false,
		video: {
			mediaSource: "screen" // options are 'screen' ‘window‘ or ‘application‘
		}
	};

	const video$$ = fetchVideoClick$.map(() =>
		sources.WEBRTC.getUserMedia(constraints)).mergeAll().startWith(false);

	drawClick$.subscribe(() => canvasApi.draw());

	return {
		DOM: video$$.map(video$ => {
			// console.log(video$);
			return section([
				header([
					h1('Cycle.js WebRTC Prototype'),
					ul([
						li(button('#fetch-video', 'Fetch video')),
						li(button('#draw', 'Draw'))
					])
				]),
				section('.content', [
					video('#video', {
						muted: 'muted',
						autoplay: 'autoplay',
						src: (video$) ? window.URL.createObjectURL(video$) : ''
					}),
					canvas('#screen')
				])
			]);
		})
	};
};

export default App;
