/**
 * Appends arguments to the query string of the url
 *
 * @param  {string}	url   URL
 * @param  {Object}	args  Query Args
 *
 * @return {string}       Updated URL
 */
export function addQueryArgs( url, args ) {
	if ( args && args.preview ) {
		return url;
	}

	if ( args && args.post && args.action ) {
		const path = window.location.pathname.split( '/' );
		resetPath( path[ 1 ] );

		if ( path[ 2 ] === 'new' ) {
			return `${ args.post }/${ args.action }`;
		} 
		return `${ path[ 2 ] }/${ path[ 3 ] }`;
	}

	// reset path
	if ( args && args.trashed ) {
		resetPath( `${ args.post_type }s` );

		return 'new';
	}
}

/**
 * [resetPath description]
 * @param  {string} pathname [description]
 */
function resetPath( pathname ) {
	window.history.replaceState(
		{ },
		' ',
		`${ wpApiSettings.root }/${ pathname }/`,
	);
}
