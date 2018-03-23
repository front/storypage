import React from 'react';
import jQuery from 'jquery';
import { __ } from '@wordpress/i18n';

import {
	dateSettings,
	userSettings,
	editorL10n,
} from './settings';

import api from './api';
import apiRequest from './apiRequest';
import media from './media';
import utils from './utils';

const wp = {
	api,
	apiRequest,
	media,
	element: React,
	utils,
	oldEditor: { 
		initialize: function(options) {
			console.log('oldEditor initialize', options);
		},
		remove: function(options) {
			console.log('oldEditor remove', options);
		}
	}
};

window.wp = wp;
window._wpDateSettings = dateSettings;
window.userSettings = userSettings;
window.jQuery = jQuery;
window.wpEditorL10n = editorL10n;

window.wpApiSettings = {
	root: "http://localhost:3000/",
	nonce: '123456789',
	versionString: '',
	cacheSchema: true,
	schema: {}
};

window.customGutenberg = {
	categories: [ 
		{ slug: 'rows', title: __( 'Rows Blocks')  },
		{ slug: 'common', title: __( 'Common Blocks')  },
		{ slug: 'formatting', title: __( 'Formatting')  },
		{ slug: 'layout', title: __( 'Layout Elements')  },
		{ slug: 'widgets', title: __( 'Widgets')  },
		{ slug: 'embed', title: __( 'Embeds')  },
		{ slug: 'shared', title: __( 'Shared Blocks' ) }, 
	]
};