import jQuery from 'jquery';

import { savePage, deletePage, saveMedia, fetchArticles } from '../../store/actions';

function apiRequest( options ) {
	const pathArray = options.path.split( '/' );
	const resource = pathArray[ 3 ];
	const method = options.method;

	return jQuery.Deferred( dfd => {
		let res;

		// switch

		if ( resource === 'page' ) {
			res = method === 'DELETE' ? deletePage( pathArray[ 4 ] ) : savePage( options.data );
		} else if ( resource === 'media' ) {
			res = saveMedia( options );
		} else if ( resource === 'articles' ) {
			res = fetchArticles();
		}

		if ( res ) {
			dfd.resolve( res.payload );
		}
	} ).promise();
}

export default apiRequest;
