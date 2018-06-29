// External Dependencies
import { orderBy, take, map, pick, includes } from 'lodash';

/**
 * Checks is order value is valid
 * @param  {string} order Should be 'asc' or 'desc'
 * 
 * @return {boolean} Valid?
 */
function isOrderValid( order ) {
	return includes( [ 'asc', 'desc' ], order );
}

/**
 * Handling with common options: order, orderBy, per_page, _fields
 * @param  {[type]} collection  [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
export function bundling( collection, options = {} ) {
	const { order } = options;
	const orderByField = options.orderby;
	const perPage = parseInt( options.per_page );
	const _fields = options._fields && options._fields.split( ',' );

	if ( order && isOrderValid( order ) && orderByField ) {
		collection = orderBy( collection, [ orderByField ], [ order ] );
	}

	if ( perPage ) {
		collection = take( collection, perPage );
	}

	if ( _fields ) {
		collection = map( collection, item => {
			return pick( item, _fields );
		} );
	}

	return collection;
}
