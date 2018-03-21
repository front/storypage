import Backbone from 'backbone';
import { get } from 'lodash';
import _ from 'lodash';
import jQuery from 'jquery';

import { apiSettings } from './settings';
import { savePage, deletePage, saveMedia } from '../actions';

const models = {};
const baseModel = Backbone.Model.extend(
	{
		save: function( attrs, options ) {
			if (!attrs && !options) {
				// save page
				return jQuery.Deferred(dfd => {
					const res = savePage(this.attributes);

					if (res) {
						dfd.resolve(res.payload);
					}
				}).promise();
			} else {
				// save media
				return jQuery.Deferred(dfd => {
					const res = saveMedia(options);

					if (res) {
						dfd.resolve(res.payload);
					}
				}).promise();

				// Proxy the call to the original save function.
				// return Backbone.Model.prototype.save.call( this, attrs, options );
			}

			
		},
		destroy: function( options ) {
			return jQuery.Deferred(dfd => {
				const res = deletePage(this.id);

				if (res) {
					dfd.resolve();
				}
			}).promise();
		}
	}
);

_.each(apiSettings.mapping.models, function(modelName) {
	models[modelName] = baseModel.extend( {
		url: function() {
		// 	// CHECK THIS!
			return `${apiSettings.root}${modelName.toLowerCase()}s`;
		},
		// Function that returns a constructed url based on the id.
		// url: function() {
		// 	var url = routeModel.get( 'apiRoot' ) +
		// 		routeModel.get( 'versionString' ) +
		// 		( ( 'me' === routeName ) ? 'users/me' : routeName );

		// 	if ( ! _.isUndefined( this.get( 'id' ) ) ) {
		// 		url +=  '/' + this.get( 'id' );
		// 	}
		// 	return url;
		// },

		// Track nonces at the Endpoint level.
		// nonce: function() {
		// 	return routeModel.get( 'nonce' );
		// },

		// endpointModel: routeModel,

		// Include a reference to the original route object.
		// route: modelRoute,

		// Include a reference to the original class name.
		// name: modelClassName,

		// Include the array of route methods for easy reference.
		// methods: modelRoute.route.methods,

		// Include the array of route endpoints for easy reference.
		// endpoints: modelRoute.route.endpoints
	});
});

export default models;
