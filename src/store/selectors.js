// External Dependencies
import { findKey } from 'lodash';

/**
 * Returns the state of post.
 *
 * @param   {Object} state 	Global application state.
 * @param   {number} id 	Post id.
 * @return  {Object}       	State of post.
 */
export function getPost (state, id) {
  const postKey = findKey(state.posts, { id: parseInt(id) });
  return state.posts[ postKey ];
}

/**
 * Returns the state of types.
 *
 * @param   {Object} state 	Global application state.
 * @return  {Object}       	State of types.
 */
export function getTypes (state) {
  return state.types;
}

/**
 * Returns the state of posts.
 *
 * @param   {Object} state 	Global application state.
 * @return  {Object}       	State of posts.
 */
export function getPosts (state) {
  return state.posts;
}
