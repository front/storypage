import jQuery from 'jquery';

import { savePage, deletePage, saveMedia } from '../actions';

function apiRequest( options ) {
	const pathArray = options.path.split( '/' );
	const resource = pathArray[ 3 ];
	const method = options.method;

	return jQuery.Deferred( dfd => {
		let res;

		if ( resource === 'page' ) {
			res = method == 'DELETE' ? deletePage( pathArray[ 4 ] ) : savePage( options.data );
		} else if ( resource === 'media' ) {
			res = saveMedia( options );
		}

		if ( res ) {
			dfd.resolve( res.payload );
		}
	} ).promise();

 	// return jQuery.ajax(options);
}

export default apiRequest;
