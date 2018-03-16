import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

import GutenbergEditor from '../gutenberg_editor';

class PostsEdit extends React.Component {
	componentDidMount() {
		if (!this.props.post) {
			const { id } = this.props.match.params;
			if (id) {
				this.props.fetchPost(id);
			}
		}
	}
	
	render() {
		if (!this.props.post) {
			return <div>Loading...</div>;
		}

		const post = {
			// content: { raw: this.props.content } ,
			content: { raw: '<!-- wp:paragraph --><p>Hello</p><!-- /wp:paragraph -->' } ,
			templates: '',
			title: { raw: this.props.post.title },
			type: 'post',
			id: this.props.post.id
		};
		
		return (
			<div>
				<h1>Posts Edit!</h1>
				<Link to="/posts">Go Back!</Link>
				<GutenbergEditor post={ post } />
			</div>
		)
	}
}

function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsEdit);
