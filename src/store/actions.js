// Actions types
export const FETCH_PAGES = 'fetch_pages';
export const SAVE_PAGE = 'save_page';
export const FETCH_PAGE = 'fetch_page';
export const DELETE_PAGE = 'delete_page';

export const SAVE_MEDIA = 'save_media';

export const FETCH_ARTICLES = 'fetch_articles';
export const FETCH_ARTICLE = 'fetch_article';

// Module constants
const LOCAL_STORAGE_KEY = 'storypage';
const LOCAL_PAGES = 'pages';
const LOCAL_MEDIA = 'media';
const LOCAL_ARTICLES = 'articles';

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
		[ LOCAL_ARTICLES ]: [],
	};

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return storage;
}

/*
 * Pages
 */
// Get all pages
export function fetchPages() {
	const pages = getFromLocalStorage( LOCAL_PAGES );

	return {
		type: FETCH_PAGES,
		payload: pages,
	};
}

// Create or update a page
export function savePage( values ) {
	const storage = getFromLocalStorage();

	// create
	if ( ! values.id ) {
		values.id = Date.now();

		storage[ LOCAL_PAGES ] = {
			...storage[ LOCAL_PAGES ],
			[ values.id ]: {
				id: values.id,
				title: values.title || '',
				content: values.content || '',
				type: 'page',
				link: `${ window.location.origin }/pages/${ values.id }`,
			},
		};
	} else { // update
		if ( values.title ) {
			storage[ LOCAL_PAGES ][ values.id ].title = values.title;
		}

		if ( values.content ) {
			storage[ LOCAL_PAGES ][ values.id ].content = values.content;
		}

		// create a revision
	}

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: SAVE_PAGE,
		payload: storage[ LOCAL_PAGES ][ values.id ],
	};
}

// Get a page
export function fetchPage( id ) {
	const pages = getFromLocalStorage( LOCAL_PAGES );

	return {
		type: FETCH_PAGE,
		payload: pages[ id ] || { },
	};
}

// Delete a page
export function deletePage( id ) {
	const storage = getFromLocalStorage();

	delete storage[ LOCAL_PAGES ][ id ];

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: DELETE_PAGE,
		payload: id,
	};
}

/*
 * Media
 */
// Create or update media
export function saveMedia( values ) {
	const storage = getFromLocalStorage();

	// create
	if ( ! values.id ) {
		values.id = Date.now();

		storage[ LOCAL_MEDIA ] = {
			...storage[ LOCAL_MEDIA ],
			[ values.id ]: {
				id: values.id,
				source_url: 'http://localhost:3000/sample.jpg',
				link: 'http://localhost:3000/sample.jpg',
			},
		};
	} else if ( values.data ) { // update
		storage[ LOCAL_MEDIA ][ values.id ].data = values.data;
	}

	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( storage ) );

	return {
		type: SAVE_MEDIA,
		payload: storage[ LOCAL_MEDIA ][ values.id ],
	};
}

/*
 * Articles
 */
// Get all articles
export function fetchArticles() {
	const articles = getFromLocalStorage( LOCAL_ARTICLES );

	return {
		type: FETCH_ARTICLES,
		payload: articles,
	};
}
// Get an article
export function fetchArticle( id ) {
	const articles = getFromLocalStorage( LOCAL_ARTICLES );

	return {
		type: FETCH_ARTICLE,
		payload: articles[ id ] || { },
	};
}
