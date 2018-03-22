import _ from 'lodash';

// import { apiSettings } from './settings';
import collections from './apiCollections';
import models from './apiModels';

function API() {
	/** @namespace wp.api.models */
	this.models = {};
	/** @namespace wp.api.collections */
	this.collections = {};
	/** @namespace wp.api.views */
	this.views = {};
}

const api = new API();
// api.models = models;
// api.collections = collections;

// api.postTypeRestBaseMapping = {"post":"posts" /*,"page":"pages","attachment":"media","revision":"revision","nav_menu_item":"nav_menu_item","custom_css":"custom_css","customize_changeset":"customize_changeset","oembed_cache":"oembed_cache","wp_block":"blocks"*/};

api.getPostTypeModel = function( postType ) {
  // var route = '/' + apiSettings.versionString + this.postTypeRestBaseMapping[ postType ] + '/(?P<id>[\\d]+)';

  return _.find( api.models, function( model ) {
  	return true;
    // return model.prototype.route && route === model.prototype.route.index;
  } );
};

api.getPostTypeRoute = function( postType ) {
	return postType;
}

export default api;
