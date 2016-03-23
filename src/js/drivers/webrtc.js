
import Rx from 'rx';
// import webRTCAdapterTest from 'webrtc-adapter-test';

let makeWebRTCDriver = () => {

	navigator.getUserMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia;

	let getUserMedia = (constraints, cb) => {
		let cbBuild = (err) => (res) => {
			if (err) {
				cb(new Error(res));
			} else {
				cb(res);
			}
		};
		navigator.getUserMedia(constraints, cbBuild(false), cbBuild(true));
	};

	return () => ({
		getUserMedia: Rx.Observable.fromCallback(getUserMedia)
	});
};

export default makeWebRTCDriver;
