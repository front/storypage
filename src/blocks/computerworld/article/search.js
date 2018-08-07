
import React, { Component } from 'react';
import Solr from '../solr';

import './search.scss';


class ArticleSearch extends Component {
  state = {
    list: [],
    found: 0,
    q: '',
  };

  init = async (start = 0) => {
    const { q } = this.state;
    const qs = {};
    if(q) { qs.title = q; }

    // Retrieve articles
    const data = await this.solrClient.getArticles(12, start, qs);
    data.docs.forEach(i => i.media = i.media && JSON.parse(i.media));

    this.setState({ list: data.docs, found: data.numFound });
  };

  componentDidMount () {
    this.solrClient = new Solr('https://solrproxy.devz.no/solr/newsfront-computerworld');
    this.init();
  }

  onChange = ev => {
    this.setState({ q: ev.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    this.init();
  };

  render () {
    const { select } = this.props;
    const { list, found, q } = this.state;

    return (
      <div className="cw-article-search">
        <h2>Articles</h2>
        <form onSubmit={ this.onSubmit }>
          <input type="text" value={ q } onChange={ this.onChange } placeholder="Search articles..." />
          <span>{ found } results</span>
        </form>
        <br />
        <ul className="results">
          { list.map((item, i) => (
            <li key={ i }>
              <a href="" onClick={ ev => { ev.preventDefault(); select(item); }}>{ item.short_title }</a>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

export default ArticleSearch;
