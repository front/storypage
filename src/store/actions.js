// External Dependencies
import { filter, times, random, fromPairs, map, find, findKey, omit, includes, has } from 'lodash';

// Internal Dependencies
import { generatePosts, generateImages, generateCategories } from './generators';
import { bundling } from './query-helpers';

// Actions types
export const FETCH_INDEX = 'fetch_index';

export const FETCH_POSTS = 'fetch_posts';
export const SAVE_POST = 'save_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

export const SAVE_MEDIA = 'save_media';
export const FETCH_MEDIA = 'fetch_media';

export const FETCH_CATEGORIES = 'fetch_categories';

export const FETCH_TYPES = 'fetch_types';
export const FETCH_TYPE = 'fetch_type';

// Module constants
const LOCAL_STORAGE_KEY = 'storypage';
const LOCAL_INDEX = 'index';
const LOCAL_MEDIA = 'media';
const LOCAL_LIBRARY = 'library';
const LOCAL_CATEGORIES = 'categories';
const LOCAL_TYPES = 'types';

const N_IMAGES = 4;
const N_CATEGORIES = 4;
const N_POSTS = 6;

const storage = {
	[ LOCAL_MEDIA ]: generateImages( N_IMAGES ),
	[ LOCAL_LIBRARY ]: generatePosts( N_POSTS, { N_IMAGES, N_CATEGORIES } ),
	[ LOCAL_CATEGORIES ]: generateCategories( N_CATEGORIES ),
	[ LOCAL_TYPES ]: [
		// capabilities, description, hierarchical, labels, name, rest_base, slug, supports, taxonomies, viewable
		{
			id: 1,
			name: 'Pages', rest_base: 'pages', slug: 'page',
			labels: { posts: 'Stories' },
			supports: {
				posts: true, // *
				author: true,
				comments: false, // hide discussion-panel
				'custom-fields': true,
				editor: true,
				'media-library': false, // *
				'page-attributes': false, // hide page-attributes panel
				revisions: true,
				'template-settings': true, // *
				thumbnail: false, // hide featured-image panel
				title: false, // hide title on editor
			},
			viewable: true,
		},
		{
			id: 2,
			name: 'Post', rest_base: 'posts', slug: 'post',
			supports: {
				posts: false, // *
				author: true,
				comments: false, // hide discussion-panel
				'custom-fields': true,
				editor: true,
				'media-library': false, // *
				'page-attributes': false, // hide page-attributes panel
				revisions: true,
				'template-settings': false, // *
				thumbnail: true, // featured-image panel
				title: true, // show title on editor
			},
			viewable: true,
		},
	],
	[ LOCAL_INDEX ]: {
		theme_supports: {
			formats: [ 'standard', 'aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio' ],
			'post-thumbnails': true,
		},
	}
};

/**
 * Returns app resources storaged on local storage by key
 * 
 * @param  {string}	key	Local Storage key (see LOCAL_ constants)
 * 
 * @return {Array}	Resources array
 */
function getFromLocalStorage( key = null ) {
	const data = localStorage.getItem( LOCAL_STORAGE_KEY );

	if ( data ) {
		const resources = JSON.parse( data );

		if ( key ) {
			if ( ! resources[ key ] ) {
				resources[ key ] = storage[ key ];
				localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( resources ) );
			}

			return resources[ key ];
		}
		return resources;
	}

	// create for the first time
	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return key ? storage[ key ] : storage;
}

export function fetchIndex() {
	const index = getFromLocalStorage( LOCAL_INDEX );;

	return {
		type: FETCH_INDEX,
		payload: index,
	};
}

/**
 * Get all posts
 * 
 * @param  {Object}	options			Query options
 * @return {Object}	Action type and array of posts
 */
export function fetchPosts( options = { } ) {
	let posts = getFromLocalStorage( LOCAL_LIBRARY );

	const { type, s } = options;
	const categoryId = parseInt( options.category_id );

	if ( type ) {
		posts = filter( posts, { type } );
	}

	if ( categoryId ) {
		posts = filter( posts, post => {
			return includes( post.categories, categoryId);
		} );
	} 

	if ( s ) {
		posts = filter( posts, post => {
			const term = s.toLowerCase();
			const title = post.title.rendered.toLowerCase();

			return title.indexOf( term ) !== -1;
		} );
	}

	posts = bundling( posts , options );

	return {
		type: FETCH_POSTS,
		payload: posts,
	};
}

/**
 * Create or update a post
 *
 * @param  {Object}	post			Post data
 * @param  {number}	post.id			(Optional) Post id
 * @param  {string}	post.title		(Optional) Post title
 * @param  {string}	post.content	(Optional) Post content
 * 
 * @return {Object}	Action type and post
 */
