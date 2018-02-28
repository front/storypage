import jQuery from 'jquery';

import {
	apiSettings,
	dateSettings,
	userSettings,
} from './sp/settings';

import api from './sp/api';
import apiRequest from './sp/apiRequest';
import media from './sp/media';
import utils from './sp/utils';

import { Component } from '../gutenberg/build/element'

const wp = {
	api,
	apiRequest,
	media,
	element: { Component },
	utils
};

window.wp = wp;
window._wpDateSettings = dateSettings;
window.userSettings = userSettings;
window.jQuery = jQuery;

export {
	apiSettings as wpApiSettings,
	userSettings,
	dateSettings as _wpDateSettings,
	wp,
	jQuery,
}
