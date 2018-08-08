
import { stringify } from 'querystring';

class Solr {
  constructor (url, proxy) {
    this.endpoint = url;
    this.proxy = proxy;
  }

  async getArticles (rows = 5, start = 0, query, extra) {
    const url = this.proxy || this.endpoint;

    // Search params
    const params = {
      start, rows,
      fl: 'entity_id,short_title,teaser,intro,path_alias,media,image_caption,authors,published,tags,section',
      sort: 'published desc',
      wt: 'json',
      ...extra,
    };

    // Query
    const defaults = {
      bundle: 'article',
      status: true,
      unlisted: false,
    };
    const qs = { ...defaults, ...query };
    params.q = Object.keys(qs).map(k => `${k}:${qs[k]}`).join(' AND ');

    if(this.proxy) {
      params.endpoint = this.endpoint;
    }

    // Request
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'force-cache',
    };

    const res = await window.fetch(`${url}?${stringify(params)}`, options);
    const data = await res.json();
    return data.response;
  }
}

export default Solr;
