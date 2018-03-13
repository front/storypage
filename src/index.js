import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import Router from './components/router';

import './css/style.css';

ReactDOM.render(<Router />, document.querySelector('#root'));

registerServiceWorker();
