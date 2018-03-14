import Backbone from 'backbone';
import _ from 'lodash';

import { apiSettings } from './settings';

const collections = {};
const baseCollection = Backbone.Collection.extend();
const collectionNames = [ 'Users' ];

_.each(collectionNames, function(collectionName) {
	collections[collectionName] = baseCollection.extend( {
		url: function() {
			return apiSettings.root;
		},
	});
});

export default collections;
