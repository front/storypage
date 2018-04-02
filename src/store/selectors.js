/**
 * Returns the state of page.
 *
 * @param   {Object} state Global application state.
 * @return  {Object}       State of page.
 */
export function getPage( state, id ) {
	return state.pages[ id ];
}
