/**
 * Appends post id the url
 *
 * @param  {String} url   URL
 * @param  {Object} args  Query Args
 *
 * @return {String}       Updated URL
 */
export function addQueryArgs( url, args ) {
	// reset path
	window.history.replaceState(
		{ },
		' ',
		`${window.location.origin}/posts/`
	); 
	
	return args.post ? `${args.post}/edit` : 'new';
}
