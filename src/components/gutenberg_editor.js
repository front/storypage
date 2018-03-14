import React from 'react';
import { createProvider } from 'react-redux';

import { reinitializeEditor } from './gutenberg/edit-post';

import { EditorProvider, ErrorBoundary } from './gutenberg/editor';
import Layout from './gutenberg/edit-post/components/layout';
import store from './gutenberg/edit-post/store';

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
	render() {
		const target = document.getElementById( 'editor' );
		const reboot = reinitializeEditor.bind( null, target, settings );
		const ReduxProvider = createProvider( 'edit-post' );

		return (
			<div className="gutenberg">
      			<div id="editor" className="gutenberg__editor">
      				<EditorProvider settings={ settings } post={ this.props.post }>
						<ErrorBoundary onError={ reboot }>
							<ReduxProvider store={ store }>
								<Layout />
							</ReduxProvider>
						</ErrorBoundary>
					</EditorProvider>
      			</div>
    		</div>
		);
	}
}

export default GutenbergEditor;












