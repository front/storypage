// External dependences
import _ from 'lodash';
import { combineReducers } from 'redux';

// Internal dependences
import { 
	FETCH_PAGES,
	FETCH_PAGE,
	DELETE_PAGE,
} from './actions';

export function pages( state = [], action ) {
	switch ( action.type ) {
		case FETCH_PAGES:
			return action.payload;

		case FETCH_PAGE:
			const page = action.payload;
			return { ...state, [ page.id ]: page };

		case DELETE_PAGE:
			return _.omit( state, action.payload );

		default:
			return state;
	}
}


export default combineReducers( {
	pages,
} );;
