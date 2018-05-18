// External Dependencies
import React from 'react';
import { initializeEditor } from '@frontkom/gutenberg';

import '@frontkom/gutenberg/dist/css/blocks/style.css'; // blocks
import '@frontkom/gutenberg/dist/css/blocks/edit-blocks.css'; // edit-blocks
import '@frontkom/gutenberg/dist/css/style.css'; // componnets, editor, edit-post

class GutenbergEditor extends React.Component {
	componentDidMount() {
		initializeEditor( 'editor', this.props.post, this.props.settings );
	}

	render() {
		return <div id="editor" className="gutenberg__editor"></div>;
	}
}

export default GutenbergEditor;
