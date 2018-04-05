import { 
	orderBy,
	take,
	map,
	pick,
	fromPairs,
	includes,
} from 'lodash';

/**
 * Checks is order value is valid
 * @param  {string} order Should be 'asc' or 'desc'
 * 
 * @return {boolean} Valid?
 */
function isOrderValid( order ) {
	return includes( [ 'asc', 'desc' ], order );
}

export function bundling( bundle, options = {} ) {
	const { order } = options;
	const orderByField = options.orderBy;
	const perPage = parseInt( options.per_page );
	const _fields = options._fields && options._fields.split( ',' );

	// convert it to array
	bundle = map( bundle );

	if ( order && isOrderValid && orderByField ) {
		bundle = orderBy( bundle, [ orderByField ], [ order ] );
	}

	if ( perPage ) {
		bundle = take( bundle, perPage );
	}

	if ( _fields ) {
		bundle = map( bundle, item => {
			return pick( item, _fields );
		} );
	}

	// convert to object again
	bundle = fromPairs( bundle.map( item => [ item.id, item ] ) );

	return bundle;
}

