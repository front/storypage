// External dependences
import React from 'react';
import { Link } from 'react-router-dom';

// Internal dependences
import GutenbergEditor from '../gutenberg_editor';

// make templates dynamic
const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Add a title here...',
	template: [ 
		[ 'rows/col4-col4-col4', { }, [ 
			[ 'dynamic/article', { layout: 'column-1' } ],
			[ 'dynamic/article', { layout: 'column-2' } ],
			[ 'dynamic/article', { layout: 'column-3' } ],
		] ],		
		[ 'rows/col4-col4-col4', { }, [ 
			[ 'dynamic/article', { layout: 'column-1' } ],
			[ 'dynamic/article', { layout: 'column-2' } ],
			[ 'dynamic/article', { layout: 'column-3' } ],
		] ],
		// [ 'rows/col4-col4-col4' ],
	],
};

class PagesNew extends React.Component {
	render() {
		const page = {
			content: { raw: '' },
			title: { raw: 'A new page' },
			type: 'page',
		};

		return (
			<div>
				<h1>New page</h1>
				<p><Link to="/pages">Go back!</Link></p>

				<GutenbergEditor post={ page } settings={ settings } />
			</div>
		);
	}
}

export default PagesNew;
