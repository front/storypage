import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
	case FETCH_POSTS:
		return action.payload;
	case FETCH_POST:
		const post = action.payload;

		return { ...state, [post.id]: post };
	case DELETE_POST:
		return _.omit(state, action.payload);
	default:
		return state;
	}
}
