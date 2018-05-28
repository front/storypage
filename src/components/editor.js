// External Dependencies
import React from 'react';
import { initializeEditor } from '@frontkom/gutenberg';

import coreBlocksStyle from '@frontkom/gutenberg/dist/css/core-blocks/style.css'; // blocks
import coreBlocksEditBlocksStyle from '@frontkom/gutenberg/dist/css/core-blocks/edit-blocks.css'; // edit-blocks
import style from '@frontkom/gutenberg/dist/css/style.css'; // componnets, editor, edit-post

class Editor extends React.Component {
	componentDidMount() {
		initializeEditor( 'editor', this.props.post, this.props.settings );
	}

	render() {
		return <div id="editor" className="gutenberg__editor"></div>;
	}
}

export default Editor;
