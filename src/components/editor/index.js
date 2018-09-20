// External Dependencies
import React from 'react';
import { connect } from 'react-redux';
// import { filter } from 'lodash';

import {
  blocks,
  data,
  editPost,
  plugins,
} from '@frontkom/gutenberg-js';

// Gutenberg JS Style
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css'; // components and edit-post
import '@frontkom/gutenberg-js/build/css/nux/style.css';
import '@frontkom/gutenberg-js/build/css/editor/style.css';
import '@frontkom/gutenberg-js/build/css/block-library/theme.css';
import '@frontkom/gutenberg-js/build/css/block-library/edit-blocks.css';
import '@frontkom/gutenberg-js/build/css/list-reusable-blocks/style.css';

// Internal Dependencies
// import { initStorypageBlocks } from '../../blocks/storypage';
// import { initMinerva, template as templateMinerva } from '../../blocks/minerva';
// import { initComputerworld } from '../../blocks/computerworld';
import '../../blocks/external';

import { fetchPosts } from '../../store/actions';
import { getPosts } from '../../store/selectors';

// import PostsPanel from './sidebar/posts-panel';

class Editor extends React.Component {
  initEditor (template) {
    const { type, id } = this.props.post;
    const overridePost = {};

    // initComputerworld();
    // initMinerva();
    // initStorypageBlocks();

    // PluginDocumentSidebarPanel
    // const { PluginDocumentSidebarPanel } = editPost;

    // const MyPluginDocumentSidebarPanel = () => {
    //   return (
    //     <PluginDocumentSidebarPanel
    //       title={ 'My Stories' }
    //       initialOpen={ true }
    //     >
    //       <PostsPanel />
    //     </PluginDocumentSidebarPanel>
    //   );
    // };

    // // Registering MyPluginDocumentSidebarPanel Plugin
    // plugins.registerPlugin('plugin-document-sidebar', {
    //   render: MyPluginDocumentSidebarPanel,
    // });

    // Disable tips
    data.dispatch('core/nux').disableTips();

    // Removing inline elements
    const inlineElements = data.select('core/editor').getTokenSettings();
    if (inlineElements) {
      for (const elem in inlineElements) {
        data.dispatch('core/editor').unregisterToken(elem);
      }
    }

    // Initializing Editor
    editPost.initializeEditor('editor', type, id,  { ...this.props.settings, template }, overridePost);

    // Setting Storypage/Section as default block
    // data.dispatch( 'core/blocks' ).setDefaultBlockName( 'storypage/section' );

    // Remove unused catgories
    /* const categories = filter(data.select('core/blocks').getCategories(), ({ slug }) => {
      return slug !== 'widgets' && slug !== 'embed';
    });
    data.dispatch('core/blocks').setCategories(categories);

    const registeredBlocks = data.select('core/blocks').getBlockTypes();

    if (registeredBlocks) {
      registeredBlocks.forEach(({ name }) => {

        if (blocks.category === 'widgets' || blocks.category === 'embed') {
          blocks.unregisterBlockType(name);
        }
      });
    } */
  }

  componentDidMount () {
    const { template } = this.props;

    if (template === 'minerva') {
      this.props.fetchPosts({ type: 'post' });
    }
    else {
      this.initEditor(template);
    }
  }

  componentDidUpdate (prevProps) {
    const { template } = this.props;

    if (template === 'minerva') {
      if (prevProps.props !== this.props.posts) {
        // template = templateMinerva(this.props.posts);
        this.initEditor(template);
      }
    }
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

function mapStateToProps (state) {
  return { posts: getPosts(state) };
}

export default connect(mapStateToProps, { fetchPosts })(Editor);
