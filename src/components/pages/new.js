// External Dependencies
import React from 'react';
import { isEmpty, map } from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Internal Dependencies
import { fetchArticles } from '../../store/actions';
import GutenbergEditor from '../gutenberg_editor';

class PagesNew extends React.Component {
	componentWillMount() {
		this.props.fetchArticles( { order: 'desc', orderBy: 'date' } );
	}

	render() {
		// TODO orderBy on action side
		const articles = map( this.props.articles );

		const template = isEmpty( articles ) ? [ ] : [
			[ 'rows/col4-col4-col4', { }, [ 
				[ 'dynamic/article', { 
					layout: 'column-1',
					title: [ articles[ 0 ].title.rendered ],
					url: [ articles[ 0 ].image_url ],
				} ],
				[ 'dynamic/article', { 
					layout: 'column-2',
					title: [ articles[ 1 ].title.rendered ],
					url: [ articles[ 1 ].image_url ],
				} ],
				[ 'dynamic/article', { 
					layout: 'column-3',
					title: [ articles[ 2 ].title.rendered ],
					url: [ articles[ 2 ].image_url ],
				} ],
			] ],		
			[ 'rows/col4-col4-col4', { }, [ 
				[ 'dynamic/article', { 
					layout: 'column-1',
					title: [ articles[ 3 ].title.rendered ],
					url: [ articles[ 3 ].image_url ],
				} ],
				[ 'dynamic/article', { 
					layout: 'column-2',
					title: [ articles[ 4 ].title.rendered ],
					url: [ articles[ 4 ].image_url ],
				} ],
				[ 'dynamic/article', { 
					layout: 'column-3',
					title: [ articles[ 5 ].title.rendered ],
					url: [ articles[ 5 ].image_url ],
				} ],
			] ],
		];

		// const template = [];

		const page = {
			content: { raw: '' },
			title: { raw: 'A new page' },
			type: 'page',
		};

		// make templates dynamic
		const settings = {
			alignWide: false,
			availableTemplates: [],
			blockTyoes: true,
			disableCustomColors: false,
			titlePlaceholder: 'Add a title here...',
			template,
		};

		return (
			<div>
				<h1 
					style={ { margin: 0, height: '32px' } }>
					Editor! <small><Link to="/pages">Go back!</Link></small>
				</h1>

				{ ( ! isEmpty( articles ) && <GutenbergEditor post={ page } settings={ settings } /> ) }
			</div>
		);
	}
}

function mapStateToProps( { articles } ) {
	return { articles };
}

export default connect( mapStateToProps, { fetchArticles } )( PagesNew );
