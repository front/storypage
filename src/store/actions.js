// External Dependencies
import { filter } from 'lodash';

// Internal Dependencies
import { bundling } from './query-helpers';

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
				date_gmt: ( new Date( '2018-04-01' ) ).toISOString(),
				date: ( new Date( '2018-04-01' ) ).toISOString(),
				category_id: 4,
				image_url: 'http://localhost:3000/sample.jpg',
			},
			2: {
				id: 2,
				title: { rendered: 'Second article title' },
				date_gmt: ( new Date( '2018-04-02' ) ).toISOString(),
				date: ( new Date( '2018-04-02' ) ).toISOString(),
				category_id: 3,
				image_url: 'http://localhost:3000/sample.jpg',
			},
			3: {
				id: 3,
				title: { rendered: 'Third article title' },
				date_gmt: ( new Date( '2018-04-03' ) ).toISOString(),
				date: ( new Date( '2018-04-03' ) ).toISOString(),
				category_id: 2,
				image_url: 'http://localhost:3000/sample.jpg',
			},
			4: {
				id: 4,
				title: { rendered: '4th article title' },
				date_gmt: ( new Date( '2018-04-04' ) ).toISOString(),
				date: ( new Date( '2018-04-04' ) ).toISOString(),
				category_id: 1,
				image_url: 'http://localhost:3000/sample.jpg',
			},
			5: {
				id: 5,
				title: { rendered: '5th article title' },
				date_gmt: ( new Date( '2018-04-05' ) ).toISOString(),
				date: ( new Date( '2018-04-05' ) ).toISOString(),
				category_id: 2,
				image_url: 'http://localhost:3000/sample.jpg',
			},
			6: {
				id: 6,
				title: { rendered: 'Last article title' },
				date_gmt: ( new Date( '2018-04-06' ) ).toISOString(),
				date: ( new Date( '2018-04-06' ) ).toISOString(),
				category_id: 1,
				image_url: 'http://localhost:3000/sample.jpg',
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
 * @param  {Object}	options			Query options
 * @return {Object}	Action type and array of pages
 */
export function fetchPages( options = { } ) {
	const pages = bundling( getFromLocalStorage( LOCAL_PAGES ), options );

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
				title: page.title || `Page ${ page.id }`,
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
 * @param  {Object}	options	Optional. Search data
 * 
 * @return {Object}	Action type and array of articles
 */
export function fetchArticles( options = { } ) {
	const { s } = options;
	const categoryId = parseInt( options.category_id );

	let articles = getFromLocalStorage( LOCAL_ARTICLES );

	if ( categoryId ) {
		articles = filter( articles, { category_id: categoryId } );
	} 

	if ( s ) {
		articles = filter( articles, article => {
			const term = s.toLowerCase();
			const title = article.title.rendered.toLowerCase();

			return title.indexOf( term ) !== -1;
		} );
	}

	articles = bundling( articles, options );
	
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
