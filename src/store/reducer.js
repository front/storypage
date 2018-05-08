// External Dependencies
import { omit, findKey } from 'lodash';
import { combineReducers } from 'redux';

// Internal Dependencies
import { 
	FETCH_POSTS,
	FETCH_POST,
	DELETE_POST,
	FETCH_CATEGORIES,
	FETCH_TYPES,
	FETCH_TYPE,
} from './actions';

export function posts( state = { }, action ) {
	switch ( action.type ) {
		case FETCH_POSTS:
			return action.payload;

		case FETCH_POST:
			const post = action.payload;
			const pK = findKey( state, { 'id': parseInt( post.id ) } );

			if ( ! pK ) {
				return { ...state, [ Date.now() ]: post };
			}		

		case DELETE_POST:
			const postKey = findKey( state, { 'id': parseInt( action.payload.id ) } );
			return omit( state, postKey );

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

export function types( state = { }, action ) {
	switch ( action.type ) {
		case FETCH_TYPES:
			return action.payload;

		case FETCH_TYPE:
			const type = action.payload;
			return { ...state, [ type.id ]: type };

		default:
			return state;
	}
}

export default combineReducers( {
	posts,
	categories,
	types,
} );
