
import Rx from 'rx';
import {
	header, section, ul, li, video, label,
	button, br, a, h1, table, tr, td, th, tbody, thead, div 
} from '@cycle/dom';


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

	const video$$ = fetchVideoClick$.map(() => sources.WEBRTC.getUserMedia(constraints)).mergeAll().startWith(false);

	return {
		DOM: video$$.map( video$ => {
			console.log(video$);
			return section([
					header('.navbar.navbar-default', [
						div('.container', [
							div('.navbar-header', [
								a('.navbar-brand', 'Cycle.js WebRTC Prototype')
							])
						])
					]),
					div('.container',[
						br(),
						button('.btn#fetch-video', 'Fetch video'),
						video({
							muted: 'muted',
							autoplay: 'autoplay', 
							src: (video$) ? window.URL.createObjectURL(video$) : ''
						})
					])
				])
			}
		)
	}
}

export default App;
