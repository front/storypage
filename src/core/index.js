import jQuery from 'jquery';

import {
	apiSettings,
	dateSettings,
	userSettings,
} from './settings';

import api from './api';
import apiRequest from './apiRequest';
import media from './media';
import utils from './utils';
import { addQueryArgs } from './url';

import { Component } from '../components/gutenberg/element'

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
	addQueryArgs,
}
