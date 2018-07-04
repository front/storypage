// External Dependencies
import React from 'react';
import {
	blocks,
	data,
	editPost,
	plugins,
	storypage,
} from '@frontkom/gutenberg';

import '@frontkom/gutenberg/build/css/core-blocks/style.css'; 		// blocks
import '@frontkom/gutenberg/build/css/style.css';					// components, editor, edit-post
import '@frontkom/gutenberg/build/css/core-blocks/theme.css'; 		// theme
import '@frontkom/gutenberg/build/css/core-blocks/edit-blocks.css'; // edit-blocks

// Internal Dependencies
import { initMinerva } from '../blocks/minerva';

class Editor extends React.Component {
	componentDidMount() {
		const { type, id } = this.props.post;
		const overridePost = {};

		// Registering Storypage Blocks
		blocks.registerBlockType( storypage.blocks.post.name, storypage.blocks.post.settings );
		blocks.registerBlockType( storypage.blocks.section.name, storypage.blocks.section.settings );
		blocks.registerBlockType( storypage.blocks.row.name, storypage.blocks.row.settings );

		initMinerva();

		// PluginDocumentSidebarPanel
		const { PluginDocumentSidebarPanel } = editPost;
		const { PostsPanel/*, TemplateSettingsPanel*/ } = storypage.components;

		const MyPluginDocumentSidebarPanel = () => {
			return (
				<PluginDocumentSidebarPanel
					title={ 'My Stories' }
					initialOpen={ true }
				>
					<PostsPanel />		        
				</PluginDocumentSidebarPanel>
			);
		};

		// Registering MyPluginDocumentSidebarPanel Plugin
		plugins.registerPlugin( 'plugin-document-sidebar', {
			render: MyPluginDocumentSidebarPanel,
		} );

		// Initializing Editor
		editPost.initializeEditor( 'editor', type, id, this.props.settings, overridePost );

		// Setting Storypage/Section as default block
		// data.dispatch( 'core/blocks' ).setDefaultBlockName( 'storypage/section' );
	}

	componentWillUnmount() {
		//TO DO: check unregitering console error!
		
		// Unregistering blocks
		const registeredBlocks = data.select( 'core/blocks' ).getBlockTypes();

		if ( registeredBlocks ) {
			registeredBlocks.forEach( ( { name } ) => {
				blocks.unregisterBlockType( name );
			} );
		}

		// Unregistering plugins
		const registeredPlugins = plugins.getPlugins();

		if ( registeredPlugins ) {
			registeredPlugins.forEach( plugin => {
				plugins.unregisterPlugin( plugin.name );
			} );
		}
	}

	render() {
		return <div id="editor" className="gutenberg__editor"></div>;
	}
}

export default Editor;
