// External Dependencies
import { times, random } from 'lodash';

/**
 * Generates a list of posts
 * @param  {[type]} n       Number of posts to generate
 * @param  {Object} options Posts options (numebr of images and number of categories)
 * @return {Array}          Array of posts
 */
export function generatePosts (n = 1, options = {}) {
  const { N_IMAGES = 1, N_CATEGORIES = 1 } = options;

  return times(n, index => {
    const id = index + 1;
    const date = (new Date(`2018-04-${id}`)).toISOString();
    return {
      id,
      content: {
        raw: `<!-- wp:paragraph --><p>Content of Generated post number ${id}</p><!-- /wp:paragraph -->`,
        rendered: `<p>Content of Generated post number ${id}</p>`,
      },
      date,
      date_gmt: date,
      // footer: false,
      // header: true,
      title: {
        raw: `Generated post number ${id}`,
        rendered: `Generated post number ${id}`,
      },
      status: 'draft', // 'publish',
      revisions: { count: 0, last_id: 0 },
      parent: 0,
      theme_style: true,
      type: 'post',
      link: `${window.location.origin}/posts/${id}`,
      categories: [ random(1, N_CATEGORIES) ],
      featured_media: random(1, N_IMAGES),
      permalink_template: `${window.location.origin}/posts/${id}`,
      preview_link: `${window.location.origin}/posts/${id}/preview`,
      _links: {
        'wp:action-assign-categories': [],
        'wp:action-create-categories': [],
      },
    };
  });
}

/**
 * Generates a list of images
 * @param  {number} n Number of images to generate
 * @return {Array}   Array of images
 */
export function generateImages (n = 1) {
  return times(n, index => {
    const id = index + 1;
    const date = (new Date(`2018-04-${id}`)).toISOString();

    return {
      id,
      caption: { raw: '', rendered: '' },
      date_gmt: date,
      date,
      link: `${window.location.origin}/img${id}.png`,
      media_type: 'image',
      source_url: `${window.location.origin}/img${id}.png`,
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
    };
  });
}

/**
 * Generates a list of categories
 * @param  {number} n Number of categories to generate
 * @return {Array}   Array of categories
 */
export function generateCategories (n = 1) {
  return times(n, index => {
    const id = index + 1;
    // count, description, id, link, meta, name, parent, slug, taxonomy
    return {
      id,
      name: `Category ${id}`,
      parent: 0,
    };
  });
}

/**
 * Generates postTypes array
 * @return {Array} Array of postTypes
 */
export function generateTypes () {
  return [
    {
      id: 1,
      name: 'Pages', rest_base: 'pages', slug: 'page',
      supports: {
        author: true,
        comments: false, // hide discussion-panel
        'custom-fields': true,
        editor: true,
        'page-attributes': false, // hide page-attributes panel
        revisions: true,
        thumbnail: false, // hide featured-image panel
        title: false, // hide title on editor
      },
      viewable: true,
    },
    {
      id: 2,
      name: 'Posts', rest_base: 'posts', slug: 'post',
      labels: { remove_featured_media: 'Remove featured image' },
      supports: {
        author: true,
        comments: false, // hide discussion-panel
        'custom-fields': true,
        editor: true,
        'page-attributes': false, // hide page-attributes panel
        revisions: true,
        thumbnail: true, // show featured-image panel
        title: true, // show title on editor
      },
      viewable: true,
    },
    // {
    // 	id: 3,
    // 	description: '',
    // 	hierarchical: false,
    // 	name: 'Media', rest_base: 'media', slug: 'attachment',
    // 	taxonomies: [],
    // 	// publishable: false, // * hide publish toggle
    // 	// saveable: false, // * show save button
    // 	// autosaveable: false, // * disable autosave
    // },
  ];
}

/**
 * Generates index object
 * @return {Object}   Index object (wp ./ request)
 */
export function generateIndex () {
  return {
    theme_supports: {
      formats: [ 'standard', 'aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio' ],
      'post-thumbnails': true,
    },
  };
}

/**
 * Generates a list of taxonomies
 * @return {Array} Array of taxonomies
 */
export function generateTaxonomies () {
  return [
    {
      id: 1,
      name: 'Categories', rest_base: 'categories', slug: 'category',
      types: [ 'post' ],
      visibility: {
        show_ui: true,
      },
      hierarchical: true,
      labels: {
        menu_name: 'Categories',
      },
    },
  ];
}
