/**
 * Returns the state of page.
 *
 * @param   {Object} state 	Global application state.
 * @param   {number} id 	Page id.
 * @return  {Object}       	State of page.
 */
export function getPage( state, id ) {
	return state.pages[ id ];
}
