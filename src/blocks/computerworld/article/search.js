
import React, { Component } from 'react';
import Solr from '../solr';

import './search.scss';

const solrEndpoint = 'https://solrproxy.devz.no/solr/newsfront-computerworld';
const imageSource = 'http://static.cw.newsfront.no/sites/default/files/styles/crop_image_main_large/public';
const sitePath = 'http://www.cw.no';

class ArticleSearch extends Component {
  state = {
    list: [],
    found: 0,
    pages: [],
    q: '',
  };

  load = async (q, start = 0, rows = 12) => {
    const qs = {};
    if(q) { qs.title = q; }

    // Retrieve articles
    const { docs, numFound } = await this.solrClient.getArticles(rows, start, qs);
    docs.forEach(doc => {
      doc.link = `${sitePath}/${doc.path_alias}`;
      const media = doc.media = doc.media && JSON.parse(doc.media);
      const image = media && media.image && media.image.main;
      doc.main_image = image ? `${imageSource}/${image.path}` : null;
    });

    // Build pagination
    const pages = getPages(numFound, start);

    this.setState({ list: docs, found: numFound, pages });

    // Store params
    sessionStorage.setItem('cwArticleSearchParams', JSON.stringify({ q, start }));
  };

  componentDidMount () {
    this.solrClient = new Solr(solrEndpoint);

    // Load params
    const stored = sessionStorage.getItem('cwArticleSearchParams');
    if(stored) {
      const { q, start } = JSON.parse(stored);
      console.log({ q, start });
      this.setState({ q, start });
      return this.load(q, start);
    }
    this.load();
  }

  onChange = ev => {
    this.setState({ q: ev.target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();
    this.load(this.state.q);
  };

  onSelect = (ev, article) => {
    ev.preventDefault();
    this.props.select(article);
  };

  onPageChange = (ev, page) => {
    ev.preventDefault();
    ev.target.blur();
    this.load(this.state.q, page.start);
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
function getPages (found, start = 0, rows = 12) {
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
  if(page > 4) {
    pages.push({ start: 0, label: '<<' });
  }
  if(page > 1) {
    pages.push({ start: rows, label: '<' });
  }
  for(let i = from; i <= until; i++) {
    pages.push({ start: (i - 1) * rows, label: i, current: i === page });
  }
  if(page < total) {
    pages.push({ start: page * rows, label: '>' });
  }
  if(page < total - 3) {
    pages.push({ start: (total - 1) * rows, label: '>>' });
  }
  return pages;
}
