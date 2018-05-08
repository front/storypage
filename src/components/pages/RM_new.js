// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty, map } from 'lodash';
import { parse } from 'querystringify';

// Internal Dependencies
import { fetchPosts } from '../../store/actions';
import GutenbergEditor from '../gutenberg_editor';

class PagesNew extends React.Component {
	componentWillMount() {
		this.props.fetchPosts( { type: 'post', order: 'desc', orderBy: 'date' } );
	}

	render() {
		const posts = map( this.props.posts );
		const type = parse( this.props.location.search ).type || 'post';

		let template = [];

		if ( type === 'post' ) {
			// template = [ [ 'dynamic/article', { } ] ];
		} else {
			template = isEmpty( posts ) ? [ ] : [
				[ 'rows/col4-col4-col4', { }, [ 
					[ 'dynamic/article', { 
						layout: 'column-1 col4',
						title: [ posts[ 0 ].title.rendered ],
						url: [ posts[ 0 ].image_url ],
					} ],
					[ 'dynamic/article', { 
						layout: 'column-2 col4',
						title: [ posts[ 1 ].title.rendered ],
						url: [ posts[ 1 ].image_url ],
					} ],
					[ 'dynamic/article', { 
						layout: 'column-3 col4',
						title: [ posts[ 2 ].title.rendered ],
						url: [ posts[ 2 ].image_url ],
					} ],
				] ],		
				[ 'rows/col4-col4-col4', { }, [ 
					[ 'dynamic/article', { 
						layout: 'column-1 col4',
						title: [ posts[ 3 ].title.rendered ],
						url: [ posts[ 3 ].image_url ],
					} ],
					[ 'dynamic/article', { 
						layout: 'column-2 col4',
						title: [ posts[ 4 ].title.rendered ],
						url: [ posts[ 4 ].image_url ],
					} ],
					[ 'dynamic/article', { 
						layout: 'column-3 col4',
						title: [ posts[ 5 ].title.rendered ],
						url: [ posts[ 5 ].image_url ],
					} ],
				] ],
			];
		}

		const post = {
			content: { raw: '' },
			title: { raw: '' },
			type: type,
		};

		const settings = {
			// availableTemplates: [],
			// blockTyoes: true,
			// disableCustomColors: false,
			// titlePlaceholder: 'Add a title here...',
			template,
		};

		return (
			<div>
				<div style={ { margin: 0, height: '32px', backgroundColor: 'black' } }>
					<div className="container text-center">
						<Link className="btn btn-sm btn-outline-light" to="/posts">Go to list</Link>
					</div>
				</div>

				{ ( ! isEmpty( posts ) && <GutenbergEditor post={ post } settings={ settings } /> ) }
			</div>
		);
	}
}

function mapStateToProps( { posts } ) {
	return { posts };
}

export default connect( mapStateToProps, { fetchPosts } )( PagesNew );
