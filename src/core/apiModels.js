import Backbone from 'backbone';
import { get } from 'lodash';
import _ from 'lodash';
import jQuery from 'jquery';

import { apiSettings } from './settings';
import { savePost } from '../actions';

// const trashableTypes = [ /*'Comment', 'Media', 'Comment', */'Post'/*, 'Page', 'Status', 'Taxonomy', 'Type' */];

const models = {};
const baseModel = Backbone.Model.extend(
	{
		save: function( attrs, options ) {
			return jQuery.Deferred(dfd => {
				const post = this.attributes;
				const res = savePost(post);

				if (res) {
					dfd.resolve(res.payload);
				}
			}).promise();
		},
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
