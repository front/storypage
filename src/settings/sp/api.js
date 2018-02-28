import _ from 'underscore';

// import { apiSettings } from './vars';
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

const api = new API;
api.models = models;
api.collections = collections;

api.getPostTypeModel = function( postType ) {
  // var route = '/' + apiSettings.versionString + this.postTypeRestBaseMapping[ postType ] + '/(?P<id>[\\d]+)';
  return _.find( api.models, function( model ) {
  	return true;
    // return model.prototype.route && route === model.prototype.route.index;
  } );
};

export default api;
