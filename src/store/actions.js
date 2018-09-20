// External Dependencies
import { filter, find, findKey, includes, has, /* clone, */reject, random, mapKeys } from 'lodash';

// Internal Dependencies
import { generateTypes, generateIndex, generateTaxonomies } from './generators';
import { bundling } from './query-helpers';
import { loadMinervaPosts } from './minerva';

// Actions types
export const FETCH_INDEX = 'fetch_index';

export const FETCH_POSTS = 'fetch_posts';
export const SAVE_POST = 'save_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

export const SAVE_MEDIA = 'save_media';
export const FETCH_MEDIA = 'fetch_media';
export const FETCH_MEDIA_ITEMS = 'fetch_media_items';

export const FETCH_CATEGORIES = 'fetch_categories';
export const SAVE_CATEGORY = 'save_category';

export const FETCH_TYPES = 'fetch_types';
export const FETCH_TYPE = 'fetch_type';

export const FETCH_TAXONOMIES = 'fetch_taxonomies';
export const FETCH_TAXONOMY = 'fetch_taxonomy';

export const FETCH_AUTHORS = 'fetch_authors';

export const FETCH_BLOCKS = 'fetch_blocks';
export const SAVE_BLOCK = 'save_block';
export const DELETE_BLOCK = 'delete_block';
export const FETCH_BLOCK = 'fetch_block';

// Module constants
export const LOCAL_STORAGE_KEY = 'storypage';
const LOCAL_INDEX = 'index';
export const LOCAL_MEDIA = 'media';
export const LOCAL_LIBRARY = 'library';
export const LOCAL_CATEGORIES = 'categories';
const LOCAL_TYPES = 'types';
const LOCAL_TAXONOMIES = 'taxonomies';
export const LOCAL_AUTHORS = 'authors';
const LOCAL_BLOCKS = 'blocks';

export const N_IMAGES = 6;
export const N_CATEGORIES = 4;
export const N_POSTS = 20;

const DEFAULT_STORAGE = {
  [ LOCAL_MEDIA ]: [], // generateImages(N_IMAGES),
  [ LOCAL_LIBRARY ]: [], // generatePosts(N_POSTS, { N_IMAGES, N_CATEGORIES }),
  [ LOCAL_CATEGORIES ]: [], // generateCategories(N_CATEGORIES),
  [ LOCAL_AUTHORS ]: [],
  [ LOCAL_TYPES ]: generateTypes(),
  [ LOCAL_INDEX ]: generateIndex(),
  [ LOCAL_TAXONOMIES ]: generateTaxonomies(),
  [ LOCAL_BLOCKS ]: [],
};

// Get resources from minerva api
(function () {
  loadMinervaPosts();
}());

/**
 * Returns app resources storaged on local storage by key
 *
 * @param  {string}	key	Local Storage key (see LOCAL_ constants)
 *
 * @return {Array}	Resources array
 */
export function getFromLocalStorage (key = null) {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (data) {
    const resources = JSON.parse(data);

    if (key) {
      if (! resources[ key ]) {
        resources[ key ] = DEFAULT_STORAGE[ key ];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resources));
      }

      return resources[ key ];
    }
    return resources;
  }

  // create for the first time
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STORAGE));

  return key ? DEFAULT_STORAGE[ key ] : DEFAULT_STORAGE;
}

