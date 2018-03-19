import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';

class PostsIndex extends React.Component {
	componentDidMount() {
		this.props.fetchPosts()
	}

	renderPosts() {
		if (this.props.posts) {
			return _.map(this.props.posts, post => {
				return (
					<li 
						key={ post.id }
						className="list-group-item"
					>
						<Link to={ `/posts/${post.id}` }>{ post.title }</Link>
					</li>
				);
			});
		} else {
			return <li>No results!</li>;
		}
	}

	render() {
		return (
			<div>
				<h1>Posts Index!</h1>
				<Link to="/">Go home!</Link>
				<Link to="/posts/new">New Post</Link>

				<ul>
					{ this.renderPosts() }
				</ul>
			</div>
		)
	}
}

function mapStateToProps( { posts }) {
	return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
