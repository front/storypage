// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { includes, map, isEmpty, filter } from 'lodash';
import { select, dispatch } from '@frontkom/gutenberg';

// Internal Dependencies
import { fetchTypes, fetchPost, fetchPosts, savePost } from '../../store/actions';
import { /*getTypes,*/ getPost, getPosts } from '../../store/selectors';
import Editor from '../editor';
import Loading from '../loading';
import NotFound from '../not_found';
import getTemplates from './templates';

let settings = {
	alignWide: true,
	availableTemplates: [],
	allowedBlockTypes: true, 
	disableCustomColors: false, 
	disablePostFormats: false,
	titlePlaceholder: "Add title",
	bodyPlaceholder: "Write your story",
	isRTL: false,
	autosaveInterval: 10,
	hasFixedToolbar: true,
};

class PagesEdit extends React.Component {
	state = {
		id: null,
		type: null,
	};

	componentWillMount() {
		this.props.fetchTypes();
		this.props.fetchPosts( { type: 'post', order: 'desc', orderBy: 'date' } );

		let { id } = this.props.match.params;
		const type = this.getType();

		if ( id ) {
			this.props.fetchPost( id );
		} else {
			id = Date.now();
			this.props.savePost( { id, type } );
		}

		this.setState( { id, type } );
	}

	getType() {
		// let { type } = this.props.post || {};

		// if ( ! type ) {
			// get type from url
			const type = this.props.match.params[ 0 ].slice( 0, -1 );
		// }

		// check if type exists
		// if ( ! includes( map( this.props.types, 'slug' ), type ) ) {
		// 	type = 'post';
		// }

		return type;
	}

	render() {
		// if ( isEmpty( this.props.types ) ) {
		// 	return <Loading />;
		// }
		const { id, type } = this.state;

		if ( this.props.match.params.id && isEmpty( this.props.post ) ) {
			return <NotFound />;
		}

		if ( ! id || ! type ) {
			return <Loading />;
		}
		

		const badgeType = type === 'page' ? 'info' : 'secondary';
		
		const posts = filter( this.props.posts, { type: 'post' } );

		settings = { 
			...settings,
			template: getTemplates( { type, posts } ),
		};

		const post = {
			id,
			type,
			...this.props.post,
		};

		return (
			<div>
				<div className="clearfix">
					<p className="float-left">This is a <span className={ `badge badge-${ badgeType }` }>{ type }</span>!</p>
					<button onClick={ () => dispatch( 'core/edit-post' ).openGeneralSidebar( 'edit-post/block' ) } >Open sidebar</button>
					<button onClick={ () => dispatch( 'core/edit-post' ).closeGeneralSidebar() } >Close sidebar</button>
					<button onClick={ () => console.log( select( 'core/editor' ).getEditedPostContent() )} >Get content</button>
					<Link className="btn btn-sm btn-outline-secondary float-right" to="/stories">Go back to Stories</Link>
				</div>
				<Editor post={ post } settings={ settings } />
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return {
		post: getPost( state, ownProps.match.params.id ),
		// types: getTypes( state ),
		posts: getPosts( state ),
	};
}

export default connect( mapStateToProps, { fetchTypes, fetchPosts, fetchPost, savePost } )( PagesEdit );
