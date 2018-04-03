// External dependences
import React from 'react';
import { isEmpty, map, orderBy } from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Internal dependences
import { fetchArticles } from '../../store/actions';
import GutenbergEditor from '../gutenberg_editor';

class PagesNew extends React.Component {
	componentWillMount() {
		this.props.fetchArticles();
	}

	render() {
		// TODO orderBy on action side
		const articles = orderBy( map( this.props.articles ), [ 'id' ], [ 'desc' ] );

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
				<h1>New page</h1>
				<p><Link to="/pages">Go back!</Link></p>

				{ ( ! isEmpty( articles ) && <GutenbergEditor post={ page } settings={ settings } /> ) }
			</div>
		);
	}
}

function mapStateToProps( { articles } ) {
	return { articles };
}

export default connect( mapStateToProps, { fetchArticles } )( PagesNew );
