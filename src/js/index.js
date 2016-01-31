import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

const drivers = {
	DOM: makeDOMDriver('#app'),
	HTTP: makeHTTPDriver()
};

import App from './app/index.js';

Cycle.run(App, drivers);