export function fetchIndex () {
  const index = getFromLocalStorage(LOCAL_INDEX);

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
export function fetchPosts (options = { }) {
  let posts = getFromLocalStorage(LOCAL_LIBRARY);

  const { type, search } = options;
  // let { status } = options;
  const categoryId = parseInt(options.category_id);

  posts = reject(posts, { type: 'revision' });

  if (type) {
    posts = filter(posts, { type });
  }

  /* if ((status || (status = 'publish')) && status !== 'all') {
    posts = filter(posts, { status });
  } */

  if (categoryId) {
    posts = filter(posts, post => {
      return includes(post.categories, categoryId);
    });
  }

  if (search) {
    posts = filter(posts, post => {
      const term = search.toLowerCase();
      const title = post.title.rendered.toLowerCase();

      return title.indexOf(term) !== -1;
    });
  }

  posts = bundling(posts, options);

  return {
    type: FETCH_POSTS,
    payload: posts,
  };
}

/**
 * Create or update a post
 *
 * @param  {Object}	postData			Post data
 * @param  {number}	postData.id		(Optional) Post id
 * @param  {string}	postData.title		(Optional) Post title
 * @param  {string}	postData.content	(Optional) Post content
 *
 * @return {Object}	Action type and post
 */
export function savePost (postData) {
  const {
    title,
    content,
    type,
    status,
    // header,
    // footer,
    categories,
  } = postData;

  const themeStyle = postData.theme_style;
  const featuredMedia = postData.featured_media;
  let id = parseInt(postData.id);
  const storage = getFromLocalStorage();

  const post = id ? storage[ LOCAL_LIBRARY ].find(item => (item.id === id)) : false;

  const date = (new Date()).toISOString();

  const reg = /(<!--.*?-->)/g;

  if (! id || ! post) {
    // create a new post
    id = id ? id : Date.now();

    storage[ LOCAL_LIBRARY ].push({
      id,
      content: {
        raw: content || '',
        rendered: (content && content.replace(reg, '')) || '',
      },
      date,
      date_gmt: date,
      featured_media: featuredMedia || 0,
      // footer: footer || false,
      // header: header || true,
      title: {
        raw: title || `Frontpage ${id}`,
        rendered: (title && title.replace(reg, '')) || `Frontpage ${id}`,
      },
      status: status || 'draft',
      revisions: { count: 0, last_id: 0 },
      parent: 0,
      theme_style: themeStyle || true,
      type,
      link: `${window.location.origin}/${type}s/${id}`,
      permalink_template: `${window.location.origin}/${type}s/${id}`,
      preview_link: `${window.location.origin}/${type}s/${id}/preview`,
      categories: categories || [],
    });
  }
  else {
    // update an existent post
    const postKey = findKey(storage[ LOCAL_LIBRARY ], { id: parseInt(id) });

    if (title) {
      post.title = {
        raw: title,
        rendered: title.replace(reg, ''),
      };
    }

    if (has(postData, 'content')) {
      post.content = {
        raw: content,
        rendered: content.replace(reg, ''),
      };
    }

    if (has(postData, 'status')) {
      post.status = status;
    }

    if (has(postData, 'theme_style')) {
      post.theme_style = themeStyle;
    }

    /* if (has(postData, 'header')) {
      post.header = header;
    }

    if (has(postData, 'footer')) {
      post.footer = footer;
    } */

    if (has(postData, 'featured_media')) {
      post.featured_media = featuredMedia;
    }

    if (has(postData, 'categories')) {
      post.categories = categories;
    }

    post.modified = date;
    post.modified_gmt = date;

    // Create a revision
    // const revision = clone( post );
    // revision.type = 'revision';
    // revision.parent = post.id;
    // revision.id = Date.now();
    // revision.date = date;
    // revision.date_gmt = date;

    // post.revisions.count = post.revisions.count + 1;
    // post.revisions.last_id = revision.id;

    storage[ LOCAL_LIBRARY ][ postKey ] = post;
    // storage[ LOCAL_LIBRARY ].push( revision );
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

  return {
    type: SAVE_POST,
    payload: storage[ LOCAL_LIBRARY ].find(item => (item.id === id)),
  };
}

/**
 * Get a post
 *
 * @param  {number}	id		Post id
 * @param  {Object}	options	Query options
 *
 * @return {Object}	Action type and post
 */
export function fetchPost (id, options = {}) {
  const storage = getFromLocalStorage(LOCAL_LIBRARY);
  const { type } = options;
  let otherOptions = {};

  if (type) {
    otherOptions = {
      ...otherOptions,
      type,
    };
  }

  const post = find(storage, { id: parseInt(id) }, ...otherOptions);

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
export function deletePost (id) {
  const storage = getFromLocalStorage();
  const postKey = findKey(storage[ LOCAL_LIBRARY ], { id: parseInt(id) });

  storage[ LOCAL_LIBRARY ].splice(postKey, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

  return {
    type: DELETE_POST,
    payload: { id },
  };
}

/**
 * Create or update a media (fake)
 *
 * @param  {Object}	mediaData			Media data
 * @param  {number}	mediaData.id		(Optional) Media id
 *
 * @return {Object}	Action type and media
 */
export function saveMedia (mediaData) {
  let { id } = mediaData;

  const storage = getFromLocalStorage();
  const date = (new Date()).toISOString();

  const image = random(1, N_IMAGES);
  // create
  if (! id) {
    id = Date.now();

    storage[ LOCAL_MEDIA ].push({
      id,
      caption: { raw: '', rendered: '' },
      date,
      date_gmt: date,
      source_url: `${window.location.origin}/img${image}.png`,
      link: `${window.location.origin}/img${image}.png`,
      data: {
        entity_type: 'file',
        entity_uuid: `e94e9d8d-4cf4-43c1-b95e-${id}`,
      },
      media_details: {
        file: '',
        height: 2100,
        image_meta: {},
        sizes: {},
        width: 3360,
      },
      title: { raw: '', rendered: '' },
    });
  }
  else { // update
    let media = find(storage[ LOCAL_MEDIA ], { id: parseInt(id) });
    const mediaKey = findKey(storage[ LOCAL_MEDIA ], { id: parseInt(id) });

    media = mediaData;

    media.modified = date;
    media.modified_gmt = date;

    storage[ LOCAL_MEDIA ][ mediaKey ] = media;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

  return {
    type: SAVE_MEDIA,
    payload: find(storage[ LOCAL_MEDIA ], { id: parseInt(id) }),
  };
}

/**
 * Get a media
 *
 * @param  {number}	id	Media id
 *
 * @return {Object}	Action type and media
 */
export function fetchMedia (id) {
  const media = find(getFromLocalStorage(LOCAL_MEDIA), { id: parseInt(id) });

  return {
    type: FETCH_MEDIA,
    payload: media,
  };
}

/**
 * Get media items
 *
 * @param  {Object}	options	Optional. Search data
 *
 * @return {Object}	Action type and array of media items
 */
export function fetchMediaItems (options) {
  const items = bundling(getFromLocalStorage(LOCAL_MEDIA), options);

  return {
    type: FETCH_MEDIA_ITEMS,
    payload: items,
  };
}

/**
 * Get all categories
 *
 * @param  {Object}	options	Optional. Search data
 *
 * @return {Object}	Action type and array of categories
 */
export function fetchCategories (options = { }) {
  const categories = bundling(getFromLocalStorage(LOCAL_CATEGORIES), options);

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
export function fetchTypes (options = { }) {
  let types = bundling(getFromLocalStorage(LOCAL_TYPES), options);
  types = mapKeys(types, ({ slug }) => (slug));

  return {
    type: FETCH_TYPES,
    payload: types,
  };
}

/**
 * Get a type
 *
 * @param  {string}	slug	postType slug
 *
 * @return {Object}	Action type and postType
 */
export function fetchType (slug) {
  const type = find(getFromLocalStorage(LOCAL_TYPES), { slug });

  return {
    type: FETCH_TYPE,
    payload: type,
  };
}

/**
 * Get all taxonomies
 *
 * @param  {Object}	options	Optional. Search data
 *
 * @return {Object}	Action type and array of taxonomies
 */
export function fetchTaxonomies (options = { }) {
  let taxonomies = bundling(getFromLocalStorage(LOCAL_TAXONOMIES), options);
  taxonomies = mapKeys(taxonomies, ({ slug }) => (slug));

  return {
    type: FETCH_TAXONOMIES,
    payload: taxonomies,
  };
}

/**
 * Get a taxonomy
 *
 * @param  {string}	slug	taxonomy slug
 *
 * @return {Object}	Action type and taxonomy
 */
export function fetchTaxonomy (slug) {
  const taxonomy = find(getFromLocalStorage(LOCAL_TAXONOMIES), { slug });

  return {
    type: FETCH_TAXONOMY,
    payload: taxonomy,
  };
}


/**
 * Create or update a category
 *
 * @param  {Object}	categoryData			Category data
 * @param  {number}	categoryData.id		(Optional) Category id
 *
 * @return {Object}	Action type and category
 */
export function saveCategory (categoryData) {
  const { name, parent } = categoryData;
  let { id } = categoryData;

  const storage = getFromLocalStorage();

  // create
  if (! id) {
    id = Date.now();

    storage[ LOCAL_CATEGORIES ].push({
      id,
      name,
      parent: parent || 0,
    });
  }
  else { // update
    const category = find(storage[ LOCAL_CATEGORIES ], { id: parseInt(id) });
    const categoryKey = findKey(storage[ LOCAL_CATEGORIES ], { id: parseInt(id) });

    if (has(categoryData, 'name')) {
      category.name = name;
    }

    if (has(categoryData, 'parent')) {
      category.parent = parent;
    }

    storage[ LOCAL_CATEGORIES ][ categoryKey ] = category;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

  return {
    type: SAVE_CATEGORY,
    payload: find(storage[ LOCAL_CATEGORIES ], { id: parseInt(id) }),
  };
}

/**
 * Get all authors
 *
 * @param  {Object}	options	Optional. Search data
 *
 * @return {Object}	Action type and array of authores
 */
export function fetchAuthors (options = { }) {
  const authors = bundling(getFromLocalStorage(LOCAL_AUTHORS), options);

  return {
    type: FETCH_AUTHORS,
    payload: authors,
  };
}


/**
 * Create or update a block
 *
 * @param  {Object}	blockData			Block data
 * @param  {number}	blockData.id		(Optional) Block id
 *
 * @return {Object}	Action type and block
 */
export function saveBlock (blockData) {
  const { title, content } = blockData;
  let { id } = blockData;

  const storage = getFromLocalStorage();

  // create
  if (! id) {
    id = Date.now();

    storage[ LOCAL_BLOCKS ].push({
      id,
      title,
      content,
    });
  }
  else { // update
    const block = find(storage[ LOCAL_BLOCKS ], { id: parseInt(id) });
    const blockKey = findKey(storage[ LOCAL_BLOCKS ], { id: parseInt(id) });

    if (has(blockData, 'title')) {
      block.title = title;
    }

    if (has(blockData, 'content')) {
      block.content = content;
    }

    storage[ LOCAL_BLOCKS ][ blockKey ] = block;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

  return {
    type: SAVE_BLOCK,
    payload: find(storage[ LOCAL_BLOCKS ], { id: parseInt(id) }),
  };
}

/**
 * Get all blocks
 *
 * @param  {Object}	options	Optional. Search data
 *
 * @return {Object}	Action type and array of block
 */
export function fetchBlocks (options = { }) {
  const blocks = bundling(getFromLocalStorage(LOCAL_BLOCKS), options);

  return {
    type: FETCH_BLOCKS,
    payload: blocks,
  };
}

/**
 * Delete a block
 *
 * @param  {number}	id	Block id
 *
 * @return {Object}	Action type and block id
 */
export function deleteBlock (id) {
  const storage = getFromLocalStorage();
  const postKey = findKey(storage[ LOCAL_BLOCKS ], { id: parseInt(id) });

  storage[ LOCAL_BLOCKS ].splice(postKey, 1);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

  return {
    type: DELETE_BLOCK,
    payload: { id },
  };
}

/**
 * Get a block
 *
 * @param  {number}	id		Block id
 * @param  {Object}	options	Query options
 *
 * @return {Object}	Action type and block
 */
export function fetchBlock (id) {
  const block = find(getFromLocalStorage(LOCAL_BLOCKS), { id: parseInt(id) });

  return {
    type: FETCH_BLOCK,
    payload: block,
  };
}
