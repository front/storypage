import jQuery from 'jquery';

import {
	savePage,
	deletePage,
	saveMedia,
	fetchArticles,
	fetchCategories,
} from '../../store/actions';

function apiRequest( options ) {
	const pathArray = options.path.split( '/' );
	const resource = pathArray[ 3 ];
	const method = options.method;

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
			case 'articles':
				res = fetchArticles();
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
