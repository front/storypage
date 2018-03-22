import React from 'react';
import jQuery from 'jquery';

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
