import { combineReducers } from 'redux';
import PagesReducer from './reducer_pages';

const rootReducer = combineReducers( {
	pages: PagesReducer,
} );

export default rootReducer;
