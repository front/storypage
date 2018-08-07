
import React, { Component } from 'react';
import Solr from '../solr';

import './search.scss';


class ArticleSearch extends Component {
  state = {
    list: [],
    found: 0,
    pages: [],
    q: '',
  };

  load = async (start = 0) => {
    const { q } = this.state;
    const qs = {};
    if(q) { qs.title = q; }

    // Retrieve articles
    const { docs, numFound } = await this.solrClient.getArticles(12, start, qs);
    docs.forEach(i => i.media = i.media && JSON.parse(i.media));

    // Build pagination
    const pages = getPages(numFound, start);

    this.setState({ list: docs, found: numFound, pages });
  };

  componentDidMount () {
    this.solrClient = new Solr('https://solrproxy.devz.no/solr/newsfront-computerworld');
    this.load();
  }

  onChange = ev => {
    this.setState({ q: ev.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    this.load();
  };

  onSelect = (ev, article) => {
    ev.preventDefault();
    this.props.select(article);
  };

  onPageChange = (ev, page) => {
    ev.preventDefault();
    ev.target.blur();
    this.load(page.target);
  };

  render () {
    const { onChange, onSubmit, onSelect, onPageChange } = this;
    const { list, pages, found, q } = this.state;

    return (
      <div className="cw-article-search">
        <h2>Articles</h2>
        <form onSubmit={ onSubmit }>
          <input type="text" value={ q } onChange={ onChange } placeholder="Search articles..." />
          <span>{ found } results</span>
        </form>
        <br />
        <ul className="results">
          { list.map((a, i) => (
            <li key={ i }>
              <a href="" onClick={ ev => onSelect(ev, a) }>{ a.short_title }</a>
            </li>
          )) }
        </ul>
        <ul className="pagination">
          { pages.map((p, i) => (
            <li key={ i } className={ p.current ? 'current' : '' }>
              <a href="" onClick={ ev => onPageChange(ev, p) }>{ p.label }</a>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

export default ArticleSearch;



// Build the pages list
function getPages (found, start, rows = 12) {
  const page = Math.floor(start / rows) + 1;
  const total = Math.floor(found / rows) + 1;

  let from = page - 3, until = page + 3;
  if(from < 1) {
    from = 1;
    until = from + 6;
  }
  if(until > total) {
    until = total;
    from = until - 6;
    if(from < 1) { from = 1; }
  }

  const pages = [];
  if(page > 2) {
    pages.push({ target: 0, label: '<<' });
  }
  if(page > 1) {
    pages.push({ target: rows, label: '<' });
  }
  for(let i = from; i <= until; i++) {
    pages.push({ target: (i - 1) * rows, label: i, current: i === page });
  }
  if(page < total - 1) {
    pages.push({ target: page * rows, label: '>' });
  }
  if(page < total) {
    pages.push({ target: (total - 1) * rows, label: '>>' });
  }
  return pages;
}
