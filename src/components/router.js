import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './not_found';
import App from './app';
import PostsIndex from './posts/posts_index';
import PostsEdit from './posts/posts_edit';
import PostsNew from './posts/posts_new';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ App } />
          <Route exact path="/posts" component={ PostsIndex } />
          <Route exact path="/posts/new" component={ PostsNew } />
          <Route exact path="/posts/:id" component={ PostsEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router;
