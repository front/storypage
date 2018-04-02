// External dependences
import jQuery from 'jquery';

// Internal dependences
import {
	savePage,
	deletePage,
	saveMedia,
	fetchArticles,
	fetchCategories,
} from '../../store/actions';

/**
 * @param  {Object}
 * @return {[type]}
 */
function apiRequest( options ) {
	const pathArray = options.path.split( '/' );
	const resource = pathArray[ 3 ].split( '?' )[0];
	const method = options.method;

	console.log('resource', resource);
	console.log('options', options);

	return jQuery.Deferred( dfd => {
		let res;

		// Call actions by invoked resource  
		switch ( resource ) {
			case 'page':
				res = method === 'DELETE' ? deletePage( pathArray[ 4 ] ) : savePage( options.data );
				break;
			case 'media':
				res = saveMedia( options );
				break;
			case 'posts':
			case 'articles':
				res = fetchArticles( options.data );
				break;
			case 'categories':
				res = fetchCategories();
				break;
		}

		if ( res ) {
			dfd.resolve( res.payload );
		}
	} ).promise();
}

export default apiRequest;
