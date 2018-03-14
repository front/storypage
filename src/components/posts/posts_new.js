import React from 'react';
import { Link } from 'react-router-dom';

import GutenbergEditor from '../gutenberg_editor';

class PostsNew extends React.Component {
	
	render() {
		const post = {
			content: { raw: ""},
			templates: '',
			title: { raw: '' },
			type: 'post'
		};
		
		return (
			<div>
				<h1>New Post</h1>
				<Link to="/posts">Go Back!</Link>
				<GutenbergEditor post={ post } />
			</div>
		)
	}
}


export default PostsNew;
