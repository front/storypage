// External Dependencies
import FakeRest from 'fakerest';
import sinon from 'sinon';
import jQuery from 'jquery';
import { map, merge } from 'lodash';
import { parse } from 'querystringify';

// Internal Dependencies
import * as Actions from '../../store/actions';

const apiRoot = '/wp/v2';

/**
 * Aqpi request
 *
 * @param  {Object} options Options to request
 * @return {Object}	Request result (promise)
 */
function apiRequest( options ) {
	let pathArray = options.path.split( '?' );

	const path = pathArray[ 0 ];
	const queryStringOptions = parse( pathArray[ 1 ] );

	pathArray = pathArray[ 0 ].split( '/' );

	const resource = pathArray[ 3 ];
	const resoureceId = pathArray[ 4 ];

	const method = options.method || 'GET';

	if ( queryStringOptions ) {
		options.data = merge( options.data, queryStringOptions );
	}	

	// console.log( 'apiRequest options', options, path );

	if ( path === '/oembed/1.0/proxy' ) {
		// https://twitter.com/mikescollins/status/1006351423796318209?s=19
		return jQuery.ajax( {
			url: `http://open.iframe.ly/api/oembed?url=${ options.data.url }&origin=qwerty`,
		} );
	}

	return jQuery.Deferred( dfd => {
		let res;
		let singleResource = false;

		// Call actions by invoked path  
		switch ( path ) {
			case `${ apiRoot }/pages`:
			case `${ apiRoot }/posts`:
				options.data.type = resource.slice( 0, -1 );

				if ( method === 'GET' ) {
					if ( resoureceId ) {
						singleResource = true;
						res = Actions.fetchPost( resoureceId, options.data );
					} else {
						res = Actions.fetchPosts( options.data );
					}
				}
				break;
			case `${ apiRoot }/page/${ resoureceId }`:
			case `${ apiRoot }/pages/${ resoureceId }`:
			case `${ apiRoot }/page/${ resoureceId }/autosaves`:
			case `${ apiRoot }/post/${ resoureceId }`:
			case `${ apiRoot }/posts/${ resoureceId }`:
			case `${ apiRoot }/post/${ resoureceId }/autosaves`:
				options.data.type = resource;
				options.data.id = options.data.id ? options.data.id : resoureceId;
				singleResource = true;

				if ( method === 'DELETE' ) {
					res = Actions.deletePost( resoureceId );
				} else {
					res = Actions.savePost( options.data );
				}				
				break;
			case `${ apiRoot }/media/${ resoureceId }`:
				singleResource = true;
					
				res = Actions.fetchMedia( resoureceId );
				break;
			case `${ apiRoot }/media`:
				singleResource = true;
			
				res = Actions.saveMedia( options );
				break;
			case `${ apiRoot }/categories`:
				res = Actions.fetchCategories();
				break;
			case `${ apiRoot }/types/${ resoureceId }`:
				singleResource = true;
				res = Actions.fetchType( resoureceId );
				break;
			case `${ apiRoot }/types`:
				singleResource = true;
				res = Actions.fetchTypes( );
				break;
			// case `${ apiRoot }/users/`:
			// 	// TODO
			// 	break;
			/*case '/oembed/1.0/proxy':
				singleResource = true;
				// console.log( 'queryStringOptions', queryStringOptions );
				res = { 
					payload: {
						id: 12,
						author_name: "Mike Scollins",
						author_url: "https://twitter.com/mikescollins",
						cache_age: "3153600000",
						height: null,
						html: '<blockquote class="twitter-tweet" data-width="525" data-dnt="true"><p lang="en" dir="ltr">When you&#39;re almost done picking teams in gym class. <a href="https://t.co/HjblABuKsm">pic.twitter.com/HjblABuKsm</a></p>&mdash; Mike Scollins (@mikescollins) <a href="https://twitter.com/mikescollins/status/1006351423796318209?ref_src=twsrc%5Etfw">June 12, 2018</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
						provider_name: "Twitter",
						provider_url: "https://twitter.com",
						type: "rich",
						url: "https://twitter.com/mikescollins/status/1006351423796318209",
						version: "1.0",
						width: 550,
					},
				};
				break*/
			case '/':
				singleResource = true;
				res = Actions.fetchIndex();
				break;
		}

		if ( res ) {
			// fake REST server only need expected data on response
			const data = {
				[ resource ]: singleResource ? [ res.payload ] : map( res.payload ),
			};

			// initialize fake REST server
			const restServer = new FakeRest.Server();
			restServer.init( data );

			// use sinon.js to monkey-patch XmlHttpRequest
			const server = sinon.fakeServer.create();
			server.respondWith( restServer.getHandler() );

			// console.log( 'resource', resource);
			// console.log( 'res.payload.id', res.payload.id);

			// faking a request				
			const url = singleResource ? `/${ resource }/${ res.payload.id }` : `/${ resource }`;
			const xhr = new XMLHttpRequest();

			// always a GET (changes are already done)
			xhr.open( 'GET', url, false );
			xhr.responseType = 'json';
			xhr.send( null );

			// restore native XHR constructor
			server.restore();

			if ( xhr.response.id === 0 ) {
				delete xhr.response.id;
			}

			// console.log( 'response', xhr.response );

			dfd.abort = () => {
				// console.log( 'abort' );
			};

			dfd.resolveWith( { }, [ xhr.response, xhr.status, xhr ] );
		} else {
			dfd.resolveWith( { }, [ { }, 404, { } ] );
		}
	} );
}

export default apiRequest;
