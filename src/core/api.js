function API() {
	/** @namespace wp.api.models */
	this.models = {};
	/** @namespace wp.api.collections */
	this.collections = {};
	/** @namespace wp.api.views */
	this.views = {};
}

const api = new API();

api.getPostTypeRoute = function( postType ) {
	return postType;
};

export default api;
