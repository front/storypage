import _ from 'lodash';

import { FETCH_PAGES, FETCH_PAGE, DELETE_PAGE } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
	case FETCH_PAGES:
		return action.payload;
	case FETCH_PAGE:
		const page = action.payload;

		return { ...state, [page.id]: page };
	case DELETE_PAGE:
		return _.omit(state, action.payload);
	default:
		return state;
	}
}
