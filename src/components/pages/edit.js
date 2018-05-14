// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { includes, map, isEmpty } from 'lodash';

// Internal Dependencies
import { fetchTypes, fetchPost } from '../../store/actions';
import { getTypes, getPost } from '../../store/selectors';
import GutenbergEditor from '../gutenberg_editor';
import Loading from '../loading';

const settings = {
	alignWide: false,
	availableTemplates: [],
	allowedBlockTypes: true, 
	disableCustomColors: false, 
	disablePostFormats: false,
	titlePlaceholder: "Add title",
	bodyPlaceholder: "Write your story",
	isRTL: false,
};

class PagesEdit extends React.Component {
	componentWillMount() {
		this.props.fetchTypes();
	}

	componentDidMount() {
		if ( ! this.props.post ) {
			const { id } = this.props.match.params;

			if ( id ) {
				this.props.fetchPost( id );
			}
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
		if ( isEmpty( this.props.types ) ) {
			return <Loading />;
		}

		if ( this.props.match.params.id && ! this.props.post ) {
			return <Loading />;
		}

		// const { content, title, type, id } = this.props.post || {};

		// const post = {
		// 	content: content || { raw: '<!-- wp:paragraph --><p>Hello</p><!-- /wp:paragraph -->', rendered: '<p>Hello</p>' },
		// 	templates: '',
		// 	title: title || { raw: '' },
		// 	type: this.getType(),
		// 	id,
		// };
		
		const { post } = this.props;

		console.log( 'post', post );

		return (
			<div>
				<div style={ { margin: 0, height: '32px' } } className="">
					<Link className="btn btn-primary btn-lg btn-block" to="/stories">Go to Stories</Link>
				</div>
				<GutenbergEditor post={ post } settings={ settings } />
			</div>
		);
	}
}

function mapStateToProps( state, ownProps ) {
	return { 
		types: getTypes( state ), 
		post: getPost( state, ownProps.match.params.id ) 
	};
}

export default connect( mapStateToProps, { fetchTypes, fetchPost } )( PagesEdit );
