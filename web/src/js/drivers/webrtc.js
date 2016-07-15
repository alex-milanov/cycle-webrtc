
import {Observable as $} from 'rx';

// import webRTCAdapterTest from 'webrtc-adapter-test';

const makeWebRTCDriver = () => {
	const getUserMedia = constraints =>
		$.fromPromise(navigator.mediaDevices.getUserMedia(constraints));

	return () => ({
		getUserMedia
	});
};

export default makeWebRTCDriver;
