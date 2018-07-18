// External Dependencies
import React from 'react';

import {
  blocks,
  data,
  editPost,
  plugins,
  lib,
} from '@frontkom/gutenberg-js';

import '@frontkom/gutenberg-js/build/css/core-blocks/style.css'; 		// blocks
import '@frontkom/gutenberg-js/build/css/style.css';					// components, editor, edit-post
import '@frontkom/gutenberg-js/build/css/core-blocks/theme.css'; 		// theme
import '@frontkom/gutenberg-js/build/css/core-blocks/edit-blocks.css';  // edit-blocks

// Internal Dependencies
import { initMinerva, template as templateMinerva } from '../blocks/minerva';
import { initComputerworld } from '../blocks/computerworld';

class Editor extends React.Component {
  componentDidMount () {
    const { type, id } = this.props.post;
    const overridePost = {};
    const template = this.props.template === 'minerva' ? templateMinerva : '';

    // Registering Lib Blocks
    blocks.registerBlockType(lib.blocks.post.name, lib.blocks.post.settings);
    blocks.registerBlockType(lib.blocks.section.name, lib.blocks.section.settings);
    blocks.registerBlockType(lib.blocks.row.name, lib.blocks.row.settings);

    initMinerva();
    initComputerworld();

    // PluginDocumentSidebarPanel
    const { PluginDocumentSidebarPanel } = editPost;
    const { PostsPanel/* , TemplateSettingsPanel*/ } = lib.components;

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
    plugins.registerPlugin('plugin-document-sidebar', {
      render: MyPluginDocumentSidebarPanel,
    });

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Initializing Editor
    editPost.initializeEditor('editor', type, id,  { ...this.props.settings, template }, overridePost);

    // Setting Storypage/Section as default block
    // data.dispatch( 'core/blocks' ).setDefaultBlockName( 'storypage/section' );
  }

  componentWillUnmount () {
    // Unregistering blocks
    const registeredBlocks = data.select('core/blocks').getBlockTypes();

    if (registeredBlocks) {
      registeredBlocks.forEach(({ name }) => {
        blocks.unregisterBlockType(name);
      });
    }

    // Unregistering plugins
    const registeredPlugins = plugins.getPlugins();

    if (registeredPlugins) {
      registeredPlugins.forEach(({ name }) => {
        plugins.unregisterPlugin(name);
      });
    }
  }

  render () {
    return <div id="editor" className="gutenberg__editor"></div>;
  }
}

export default Editor;
