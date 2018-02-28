import Backbone from 'backbone';
import _ from 'underscore';

import { apiSettings } from './settings';

const models = {};
const baseModel = Backbone.Model.extend();
const modelNames = [ 'Post', 'Media' ];

_.each(modelNames, function(modelName) {
	models[modelName] = baseModel.extend( {
		url: function() {
			return apiSettings.root;
		},
	});
});

export default models;
