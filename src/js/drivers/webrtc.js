
import Rx from 'rx';

import webRTC from 'webrtc-adapter-test';

function makeWebRTCDriver(constraints){
	return function webRTCDriver(){
		const video$ = Rx.Observable.fromPromise(webRTC.getUserMedia(constraints));
		return video$;
	}
}

export default makeWebRTCDriver;