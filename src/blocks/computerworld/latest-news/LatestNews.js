
import React, { Component } from 'react';
import moment from 'moment';
import Solr from './solr';
import './style.scss';


const site = 'http://www.cw.no';
const imagePath = 'http://static.cw.newsfront.no/sites/default/files/styles/crop_image_hero_small/public';

function parseArticle (doc) {
  doc.media = doc.media && JSON.parse(doc.media);
  if(doc.media && doc.media.image) {
    const image = doc.media.image.main;
    doc.image_url = `${imagePath}/${image.path}`;
  }
  doc.url = `${site}/${doc.path_alias}`;
}

function formatDate (ts) {
  return moment(ts).format('ddd D MMM, [kl] HH:mm');
}


class LatestNews extends Component {
  state = {
    articles: [],
  };

  init = async () => {
    try {
      const data = await this.solrClient.getArticles(5, 0, this.props.tag);
      data.docs.forEach(d => parseArticle(d));
      // console.log('Loaded articles', data.docs);
      this.setState({ articles: data.docs });
    }
    catch(err) {
      console.log(err);
    }
  };

  componentDidMount () {
    this.solrClient = new Solr(
      'http://solr1.newsfront.no/solr/newsfront-computerworld/select/',
      'https://solrproxy.devz.no/solr',
    );
    this.init();
  }

  render () {
    const { articles } = this.state;
    const { tag } = this.props;
    const onClick = ev => this.props.edit && ev.preventDefault();

    return (
      <div className="cw-latest-news">
        <header><h2>Siste nyheter</h2></header>
        <ul>
          { articles.map((item, idx) => (
            <li className="clearfix" key={ idx }>
              <a href={ item.url } onClick={ onClick }>
                <img src={ item.image_url } alt={ item.short_title } />
                <div>
                  <h3>{ item.short_title }</h3>
                  <time className="published">Publisert: { formatDate(item.published) }</time>
                </div>
              </a>
            </li>
          )) }
        </ul>
        <footer>
          { tag && (
            <span className="more">
              <a href={ `${site}/emne/${tag}` } onClick={ onClick }>Flere nyheter
                <img src={ `${site}/sites/computerworld/img/arrow-right.png` } alt="ComputerWorld.NO" />
              </a>
            </span>
          ) }
          <h3>
            <a href={ `${site}/om/abonnement` } onClick={ onClick }>Meld deg på vårt nyhetsbrev</a>
          </h3>
        </footer>
      </div>
    );
  }
}

export default LatestNews;
