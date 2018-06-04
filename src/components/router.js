// External Dependencies
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Internal Dependencies
import NotFound from './not_found';
import App from './app';
import PagesIndex from './pages/index';
import PagesEdit from './pages/edit';
import PagesShow from './pages/show';

export default () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={ App } />
			<Route exact path="/stories" component={ PagesIndex } />
			<Route exact path="/(posts|pages)/new" component={ PagesEdit } />
			<Route exact path="/(posts|pages)/:id/edit" component={ PagesEdit } />
			<Route exact path="/(posts|pages)/:id/(preview)" component={ PagesShow } />
			<Route exact path="/(posts|pages)/:id" component={ PagesShow } />
			<Route component={ NotFound } />
		</Switch>
	</BrowserRouter>
);
