export const FETCH_POSTS = 'fetch_posts';
export const SAVE_POST = 'save_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

export const SAVE_MEDIA = 'save_media';

const LOCAL_STORAGE_KEY = 'storypage';
const LOCAL_POSTS = 'posts';
const LOCAL_MEDIA = 'media';

function getFromLocalStorage(key = null) {
	const data = localStorage.getItem(LOCAL_STORAGE_KEY);

	if (data) {
		const resources = JSON.parse(data);

		if (key) {
			if (!resources[key]) {
				resources[key] = [];
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resources));
			}

			return resources[key];
		} else {
			return resources
		}	
	} 

	// create for the first time
	const storage = { 
		[LOCAL_POSTS]: [],
		[LOCAL_MEDIA]: [] 
	};

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

	return storage;	
}

// Get all posts
export function fetchPosts() {
	const posts = getFromLocalStorage(LOCAL_POSTS);

	return {
		type: FETCH_POSTS,
		payload: posts
	};
}

// Create or edit a post
export function savePost(values) {
	const storage = getFromLocalStorage();

	// create
	if (!values.id) {
		values.id = Date.now();

		storage[LOCAL_POSTS] = { 
			...storage[LOCAL_POSTS], 
			[values.id]: {
				id: values.id,
				title: values.title || '', 
				content: values.content || '' 
			}
		};
	} 
	// update
	else {
		if (values.title) {
			storage[LOCAL_POSTS][values.id].title = values.title;
		}

		if (values.content) {
			storage[LOCAL_POSTS][values.id].content = values.content;
		}		
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

	return {
		type: SAVE_POST,
		payload: storage[LOCAL_POSTS][values.id]
	};
}

// Get a post
export function fetchPost(id) {
	const posts = getFromLocalStorage(LOCAL_POSTS);

	return {
		type: FETCH_POST,
		payload: posts[id] || { }
	};
}

// Delete a post
export function deletePost(id) {
	const storage = getFromLocalStorage();

	delete storage[LOCAL_POSTS][id]

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

	return {
		type: DELETE_POST,
		payload: id
	};
}

export function saveMedia(values) {
	const storage = getFromLocalStorage();

	// create
	if (!values.id) {
		values.id = Date.now();

		console.log(values.data);

		storage[LOCAL_MEDIA] = { 
			...storage[LOCAL_MEDIA], 
			[values.id]: {
				id: values.id,
				url: '',
				link: ''
			}
		};
	} 
	// update
	else {
		if (values.data) {
			storage[LOCAL_MEDIA][values.id].data = values.data;
		}	
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

	return {
		type: SAVE_MEDIA,
		payload: storage[LOCAL_MEDIA][values.id]
	};
}