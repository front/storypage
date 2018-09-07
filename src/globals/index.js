// Internal Dependencies
import apiFetch from './api-fetch';
import { addQueryArgs } from './url';

window.wp = {
  apiFetch,
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
