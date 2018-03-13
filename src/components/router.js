import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './not_found';
import App from './app';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ App } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router;
