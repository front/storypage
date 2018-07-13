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
  // FETCH_INDEX,
  SAVE_POST,
} from './actions';

// export function index( state = {}, action ) {
// 	// console.log( action.type );

// 	switch ( action.type ) {
// 		case FETCH_INDEX:
// 		// console.log( action.payload );
// 			return action.payload;
// 		default:
// 			return state;
// 	}
// }

export function posts (state = { }, action) {
  let postKey, post, pK;
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;

    case FETCH_POST:
      post = action.payload;
      if (post) {
        pK = findKey(state, { id: parseInt(post.id) });
        if (! pK) {
          return { ...state, [ Date.now() ]: post };
        }
      }
      return state;

    case DELETE_POST:
      postKey = findKey(state, { id: parseInt(action.payload.id) });
      return omit(state, postKey);

    case SAVE_POST:
      postKey = findKey(state, { id: parseInt(action.payload.id) });

      return {
        ...state,
        [ postKey ]: action.payload,
      };

    default:
      return state;
  }
}

export function categories (state = { }, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
}

export function types (state = { }, action) {
  let type;
  switch (action.type) {
    case FETCH_TYPES:
      return action.payload;

    case FETCH_TYPE:
      type = action.payload;
      return { ...state, [ type.id ]: type };

    default:
      return state;
  }
}

export default combineReducers({
  // index,
  posts,
  categories,
  types,
});
