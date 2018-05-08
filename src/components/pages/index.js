// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';

// Internal Dependencies
import { fetchPosts, deletePost } from '../../store/actions';

class PagesIndex extends React.Component {
	constructor( props ) {
		super( props );

		this.onDeleteButtonClick = this.onDeleteButtonClick.bind( this );
	}
	componentDidMount() {
		this.props.fetchPosts( { order: 'desc', orderBy: 'id' } );
	}

	onDeleteButtonClick( event ) {
		const postId = event.target.value;
		this.props.deletePost( postId );
	}

	renderPosts() {
		if ( isEmpty( this.props.posts ) ) {
			return <tr><td colSpan="3">No results</td></tr>;
		}

		return map( this.props.posts, post => {
			const badgeType = post.type === 'page' ? 'info' : 'secondary';

			return (
				<tr key={ post.id }>
					<td><span className={ `badge badge-${ badgeType }` }>{ post.type }</span></td>
					<td>{ post.title.rendered }</td>
					<td className="text-right">
						<Link className="btn btn-sm btn-outline-secondary " to={ `/${ post.type }s/${ post.id }` }>Preview</Link>{ " " }
						<Link className="btn btn-sm btn-outline-secondary " to={ `/${ post.type }s/${ post.id }/edit` }>Edit</Link>{ " " }
						<button className="btn btn-sm btn-outline-danger" value={ post.id } onClick={ this.onDeleteButtonClick }>Delete</button>
					</td>
				</tr>
			);
		} );
	}

	render() {
		return (
			<div>
				<section className="jumbotron">
					<div className="container">
						<h1>Stories</h1>
						<p className="text-right">					
							<Link className="btn btn-outline-secondary float-left" to="/">Go back</Link>
							<Link className="btn btn-secondary" to="/posts/new">New post</Link>{ " " }
							<Link className="btn btn-info" to="/pages/new">New page</Link>
						</p>
					</div>
				</section>

				<section className="container">
					<table className="table">
						<thead>
							<tr>
								<th>Type</th>
								<th>Title</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ this.renderPosts() }
						</tbody>
					</table>
				</section>
			</div>
		);
	}
}

function mapStateToProps( { posts } ) {
	return { posts };
}

export default connect( mapStateToProps, { fetchPosts, deletePost } )( PagesIndex );
