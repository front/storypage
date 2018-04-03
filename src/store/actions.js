// External dependences
import { filter } from 'lodash';

// Actions types
export const FETCH_PAGES = 'fetch_pages';
export const SAVE_PAGE = 'save_page';
export const FETCH_PAGE = 'fetch_page';
export const DELETE_PAGE = 'delete_page';

export const SAVE_MEDIA = 'save_media';
export const FETCH_MEDIA = 'fecth_media';

export const FETCH_ARTICLES = 'fetch_articles';
export const FETCH_ARTICLE = 'fetch_article';

export const FETCH_CATEGORIES = 'fetch_categories';

// Module constants
const LOCAL_STORAGE_KEY = 'storypage';
const LOCAL_PAGES = 'pages';
const LOCAL_MEDIA = 'media';
const LOCAL_ARTICLES = 'articles';
const LOCAL_CATEGORIES = 'categories';

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
				resources[ key ] = [];
				localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( resources ) );
			}

			return resources[ key ];
		}
		return resources;
	}

	// create for the first time
	const storage = {
		[ LOCAL_PAGES ]: [],
		[ LOCAL_MEDIA ]: [],
		[ LOCAL_ARTICLES ]: {
			1: { 
				id: 1,
				title: { rendered: 'First article title' },
				date_gmt: (new Date()).toISOString(),
				category_id: 4,
			},
			2: {
				id: 2,
				title: { rendered: 'Second article title' },
				date_gmt: (new Date()).toISOString(),
				category_id: 3,
			},
			3: {
				id: 3,
				title: { rendered: 'Third article title' },
				date_gmt: (new Date()).toISOString(),
				category_id: 2,
			},
			4: {
				id: 4,
				title: { rendered: 'Fourth article title' },
				date_gmt: (new Date()).toISOString(),
				category_id: 1,
			},
		}, // fake articles
		[ LOCAL_CATEGORIES ]: {
			// count, description, id, link, meta, name, parent, slug, taxonomy
			1: { id: 1, name: 'Category 1', parent: 0 },
			2: { id: 2, name: 'Category 2', parent: 0 },
			3: { id: 3, name: 'Category 3', parent: 0 },
			4: { id: 4, name: 'Category 4', parent: 0 },
		}, // fake categories
	};

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return storage;
}

/**
 * Get all pages
 * 
 * @return {Object}	Action type and array of pages
 */
export function fetchPages() {
	const pages = getFromLocalStorage( LOCAL_PAGES );

	return {
		type: FETCH_PAGES,
		payload: pages,
	};
}

/**
 * Create or update a page
 *
 * @param  {Object}	page			Page data
 * @param  {number}	page.id			(Optional) Page id
 * @param  {string}	page.title		(Optional) Page title
 * @param  {string}	page.content	(Optional) Page content
 * 
 * @return {Object}	Action type and page
 */
export function savePage( page ) {
	const storage = getFromLocalStorage();

	// create
	if ( ! page.id ) {
		page.id = Date.now();

		storage[ LOCAL_PAGES ] = {
			...storage[ LOCAL_PAGES ],
			[ page.id ]: {
				id: page.id,
				title: page.title || '',
				content: page.content || '',
				type: 'page',
				link: `${ window.location.origin }/pages/${ page.id }`,
			},
		};
	} else { // update
		if ( page.title ) {
			storage[ LOCAL_PAGES ][ page.id ].title = page.title;
		}

		if ( page.content ) {
			storage[ LOCAL_PAGES ][ page.id ].content = page.content;
		}

		// create a revision
	}

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: SAVE_PAGE,
		payload: storage[ LOCAL_PAGES ][ page.id ],
	};
}

/**
 * Get a page
 *
 * @param  {number}	id	Page id
 * 
 * @return {Object}	Action type and page
 */
export function fetchPage( id ) {
	const pages = getFromLocalStorage( LOCAL_PAGES );

	return {
		type: FETCH_PAGE,
		payload: pages[ id ] || { },
	};
}

/**
 * Delete a page
 *
 * @param  {number}	id	Page id
 * 
 * @return {Object}	Action type and page id
 */
export function deletePage( id ) {
	const storage = getFromLocalStorage();

	delete storage[ LOCAL_PAGES ][ id ];

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: DELETE_PAGE,
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
export function saveMedia( media ) {
	const storage = getFromLocalStorage();

	// create
	if ( ! media.id ) {
		media.id = Date.now();

		storage[ LOCAL_MEDIA ] = {
			...storage[ LOCAL_MEDIA ],
			[ media.id ]: {
				id: media.id,
				source_url: 'http://localhost:3000/sample.jpg', // fake
				link: 'http://localhost:3000/sample.jpg',
			},
		};
	} else if ( media.data ) { // update
		storage[ LOCAL_MEDIA ][ media.id ].data = media.data;
	}

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: SAVE_MEDIA,
		payload: storage[ LOCAL_MEDIA ][ media.id ],
	};
}

/**
 * Get all articles
 *
 * @param  {Object}	data	Optional. Search data
 * 
 * @return {Object}	Action type and array of articles
 */
export function fetchArticles( data = { }) {
	const { category_id, s } = data;
	let articles = getFromLocalStorage( LOCAL_ARTICLES );

	if ( category_id ) {
		articles = filter( articles, { category_id } );
	} 

	if ( s ) {
		articles = filter( articles, article => {
			const term = s.toLowerCase();
			const title = article.title.toLowerCase();

			return title.indexOf( term ) !== -1;
		} );
	}
	
	return {
		type: FETCH_ARTICLES,
		payload: articles,
	};
}

/**
 * Get an article
 *
 * @param  {number}	id	Article id
 * 
 * @return {Object}	Action type and article
 */
export function fetchArticle( id ) {
	const articles = getFromLocalStorage( LOCAL_ARTICLES );

	return {
		type: FETCH_ARTICLE,
		payload: articles[ id ] || { },
	};
}

/**
 * Get all categories
 * 
 * @return {Object}	Action type and array of categories
 */
export function fetchCategories() {
	const categories = getFromLocalStorage( LOCAL_CATEGORIES );

	return {
		type: FETCH_CATEGORIES,
		payload: categories,
	};
}
