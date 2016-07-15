import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import makeRTCDriver from './drivers/webrtc';

console.log(makeRTCDriver());

const drivers = {
	DOM: makeDOMDriver('#app'),
	HTTP: makeHTTPDriver(),
	WEBRTC: makeRTCDriver()
};

import App from './app/index.js';

Cycle.run(App, drivers);
