import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './not_found';
import App from './app';
import PagesIndex from './pages/pages_index';
import PagesEdit from './pages/pages_edit';
import PagesNew from './pages/pages_new';
import PagesShow from './pages/pages_show';

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
    )
  }
}

export default Router;
