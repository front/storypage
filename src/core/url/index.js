/**
 * Appends arguments to the query string of the url
 *
 * @param  {string}	url   URL
 * @param  {Object}	args  Query Args
 *
 * @return {string}       Updated URL
 */
export function addQueryArgs( url, args ) {
	if ( args.preview ) {
		return url;
	}

	// reset path
	window.history.replaceState(
		{ },
		' ',
		`${ wpApiSettings.root }/pages/`
	);

	if ( args.post ) {
		return `${ args.post }/${ args.action }`;
	}

	return 'new';
}
