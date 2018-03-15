import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import registerServiceWorker from './registerServiceWorker';

// import { registerCoreBlocks } from './components/gutenberg/blocks';

import Router from './components/router';
import reducers from './reducers';

import './css/style.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

// registerCoreBlocks();

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router />
	</Provider>, document.querySelector('#root'));

registerServiceWorker();
