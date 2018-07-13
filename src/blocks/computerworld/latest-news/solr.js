
import { stringify } from 'querystring';

class Solr {
  constructor (url, proxy) {
    this.endpoint = url;
    this.proxy = proxy;
  }

  async getArticles (rows = 5, start = 0, tag = null) {
    const url = this.proxy || this.endpoint;
    const params = {
      start, rows,
      q: 'bundle:article AND status:true AND unlisted:false',
      fl: 'short_title,published,path_alias,media',
      sort: 'published desc',
      wt: 'json',
    };

    if(tag) {
      params.q += ` AND tags:${tag}`;
    }
    if(this.proxy) {
      params.endpoint = this.endpoint;
    }

    const qs = stringify(params);
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };

    const res = await window.fetch(`${url}?${qs}`, options);
    const data = await res.json();
    return data.response;
  }
}

export default Solr;
