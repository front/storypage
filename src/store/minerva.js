// External Dependencies
import axios from 'axios';
import { find } from 'lodash';

// Internal Dependencies
import { generatePosts, generateImages, generateCategories } from './generators';
import {
  N_IMAGES,
  N_CATEGORIES,
  N_POSTS,
  LOCAL_STORAGE_KEY,
  LOCAL_MEDIA,
  LOCAL_LIBRARY,
  LOCAL_CATEGORIES,
  LOCAL_AUTHORS,
  getFromLocalStorage,
} from './actions';

const API_ROOT = 'https://www.minervanett.no/wp-json/wp/v2';

/**
 * Get posts from minerva api
 * and save them in localStorage
 *
 * @param {Number} n Total of posts
 * @return {false}  If already exists posts in localStorage
 */
export function loadMinervaPosts (n = N_POSTS) {
  const storageLibrary = getFromLocalStorage(LOCAL_LIBRARY);

  if (storageLibrary.length) {
    return false;
  }

  axios.get(`${API_ROOT}/posts`, {
    per_page: n,
  })
  .then(function (response) {
    // console.log(`${API_ROOT}/posts`, response);
    const posts = response.data;

    posts.map(post => {
      post.content.raw = post.content.rendered;
      post.title.raw = post.title.rendered;
      post.excerpt.raw = post.excerpt.rendered.replace(/(<([^>]+)>)/ig, '');
      post.status = 'draft';
      post.permalink_template = `${window.location.origin}/posts/${post.id}`;
      post.preview_link = `${window.location.origin}/posts/${post.id}/preview`;
      post._links['wp:action-assign-categories'] = [];
      post._links['wp:action-create-categories'] = [];

      // load image
      if (post.featured_media) {
        loadMinervaMedia(post.featured_media);
      }

      const storage = getFromLocalStorage();
      storage[ LOCAL_LIBRARY ].push(post);
      // save posts in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

      // load categories
      post.categories.map(cat => {
        loadMinervaCategory(cat);
      });

      // load author
      if (post.author) {
        loadMinervaAuthor(post.author);
      }
    });
  })
  .catch(function (error) {
    console.log(error);

    // fake resources
    const storage = getFromLocalStorage();

    storage[ LOCAL_LIBRARY ] = generatePosts(N_POSTS, { N_IMAGES, N_CATEGORIES });
    storage[ LOCAL_MEDIA ] = generateImages(N_IMAGES);
    storage[ LOCAL_CATEGORIES ] = generateCategories(N_CATEGORIES);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
  });
}

/**
 * Get media from minerva api by id
 * and save them in localStorage
 *
 * @param {Number} id Media id
 */
function loadMinervaMedia (id) {
  axios.get(`${API_ROOT}/media/${id}`)
  .then(function (response) {
    // console.log(`${API_ROOT}/media/${id}`, response);
    const media = response.data;

    const storage = getFromLocalStorage();
    if (!find(storage[ LOCAL_MEDIA ], { id: parseInt(media.id) })) {
      media.data = {
        entity_type: 'file',
        entity_uuid: `e94e9d8d-4cf4-43c1-b95e-${id}`, // random
      };

      storage[ LOCAL_MEDIA ].push(media);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 * Get category from minerva api
 * @param {Number} id Category id
 */
function loadMinervaCategory (id) {
  axios.get(`${API_ROOT}/categories/${id}`)
  .then(function (response) {
    // console.log(`${API_ROOT}/categories/${id}`, response);
    const category = response.data;

    const storage = getFromLocalStorage();
    if (!find(storage[ LOCAL_CATEGORIES ], { id: parseInt(category.id) })) {
      storage[ LOCAL_CATEGORIES ].push(category);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

/**
 *
 * @param {*} id
 */
function loadMinervaAuthor (id) {
  axios.get(`${API_ROOT}/users/${id}`)
  .then(function (response) {
    // console.log(`${API_ROOT}/users/${id}`, response);
    const author = response.data;

    const storage = getFromLocalStorage();
    if (!find(storage[ LOCAL_AUTHORS ], { id: parseInt(author.id) })) {
      storage[ LOCAL_AUTHORS ].push(author);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
