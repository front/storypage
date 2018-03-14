export const FETCH_POSTS = 'fetch_posts';
export const SAVE_POST = 'save_post';
export const FETCH_POST = 'fetch_post';
// export const DELETE_POST = 'delete_post';

const LOCAL_STORAGE_KEY = 'storypage_posts';

// const posts = [
// 	{
// 		id: 1,
// 		content: {},
// 		templates: '',
// 		title: { raw: 'Post 1' },
// 		type: 'post'
// 	},
// 	{
// 		id: 2,
// 		content: {},
// 		templates: '',
// 		title: { raw: 'Post 2' },
// 		type: 'post'
// 	},
// 	{
// 		id: 3,
// 		content: {},
// 		templates: '',
// 		title: { raw: 'Post 3' },
// 		type: 'post'
// 	}
// ];

function getPostsFromLocalStorage() {
	const data = localStorage.getItem(LOCAL_STORAGE_KEY);

	if (data) {
		return JSON.parse(data);
	} 

	localStorage.setItem(LOCAL_STORAGE_KEY, []);
	return {};	
}

export function fetchPosts() {
	const posts = getPostsFromLocalStorage();

	return {
		type: FETCH_POSTS,
		payload: posts
	};
}

export function savePost(values, callback) {
	let storedPosts = getPostsFromLocalStorage();

	if (!values.id) {
		values.id = Date.now();

		storedPosts = { 
			...storedPosts, 
			[values.id]: values 
		};
	} else {
		if (values.title) {
			storedPosts[values.id].title = values.title;
		}

		if (values.content) {
			storedPosts[values.id].content = values.content;
		}		
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedPosts));

	return {
		type: SAVE_POST,
		payload: values
	};
}

export function fetchPost(id) {
	const posts = getPostsFromLocalStorage();

	return {
		type: FETCH_POST,
		payload: posts[id] || { }
	};
}

// export function deletePost(id, callback) {
// 	//const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
// 	//	.then(() => callback());

// 	return {
// 		type: DELETE_POST,
// 		payload: id
// 	};
// }
