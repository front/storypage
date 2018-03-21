import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import registerServiceWorker from './registerServiceWorker';

import { registerCoreBlocks } from '@wordpress/blocks';
import { registerCustomBlocks } from './components/blocks';

import Router from './components/router';
import reducers from './reducers';

// import './components/blocks/style.scss';
import './css/style.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// register default blocks
registerCoreBlocks();

// register custom blocks
registerCustomBlocks();

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router />
	</Provider>, document.querySelector('#root'));

registerServiceWorker();
