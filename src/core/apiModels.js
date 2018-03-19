import Backbone from 'backbone';
import { get } from 'lodash';
import _ from 'lodash';
import jQuery from 'jquery';

import { apiSettings } from './settings';
import { savePost, deletePost } from '../actions';

// const trashableTypes = [ /*'Comment', 'Media', 'Comment', */'Post'/*, 'Page', 'Status', 'Taxonomy', 'Type' */];

const models = {};
const baseModel = Backbone.Model.extend(
	{
		// sync: function( method, model, options ) {
		// 	var beforeSend;

		// 	options = options || {};

		// 	// Remove date_gmt if null.
		// 	if ( _.isNull( model.get( 'date_gmt' ) ) ) {
		// 		model.unset( 'date_gmt' );
		// 	}

		// 	// Remove slug if empty.
		// 	if ( _.isEmpty( model.get( 'slug' ) ) ) {
		// 		model.unset( 'slug' );
		// 	}

		// 	if ( _.isFunction( model.nonce ) && ! _.isUndefined( model.nonce() ) && ! _.isNull( model.nonce() ) ) {
		// 		beforeSend = options.beforeSend;

		// 		// @todo enable option for jsonp endpoints
		// 		// options.dataType = 'jsonp';

		// 		// Include the nonce with requests.
		// 		options.beforeSend = function( xhr ) {
		// 			xhr.setRequestHeader( 'X-WP-Nonce', model.nonce() );

		// 			if ( beforeSend ) {
		// 				return beforeSend.apply( this, arguments );
		// 			}
		// 		};

		// 		// Update the nonce when a new nonce is returned with the response.
		// 		options.complete = function( xhr ) {
		// 			var returnedNonce = xhr.getResponseHeader( 'X-WP-Nonce' );

		// 			if ( returnedNonce && _.isFunction( model.nonce ) && model.nonce() !== returnedNonce ) {
		// 				model.endpointModel.set( 'nonce', returnedNonce );
		// 			}
		// 		};
		// 	}

		// 	// Add '?force=true' to use delete method when required.
		// 	if ( this.requireForceForDelete && 'delete' === method ) {
		// 		model.url = model.url() + '?force=true';
		// 	}
		// 	return Backbone.sync( method, model, options );
		// },

		save: function( attrs, options ) {
			return jQuery.Deferred(dfd => {
				const post = this.attributes;
				const res = savePost(post);

				if (res) {
					dfd.resolve(res.payload);
				}
			}).promise();
		},
		destroy: function( options ) {
			return jQuery.Deferred(dfd => {
				const res = deletePost(this.id);

				if (res) {
					dfd.resolve();
				}
			}).promise();
		}
	}
);

_.each(apiSettings.mapping.models, function(modelName) {
	models[modelName] = baseModel.extend( {
		// url: function() {
		// 	// CHECK THIS!
		// 	return `${apiSettings.root}${modelName.toLowerCase()}s`;
		// },
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
