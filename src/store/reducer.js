// External Dependencies
import { omit } from 'lodash';
import { combineReducers } from 'redux';

// Internal Dependencies
import { 
	FETCH_PAGES,
	FETCH_PAGE,
	DELETE_PAGE,
	FETCH_ARTICLES,
	FETCH_CATEGORIES,
} from './actions';

export function pages( state = { }, action ) {
	switch ( action.type ) {
		case FETCH_PAGES:
			return action.payload;

		case FETCH_PAGE:
			const page = action.payload;
			return { ...state, [ page.id ]: page };

		case DELETE_PAGE:
			return omit( state, action.payload.id );

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

export function categories( state = { }, action ) {
	switch ( action.type ) {
		case FETCH_CATEGORIES:
			return action.payload;

		default:
			return state;
	}
}

export default combineReducers( {
	pages,
	articles,
	categories,
} );
