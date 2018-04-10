// External Dependencies
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Internal Dependencies
import NotFound from './not_found';
import App from './app';
import PagesIndex from './pages/index';
import PagesEdit from './pages/edit';
import PagesNew from './pages/new';
import PagesShow from './pages/show';

class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={ App } />
					<Route exact path="/pages" component={ PagesIndex } />
					<Route exact path="/pages/new" component={ PagesNew } />
					<Route exact path="/pages/:id/edit" component={ PagesEdit } />
					<Route exact path="/pages/:id" component={ PagesShow } />
					<Route component={ NotFound } />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
