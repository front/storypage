// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, isEmpty, mapKeys, mapValues } from 'lodash';

// Internal Dependencies
import { fetchPosts, savePost, deletePost } from '../../store/actions';
import InputNSubmit from '../form/input-n-submit';

class PagesIndex extends React.Component {
	constructor( props ) {
		super( props );

		this.onDeleteButtonClick = this.onDeleteButtonClick.bind( this );

		this.state = {
			titles: {},
		};
	}

	componentWillMount() {
		this.props.fetchPosts( { status: 'all', order: 'desc', orderby: 'id' } );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.posts !== this.props.posts ) {
			const newTitles = mapValues( mapKeys( nextProps.posts, 'id' ), ( { id } ) => ( this.state.titles[ id ] || false ) );

			this.setState( { titles: newTitles } );
		}		
	}

	onDeleteButtonClick( event ) {
		const postId = event.target.value;
		this.props.deletePost( postId );
	}

	toogleTitle( postId, state ) {
		const newTitles = this.state.titles;
		newTitles[ postId ] = state;
		this.setState( { titles: newTitles } );
	}

	saveTitle( postId, title ) {
		// save title here!
		this.props.savePost( { id: postId, title } );

		this.toogleTitle( postId, false );
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
					<td>{ this.renderPostTitle( post ) }</td>
					<td className="text-right">
						<a className="btn btn-sm btn-outline-secondary " href={ post.preview_link }>Preview</a>{ " " }
						<Link className="btn btn-sm btn-outline-secondary " to={ `/${ post.type }s/${ post.id }/edit` }>Edit</Link>{ " " }
						<button className="btn btn-sm btn-outline-danger" value={ post.id } onClick={ this.onDeleteButtonClick }>Delete</button>
					</td>
				</tr>
			);
		} );
	}

	renderPostTitle( post ) {
		// console.log( this.state.titles );

		if ( this.state.titles[ post.id ] ) {
			return (
				<InputNSubmit 
					key={ post.id }
					value={ post.title.rendered }
					onSubmit={ ( newContent ) => { this.saveTitle( post.id, newContent ) } }
					onCancel={ () => { this.toogleTitle( post.id, false ) } }
				/>
			);
		} else {
			return <a onClick={ () => { this.toogleTitle( post.id, true ) } }>{ post.title.rendered }</a>;
		}
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

export default connect( mapStateToProps, { fetchPosts, savePost, deletePost } )( PagesIndex );
