// External Dependencies
import { times, map, fromPairs, random } from 'lodash';

/**
 * [generatePosts description]
 * @param  {[type]} n       [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
export function generatePosts( n = 1, options = {} ) {
	const { N_IMAGES = 1, N_CATEGORIES = 1 } = options;

	return times( n, ( index ) => {
		const id = index + 1;
		const date = ( new Date( `2018-04-${ id }` ) ).toISOString();
		return {
			id,
			title: { raw: `Generated post number ${ id }`, rendered: `Generated post number ${ id  }`},
			content: { raw: '', rendered: '' },
			type: 'post',
			date_gmt: date,
			date,
			categories: [ random(1, N_CATEGORIES) ],
			featured_media: random(1, N_IMAGES),
		}
	} );
}

/**
 * [generateImages description]
 * @param  {Number} n [description]
 * @return {[type]}   [description]
 */
export function generateImages( n = 1 ) {
	return times( n, ( index ) => {
		const id = index + 1;
		const date = ( new Date( `2018-04-${ id }` ) ).toISOString();

		return {
			id,
			date_gmt: date,
			date,
			link: `http://localhost:3000/sample${ id }.jpg`,
			media_type: 'image',
			source_url: `http://localhost:3000/sample${ id }.jpg`,
		}
	} );

	return makePairs( images );
}

/**
 * [generateCategories description]
 * @param  {Number} n [description]
 * @return {[type]}   [description]
 */
export function generateCategories( n = 1 ) {
	return times( n, ( index ) => {
		const id = index + 1;
		// count, description, id, link, meta, name, parent, slug, taxonomy
		return {
			id,
			name: `Category ${ id }`,
			parent: 0,
		}
	} );
}
