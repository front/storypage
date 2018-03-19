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
					<tr key={ post.id }>
						<td>{ post.title }</td>
						<td><Link to={ `/posts/${post.id}` }>show</Link></td>
						<td><Link to={ `/posts/${post.id}/edit` }>edit</Link></td>
						<td>delete</td>
					</tr>
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

				<table>
					<thead>
						<tr>
							<td>Post</td>
							<td colSpan="3">Actions</td>
						</tr>
					</thead>
					<tbody>
						{ this.renderPosts() }
					</tbody>
				</table>
			</div>
		)
	}
}

function mapStateToProps( { posts }) {
	return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
