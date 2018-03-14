import React from 'react';

import { initializeEditor } from './gutenberg/edit-post';

// Gutenberg style
import './gutenberg/blocks/build/style.css';
import './gutenberg/components/build/style.css';
import './gutenberg/blocks/build/edit-blocks.css';
import './gutenberg/editor/build/style.css';
import './gutenberg/edit-post/build/style.css';

const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Add a title here...'
};

class GutenbergEditor extends React.Component {
	componentDidMount() {
		initializeEditor( 'editor', this.props.post, settings );
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












