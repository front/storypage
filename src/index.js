// External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import 'bootstrap/dist/css/bootstrap.css';
// import './style/style.scss';

// Internal Dependencies
import './core/index.js';
import registerServiceWorker from './registerServiceWorker';
import Router from './components/router';
import reducers from './store/reducer';

const createStoreWithMiddleware = applyMiddleware()( createStore );

ReactDOM.render(
	<Provider store={ createStoreWithMiddleware( reducers ) }>
		<Router />
	</Provider>, document.querySelector( '#root' ) );

registerServiceWorker();
