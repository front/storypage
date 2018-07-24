// External Dependencies
import FakeRest from 'fakerest';
import sinon from 'sinon';
import jQuery from 'jquery';
import { map, merge } from 'lodash';
import { parse } from 'querystringify';

// Internal Dependencies
import * as Actions from '../../store/actions';
import { resetPath } from '../url';

const apiRoot = '/wp/v2';

/**
 * Aqpi request
 *
 * @param  {Object} options Options to request
 * @return {Object}	Request result (promise)
 */
function apiRequest (options) {
  let pathArray = options.path.split('?');

  const path = pathArray[ 0 ];
  const queryStringOptions = parse(pathArray[ 1 ]);

  pathArray = pathArray[ 0 ].split('/');

  const resource = pathArray[ 3 ];
  const resoureceId = pathArray[ 4 ];

  const method = options.method || 'GET';

  if (queryStringOptions) {
    options.data = merge(options.data, queryStringOptions);
  }

  // console.log('apiRequest options', options, path);

  if (path === '/oembed/1.0/proxy') {
    // https://twitter.com/mikescollins/status/1006351423796318209?s=19
    return jQuery.ajax({
      url: `http://open.iframe.ly/api/oembed?url=${options.data.url}&origin=qwerty`,
    });
  }

  return jQuery.Deferred(dfd => {
    let res;
    let singleResource = false;

    // Call actions by invoked path
    switch (path) {
      case `${apiRoot}/pages`:
      case `${apiRoot}/posts`:
        options.data.type = resource.slice(0, -1);

        if (method === 'GET') {
          res = Actions.fetchPosts(options.data);
        }
        break;
      case `${apiRoot}/pages/${resoureceId}`:
      case `${apiRoot}/pages/${resoureceId}/autosaves`:
      case `${apiRoot}/posts/${resoureceId}`:
      case `${apiRoot}/posts/${resoureceId}/autosaves`:
        options.data.type = resource.endsWith('s') ? resource.slice(0, -1) : resource;
        options.data.id = options.data.id ? options.data.id : resoureceId;
        singleResource = true;

        if (method === 'DELETE') {
          res = Actions.deletePost(resoureceId);
        }
        else if (method === 'POST' || method === 'PUT') {
          res = Actions.savePost(options.data);

          resetPath(`${options.data.type}s/${options.data.id}/edit`);
        }
        else if (method === 'GET') {
          res = Actions.fetchPost(resoureceId, options.data);
        }
        break;
      case `${apiRoot}/media/${resoureceId}`:
        singleResource = true;
        res = Actions.fetchMedia(resoureceId);
        break;
      case `${apiRoot}/media`:
        if (method === 'POST' || method === 'PUT') {
          singleResource = true;
          res = Actions.saveMedia(options.data);
        }
        else if (method === 'GET') {
          res = Actions.fetchMediaItems(options);
        }
        break;
      case `${apiRoot}/categories`:
        if (method === 'GET') {
          res = Actions.fetchCategories();
        }
        else if (method === 'POST' || method === 'PUT') {
          singleResource = true;
          res = Actions.saveCategory(options.data);
        }
        break;
      case `${apiRoot}/types/${resoureceId}`:
        if (method === 'GET') {
          singleResource = true;
          res = Actions.fetchType(resoureceId);
        }
        break;
      case `${apiRoot}/types`:
        if (method === 'GET') {
          singleResource = true;
          res = Actions.fetchTypes();
        }
        break;
      case '/':
        if (method === 'GET') {
          singleResource = true;
          res = Actions.fetchIndex();
        }
        break;
      case `${apiRoot}/taxonomies/${resoureceId}`:
        if (method === 'GET') {
          singleResource = true;
          res = Actions.fetchTaxonomy(resoureceId);
        }
        break;
      case `${apiRoot}/taxonomies`:
        if (method === 'GET') {
          singleResource = true;
          res = Actions.fetchTaxonomies();
        }
        break;
      case `${apiRoot}/users`:
        if (method === 'GET') {
          res = Actions.fetchAuthors();
        }
    }

    if (res) {
      // fake REST server only need expected data on response
      const data = {
        [ resource ]: singleResource ? [ res.payload ] : map(res.payload),
      };

      if (data) {
        // initialize fake REST server
        const restServer = new FakeRest.Server();
        restServer.init(data);

        // use sinon.js to monkey-patch XmlHttpRequest
        const server = sinon.fakeServer.create();
        server.respondWith(restServer.getHandler());

        // faking a request
        const url = singleResource ? `/${resource}/${res.payload.id}` : `/${resource}`;
        const xhr = new XMLHttpRequest();

        // always a GET (changes are already done)
        xhr.open('GET', url, false);
        xhr.responseType = 'json';
        xhr.send(null);

        // restore native XHR constructor
        server.restore();

        if (xhr.response.id === 0) {
          delete xhr.response.id;
        }

        // console.log('response', xhr.response);

        dfd.abort = () => {
          // console.log( 'abort' );
        };

        dfd.resolveWith({ }, [ xhr.response, xhr.status, xhr ]);
      }
    }
    else {
      dfd.resolveWith({ }, [ { }, 404, { } ]);
    }
  });
}

export default apiRequest;
