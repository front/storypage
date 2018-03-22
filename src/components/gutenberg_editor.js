import React from 'react';
// import { createProvider } from 'react-redux';

// import { reinitializeEditor } from '@wordpress/edit-post';

// import { registerBlockType } from '@wordpress/blocks/api/registration';

// import { EditorProvider, ErrorBoundary } from '@wordpress/editor';
// import Layout from '@wordpress/edit-post/components/layout';
// import store from '@wordpress/edit-post/store';

import { initializeEditor } from 'gutenberg';

const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Add a title here...'
};

const wpApiSettings = {};

class GutenbergEditor extends React.Component {
	componentDidMount() {
		initializeEditor( "editor", this.props.post, settings );
	}

	render() {
		// const target = document.getElementById( 'editor' );
		// const reboot = reinitializeEditor.bind( null, target, settings );
		// const ReduxProvider = createProvider( 'edit-post' );

		return (
			<div className="gutenberg">
				<div id="editor" className="gutenberg__editor">
					{ /* <EditorProvider settings={ settings } post={ this.props.post }>
						<ErrorBoundary onError={ reboot }>
							<ReduxProvider store={ store }>
								<Layout />
							</ReduxProvider>
						</ErrorBoundary>
					</EditorProvider> */ }
				</div>
			</div>
		);
	}
}

export default GutenbergEditor;
