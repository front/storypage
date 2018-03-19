import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

// Gutenberg imports
// import ReactHtmlParser from 'react-html-parser';

class PostsShow extends React.Component {
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
			return <div>Loading post...</div>;
		}
		
		return (
			<div>
				<h1>Posts Show!</h1>
				<Link to="/posts">Go Back!</Link>
				<Link to={ `/posts/${ this.props.post.id }/edit` }>Edit</Link>

				<br/>
				<br/>

				<div>
					<h1>{ this.props.post.title }</h1>
					{ this.props.post.content }
				</div>
			</div>
		)
	}
}

function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
