// External Dependencies
import React from 'react';
import { initializeEditor } from '@frontkom/gutenberg';

import '@frontkom/gutenberg/build/css/core-blocks/style.css'; // blocks
import '@frontkom/gutenberg/build/css/style.css'; // componnets, editor, edit-post
import '@frontkom/gutenberg/build/css/core-blocks/edit-blocks.css'; // edit-blocks

class Editor extends React.Component {
	componentDidMount() {
		initializeEditor( 'editor', this.props.post, this.props.settings );
	}

	render() {
		return <div id="editor" className="gutenberg__editor"></div>;
	}
}

export default Editor;
