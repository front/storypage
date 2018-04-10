// External Dependencies
import React from 'react';
import jQuery from 'jquery';
import { __ } from '@wordpress/i18n';

// Internal Dependencies
import {
	dateSettings,
	userSettings,
	editorL10n,
} from './settings';
import api from './api';
import apiRequest from './api-request';
import utils from './utils';

const wp = {
	api,
	apiRequest,
	element: React,
	utils,
	// oldEditor: {
	// 	initialize: function( options ) {
	// 		console.log( 'oldEditor initialize', options );
	// 	},
	// 	remove: function( options ) {
	// 		console.log( 'oldEditor remove', options );
	// 	},
	// },
};

window.wp = wp;
window._wpDateSettings = dateSettings;
window.userSettings = userSettings;
window.jQuery = jQuery;
window.wpEditorL10n = editorL10n;

window.wpApiSettings = {
	root: window.location.origin,
	nonce: '123456789',
	// versionString: '',
	// cacheSchema: true,
	schema: {
		routes: {
			"\/wp\/v2\/categories": {
				methods: [ 'GET' ],
			},
			"\/wp\/v2\/posts": {
				methods: [ 'GET' ],
			},
			"\/wp\/v2\/articles\/(?P<id>[\\d]+)": {
				methods: [ 'GET' ],
			},
			"\/wp\/v2\/articles": {
				methods: [ 'GET' ],
			},
		},
	},
};

window.customGutenberg = {
	categories: [
		{ slug: 'rows', title: __( 'Rows Blocks' ) },
		{ slug: 'common', title: __( 'Common Blocks' ) },
		{ slug: 'formatting', title: __( 'Formatting' ) },
		{ slug: 'layout', title: __( 'Layout Elements' ) },
		{ slug: 'widgets', title: __( 'Widgets' ) },
		{ slug: 'embed', title: __( 'Embeds' ) },
		{ slug: 'shared', title: __( 'Shared Blocks' ) },
	],
	rows: [
		{ cols: [ 6, 6 ], title: 'col6 x 2', description: __( '2 eq columns layout' ) },
		{ cols: [ 4, 4, 4 ], title: 'col4 x 3', description: __( '3 eq columns layout' ) },
		{ cols: [ 7, 5 ], title: 'col7-col5', description: __( 'A col7 and a col5' ) },
		{ cols: [ 5, 7 ], title: 'col5-col7', description: __( 'A col5 and a col7' ) },
		{ cols: [ 1, 10, 1 ], title: 'col1-col10-col1', description: __( 'A col1, a col10 and a col1' ) },
		{ cols: [ 2, 8, 2 ], title: 'col2-col8-col2', description: __( 'A col2, a col8 and a col2' ) },
	],
	tabs: [
		{
			options: {
				name: 'rows',
				title: __( 'Rows' ),
				className: 'editor-inserter__tab',
			},
			tabScrollTop: 0,
			getItemsForTab() {
				return ( item ) => item.category === 'rows';
			},
		},
		{
			options: {
				name: 'blocks',
				title: __( 'Blocks' ),
				className: 'editor-inserter__tab',
			},
			tabScrollTop: 0,
			getItemsForTab() {
				return ( item ) => item.category !== 'embed' && item.category !== 'shared' && item.category !== 'rows';
			},
		},
	],
	panel: [ 'post-status', 'articles-panel', 'settings-panel', 'last-revision' ],
	editor: {
		hideTitle: true,
		noMediaLibrary: true,
	},
};
