// External Dependencies
import React from 'react';
import { initializeEditor } from '@frontkom/gutenberg';

import '@frontkom/gutenberg/dist/blocks/style.css'; // blocks
import '@frontkom/gutenberg/dist/blocks/edit-blocks.css'; // edit-blocks
import '@frontkom/gutenberg/dist/style.css'; // componnets, editor, edit-post

class GutenbergEditor extends React.Component {
	componentDidMount() {
		initializeEditor( 'editor', this.props.post, this.props.settings );
	}

	render() {
		return (
			<div className="gutenberg">
				<div id="editor" className="gutenberg__editor"></div>
			</div>
		);
	}
}

export default GutenbergEditor;