export function savePost( post_data ) {
	const { 
		title,
		content,
		type,
		sttaus,
	} = post_data;	

	let { id } = post_data;

	const storage = getFromLocalStorage();
	const date = ( new Date() ).toISOString();

	if ( ! id ) {
		// create a new post
		id = Date.now();		

		storage[ LOCAL_LIBRARY ].push( {
			id,
			date,
			date_gmt: date,
			title: { 
				raw: title || `${ type } ${ id }`,
				rendered: title || `${ type } ${ id }`,
			},
			content: { 
				raw: content || '',
				rendered: content || '',
			},
			status,
			type,
			link: `${ window.location.origin }/${ type }s/${ id }`,
		} );
	} else { 
		// update an old post
		const post = find( storage[ LOCAL_LIBRARY ], { 'id': parseInt( id ) } );
		const postKey = findKey( storage[ LOCAL_LIBRARY ], { 'id': parseInt( id ) } );

		if ( title ) {
			post.title = {
				raw: title,
				rendered: title,
			};
		}

		if ( has( post, 'content' ) ) {
			post.content = {
				raw: content,
				rendered: content,
			};
		}


		if ( has( post, 'status' ) ) {
			post.status = status;
		}

		post.modified = date;
		post.modified_gmt = date;

		storage[ LOCAL_LIBRARY ][ postKey ] = post;

		// TODO: create a revision
	}

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: SAVE_POST,
		payload: find( storage[ LOCAL_LIBRARY ], { 'id': parseInt( id ) } ),
	};
}

/**
 * Get a post
 *
 * @param  {number}	id	Post id
 * 
 * @return {Object}	Action type and post
 */
export function fetchPost( id, options = {} ) {
	const storage = getFromLocalStorage( LOCAL_LIBRARY );
	const { type } = options;
	let otherOptions = {};

	if ( type ) {
		otherOptions = {
			...otherOptions,
			type,
		};
	}

	const post = find( storage, { 'id': parseInt( id ) }, ...otherOptions );

	return {
		type: FETCH_POST,
		payload: post,
	};
}

/**
 * Delete a post
 *
 * @param  {number}	id	Post id
 * 
 * @return {Object}	Action type and post id
 */
export function deletePost( id ) {
	const storage = getFromLocalStorage();
	const postKey = findKey( storage[ LOCAL_LIBRARY ], { 'id': parseInt( id ) } );

	storage[ LOCAL_LIBRARY ].splice( postKey, 1);
	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: DELETE_POST,
		payload: { id },
	};
}

/**
 * Create or update a media (fake)
 *
 * @param  {Object}	media			Media data
 * @param  {number}	media.id		(Optional) Media id
 * 
 * @return {Object}	Action type and media
 */
export function saveMedia( media_data ) {
	const { data } = media_data;
	let { id } = media_data;

	const storage = getFromLocalStorage();
	const date = ( new Date() ).toISOString();
	// create
	if ( ! id ) {
		id = Date.now();

		storage[ LOCAL_MEDIA ].push( {
			id,
			date,
			date_gmt: date,
			source_url: 'http://localhost:3000/sample1.jpg', // fake
			link: 'http://localhost:3000/sample1.jpg',
		} );
	} else if ( data ) { // update
		const media = find( storage[ LOCAL_MEDIA ], { 'id': parseInt( id ) } );
		const mediaKey = findKey( storage[ LOCAL_MEDIA ], { 'id': parseInt( id ) } );

		media.data = data;

		media.modified = date;
		media.modified_gmt = date;

		storage[ LOCAL_MEDIA ][ mediaKey ] = media;
	}

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: SAVE_MEDIA,
		payload: find( storage[ LOCAL_MEDIA ], { 'id': parseInt( id ) } ),
	};
}

/**
 * Get a media
 *
 * @param  {number}	id	Media id
 * 
 * @return {Object}	Action type and media
 */
export function fetchMedia( id ) {
	const media = find( getFromLocalStorage( LOCAL_MEDIA ), { 'id': parseInt( id ) } );

	return {
		type: FETCH_MEDIA,
		payload: media,
	};
}

/**
 * Get all categories
 * 
 * @param  {Object}	options	Optional. Search data
 * 
 * @return {Object}	Action type and array of categories
 */
export function fetchCategories( options = { } ) {
	let categories = bundling( getFromLocalStorage( LOCAL_CATEGORIES ) );

	categories = bundling( categories, options );

	return {
		type: FETCH_CATEGORIES,
		payload: categories,
	};
}

/**
 * Get all types
 * 
 * @param  {Object}	options	Optional. Search data
 * 
 * @return {Object}	Action type and array of types
 */
export function fetchTypes( options = { } ) {
	let types = bundling( getFromLocalStorage( LOCAL_TYPES ) );

	types = bundling( types, options );

	return {
		type: FETCH_TYPES,
		payload: types,
	};
}

/**
 * Get a type
 *
 * @param  {string}	slug	Article id
 * 
 * @return {Object}	Action type and article
 */
export function fetchType( slug ) {
	const type = find( getFromLocalStorage( LOCAL_TYPES ), { slug } );

	return {
		type: FETCH_TYPE,
		payload: type,
	};
}
