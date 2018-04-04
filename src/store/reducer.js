// External Dependencies
import _ from 'lodash';
import { combineReducers } from 'redux';

// Internal Dependencies
import { 
	FETCH_PAGES,
	FETCH_PAGE,
	DELETE_PAGE,
	FETCH_ARTICLES,
} from './actions';

export function pages( state = { }, action ) {
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

export function articles( state = { }, action ) {
	switch ( action.type ) {
		case FETCH_ARTICLES:
			return action.payload;

		default:
			return state;
	}
}

export default combineReducers( {
	pages,
	articles,
} );
