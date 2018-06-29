// Internal Dependencies
import apiRequest from './api-request';
import { addQueryArgs } from './url';

window.wp = {
	apiRequest, 
	url: { addQueryArgs },
};

window.userSettings = {
	uid: 2,
};

// customize Gutenberg
window.customGutenberg = {
	events: {
		// 'OPEN_GENERAL_SIDEBAR': function( action, store ) {
		// 	console.log( 'OPEN_GENERAL_SIDEBAR', action, store );
		// },
		// 'CLOSE_GENERAL_SIDEBAR': function( action, store ) {
		// 	console.log( 'CLOSE_GENERAL_SIDEBAR', action, store );
		// },
		// 'REMOVE_BLOCKS': function( action, store ) {
		// 	console.log( 'REMOVE_BLOCKS', action, store );
		// },
	},
};
