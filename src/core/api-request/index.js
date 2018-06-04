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

	console.log( 'apiRequest options', options, path );

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
			case `${ apiRoot }/page/${ resoureceId }/autosaves`:
			case `${ apiRoot }/post/${ resoureceId }`:
			case `${ apiRoot }/post/${ resoureceId }/autosaves`:
				options.data.type = resource;
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
			// case `${ apiRoot }/users/`:
			// 	// TODO
			// 	break;
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

			// faking a request				
			const url = singleResource ? `/${ resource }/${ res.payload.id }` : `/${ resource }`;
			const xhr = new XMLHttpRequest();

			// always a GET (changes are already done)
			xhr.open( 'GET', url, false );
			xhr.responseType = 'json';
			xhr.send( null );

			// restore native XHR constructor
			server.restore();

			console.log( 'response', xhr.response );

			dfd.abort = () => {
				console.log( 'abort' );
			};

			dfd.resolveWith( { }, [ xhr.response, xhr.status, xhr ] );
		} else {
			dfd.resolveWith( { }, [ { }, 404, { } ] );
		}
	} );
}

export default apiRequest;
