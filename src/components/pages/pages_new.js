import React from 'react';
import { Link } from 'react-router-dom';

import GutenbergEditor from '../gutenberg_editor';

const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Add a title here...',
};

class PagesNew extends React.Component {
	render() {
		const page = {
			content: { raw: '' },
			templates: '',
			title: { raw: '' },
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
