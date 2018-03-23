import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import registerServiceWorker from './registerServiceWorker';

import './core/index.js';
import { registerCoreBlocks } from 'gutenberg';
// import { registerCustomBlocks } from './components/blocks';

import Router from './components/router';
import reducers from './reducers';

import './style/style.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// register default blocks
registerCoreBlocks();

// register custom blocks
// registerCustomBlocks();

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router />
	</Provider>, document.querySelector('#root'));

registerServiceWorker();
