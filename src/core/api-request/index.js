// External dependences
import FakeRest from 'fakerest';
import sinon from 'sinon';
import jQuery from 'jquery';
import { map } from 'lodash';

// Internal dependences
import {
	savePage,
	deletePage,
	saveMedia,
	fetchArticles,
	fetchCategories,
	fetchArticle,
} from '../../store/actions';

/**
 * Aqpi request
 *
 * @param  {Object} options Options to request
 * @return {Object}	Request result (promise)
 */
function apiRequest( options ) {
	const pathArray = options.path.split( '/' );
	const resource = pathArray[ 3 ].split( '?' )[ 0 ];
	const method = options.method || 'GET';

	// console.log('resource', resource);
	// console.log('options', options);

	return jQuery.Deferred( dfd => {
		let res;
		let singleResource = false;

		// Call actions by invoked resource  
		switch ( resource ) {
			case 'page':
				if ( method === 'DELETE' ) {
					singleResource = true;
					res = deletePage( pathArray[ 4 ] );
				} else {
					singleResource = true;
					res = savePage( options.data );
				}				
				break;
			case 'media':
				singleResource = true;
				res = saveMedia( options );
				break;
			case 'posts':
			case 'articles':
				if ( pathArray[ 4 ] ) {
					singleResource = true;
					res = fetchArticle( pathArray[ 4 ] );
				} else {
					res = fetchArticles( options.data );
				}
				break;
			case 'categories':
				res = fetchCategories();
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

			dfd.resolveWith( { }, [ xhr.response, xhr.status, xhr ] );
		} else {
			dfd.resolveWith( { }, [ { }, 404, { } ] );
		}
	} );
}

export default apiRequest;
