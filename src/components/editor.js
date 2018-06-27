// External Dependencies
import React from 'react';
import {
	blocks,
	components,
	data,
	editPost,
	// editor,
	plugins,
	storypage,
} from '@frontkom/gutenberg';

import '@frontkom/gutenberg/build/css/core-blocks/style.css'; // blocks
import '@frontkom/gutenberg/build/css/style.css'; // components, editor, edit-post
import '@frontkom/gutenberg/build/css/core-blocks/edit-blocks.css'; // edit-blocks
import '@frontkom/gutenberg/build/css/core-blocks/theme.css'; // edit-blocks

class Editor extends React.Component {
	componentDidMount() {
		const { type, id } = this.props.post;
		const overridePost = {};

		// Registering Blocks
		// const blockStyle = { backgroundColor: '#900', color: '#fff', padding: '20px' };

		// step 1
		/*blocks.registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-01', {
		    title: 'Hello World (Step 1)',
		    icon: 'universal-access-alt',
		    category: 'layout',
		    edit() {
		        return <p style={ blockStyle }>Hello editor.</p>;
		    },

		    save() {
		        return <p style={ blockStyle }>Hello saved content.</p>;
		    },
		} );*/

		// step 2
		/*blocks.registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-02', {
		    title: 'Hello World (Step 2)',

		    icon: 'universal-access-alt',

		    category: 'hello',

		    edit( { className } ) {
		        return <p className={ className }>Hello editor.</p>;
		    },

		    save( { className } ) {
		        return <p className={ className }>Hello saved content.</p>;
		    },
		} );

		// step 3
		blocks.registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-03', {
		    title: 'Hello World (Step 3)',

		    icon: 'universal-access-alt',

		    category: 'layout',

		    attributes: {
		        content: {
		            type: 'array',
		            source: 'children',
		            selector: 'p',
		        },
		    },

		    edit( { attributes, className, setAttributes } ) {
		        const { content } = attributes;

		        function onChangeContent( newContent ) {
		            setAttributes( { content: newContent } );
		        }

		        return (
		            <RichText
		                tagName="p"
		                className={ className }
		                onChange={ onChangeContent }
		                value={ content }
		            />
		        );
		    },

		    save( { attributes, className } ) {
		        const { content } = attributes;

		        return (
		            <RichText.Content tagName="p" className={ className } value={ content } />
		        );
		    },
		} );

		const { RichText, BlockControls, AlignmentToolbar } = editor;
		BlockControls
		// step 4
		blocks.registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-04', {
		    title: 'Hello World (Step 4)',

		    icon: 'universal-access-alt',

		    category: 'layout',

		    attributes: {
		        content: {
		            type: 'array',
		            source: 'children',
		            selector: 'p',
		        },
		        alignment: {
		            type: 'string',
		        },
		    },

		    edit( { attributes, className, setAttributes } ) {
		        const { content, alignment } = attributes;

		        function onChangeContent( newContent ) {
		            setAttributes( { content: newContent } );
		        }

		        function onChangeAlignment( newAlignment ) {
		            setAttributes( { alignment: newAlignment } );
		        }

		        return [
		            <BlockControls>
		                <AlignmentToolbar
		                    value={ alignment }
		                    onChange={ onChangeAlignment }
		                />
		            </BlockControls>,
		            <RichText
		                tagName="p"
		                className={ className }
		                style={ { textAlign: alignment } }
		                onChange={ onChangeContent }
		                value={ content }
		            />
		        ];
		    },

		    save( { attributes, className } ) {
		        const { content, alignment } = attributes;

		        return (
		            <RichText.Content
		                className={ className }
		                style={ { textAlign: alignment } }
		                value={ content }
		            />
		        );
		    },
		} );*/

		blocks.registerBlockType( storypage.blocks.post.name, storypage.blocks.post.settings );
		blocks.registerBlockType( storypage.blocks.section.name, storypage.blocks.section.settings );
		blocks.registerBlockType( storypage.blocks.row.name, storypage.blocks.row.settings );

		// Sidebar Plugin
		const { PluginSidebarMoreMenuItem, PluginSidebar } = editPost;
		const { PanelBody } = components;

		const MyPluginSidebar = () => (
			<React.Fragment>
				<PluginSidebarMoreMenuItem
					target="sidebar-name"
				>
					Extra stuff here
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="sidebar-name"
					title="Extra stuff here"
					icon="smiley"
				>
					<PanelBody>
						My Content of the sidebar
					</PanelBody>
				</PluginSidebar>
			</React.Fragment>
		);

		plugins.registerPlugin( 'plugin-name', {
			icon: 'smiley',
			render: MyPluginSidebar,
		} );

		// PluginDocumentSidebarPanel
		const { PluginDocumentSidebarPanel } = editPost;
		const { PostsPanel, TemplateSettingsPanel } = storypage.components;

		const MyPluginDocumentSidebarPanel = () => {
			return (
				<React.Fragment>
					<PluginDocumentSidebarPanel
						className="my-plugin-post-publish-panel"
						title={ 'My Stories' }
						initialOpen={ true }
					>
						<PostsPanel />		        
					</PluginDocumentSidebarPanel>
					<PluginDocumentSidebarPanel
						className="my-plugin-post-publish-panel"
						title={ 'Template Settings' }
						initialOpen={ false }
					>
						<TemplateSettingsPanel />
					</PluginDocumentSidebarPanel>
				</React.Fragment>
			);
		};

		plugins.registerPlugin( 'plugin-document-sidebar', {
			// icon: 'smiley',
			render: MyPluginDocumentSidebarPanel,
		} );

		// rewriting actions
		
		// const { registerActions, dispatch, subscribe } = data;
		// console.log( 'data', data );
		// const actions = dispatch( 'core/editor' );

		// console.log( 'actions', actions );

		// // const { removeBlocks } = dispatch( 'core/editor' );

		// console.log( 'a dispatch', dispatch( 'core/editor' ) );
		// // console.log( 'removeBlocks', removeBlocks );

		// registerActions( 'core/editor', { });
		// console.log( 'b dispatch', dispatch( 'core/editor' ) );

		// registerActions( 'core/editor', {
		//  	...actions,
		//  	// removeBlocks: ( uids, selectPrevious = true ) => {
		//  	// 	console.log( 'removeBlocks' );

		//  	// 	return removeBlocks( uids, selectPrevious );
		//  	// },
		// } );

		// console.log( 'c dispatch', dispatch( 'core/editor' ) );
		//
		//
		/*const { Store } = editor;
		console.log( Store );
		const unsubscribe = Store.default.subscribe( ( ) => {
			console.log( 'subscribe' ); 
			console.log( 'store.getState()', Store.default.getState() );
			// You could use this opportunity to test whether the derived result of a
			// selector has subsequently changed as the result of a state update.
		} );*/

		// Later, if necessary...
		// unsubscribe();

		editPost.initializeEditor( 'editor', type, id, this.props.settings, overridePost );

		data.dispatch( 'core/blocks' ).setDefaultBlockName( 'storypage/section' );
	}

	componentWillUnmount() {
		// Unregister blocks and plugins
		const registeredBlocks = data.select( 'core/blocks' ).getBlockTypes();

		if ( registeredBlocks ) {
			registeredBlocks.forEach( ( { name } ) => {
				blocks.unregisterBlockType( name );
			} );
		}

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
