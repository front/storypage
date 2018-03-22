import React from 'react';
import { Link } from 'react-router-dom';

import GutenbergEditor from '../gutenberg_editor';

class PagesNew extends React.Component {
	
	render() {
		const page = {
			content: { raw: '' },
			templates: '',
			title: { raw: '' },
			type: 'page'
		};
		
		return (
			<div>
				<h1>New page</h1>
				<p><Link to="/pages">Go back!</Link></p>
				
				<GutenbergEditor post={ page } />
			</div>
		)
	}
}


export default PagesNew;
