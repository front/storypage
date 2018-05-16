// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { includes, map, isEmpty, filter } from 'lodash';

// Internal Dependencies
import { fetchTypes, fetchPost, fetchPosts } from '../../store/actions';
import { getTypes, getPost, getPosts } from '../../store/selectors';
import GutenbergEditor from '../gutenberg_editor';
import Loading from '../loading';
import getTemplates from './templates';

let settings = {
	alignWide: true,
	// availableTemplates: [],
	// allowedBlockTypes: true, 
	// disableCustomColors: false, 
	// disablePostFormats: false,
	titlePlaceholder: "Add title",
	bodyPlaceholder: "Write your story",
	// isRTL: false,
};

class PagesEdit extends React.Component {
	componentWillMount() {
		this.props.fetchTypes();
		this.props.fetchPosts( { type: 'post', order: 'desc', orderBy: 'date' } );

		const { id } = this.props.match.params;

		if ( id ) {
			this.props.fetchPost( id );
		}
	}

	getType() {
		let { type } = this.props.post || {};

		if ( ! type ) {
			// get type from url
			type = this.props.match.params[ 0 ].slice(0, -1);
		}

		// check if type exists
		if ( ! includes( map( this.props.types, 'slug' ), type ) ) {
			type = 'post';
		}

		return type;
	}

	render() {
		if ( isEmpty( this.props.types ) || isEmpty( this.props.posts ) ) {
			console.log('loading types');
			return <Loading />;
		}

		if ( this.props.match.params.id && isEmpty( this.props.post ) ) {
			console.log('loading post', this.props.match.params.id, this.props.post);
			return <Loading />;
		}		
		
		const type = this.getType();
		const badgeType = type === 'page' ? 'info' : 'secondary';

		const newPost = {
			content: { 
				raw: type === 'page' ? '' : '<!-- wp:paragraph --><p>Hello</p><!-- /wp:paragraph -->', 
				rendered: type === 'page' ? '' : '<p>Hello</p>' 
			},
			title: { raw: 'New', rendered: 'New' },
			type,
			permalink_template: '',
		};

		const { id } = this.props.match.params;		
		const post = id ? this.props.post : newPost;
		const posts = filter( this.props.posts, { type: 'post' } );

		settings = { 
			...settings,
			template: getTemplates( { type, posts } ),
		};

		return (
			<div>
				<div className="" style={ { margin: 0, height: '32px' } }>
					<p className="float-left">This is a <span className={ `badge badge-${ badgeType }` }>{ post.type }</span>!</p>
					<Link className="btn btn-sm btn-outline-secondary float-right" to="/stories">Go back to Stories</Link>
				</div>
				<GutenbergEditor post={ post } settings={ settings } />
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return {
		post: getPost( state, ownProps.match.params.id ),
		types: getTypes( state ),
		posts: getPosts( state ),
	};
}

export default connect( mapStateToProps, { fetchTypes, fetchPosts, fetchPost } )( PagesEdit );
