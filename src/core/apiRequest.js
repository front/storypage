import jQuery from 'jquery';

import { savePage, deletePage, saveMedia } from '../actions';

function apiRequest(options) {
	// do something with options
	const resource = options.path.split('/')[3];
	const method = options.method;

	return jQuery.Deferred(dfd => {
		let res;

		if (resource === 'page') {
			res = method == 'DELETE' ? deletePage(options.id) : savePage(options.data);
		} else if (resource === 'media') {
			res = saveMedia(options);
		}
		

		if (res) {
			dfd.resolve(res.payload);
		}
	}).promise();
	
 	// return jQuery.ajax(options);
};

export default apiRequest;
