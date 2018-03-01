import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './gutenberg/build/blocks/build/style.css';
import './gutenberg/build/components/build/style.css';
import './gutenberg/build/blocks/build/edit-blocks.css';
import './gutenberg/build/editor/build/style.css';
import './gutenberg/build/edit-post/build/style.css';

import './index.css';

import { initializeEditor } from './gutenberg/build/edit-post';
import { registerCoreBlocks } from './gutenberg/build/blocks';

const post = {
	content: {},
	templates: '',
	title: { raw: 'Title post' },
	type: 'post'
};
const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Add a title here...'
};

registerCoreBlocks();
initializeEditor( 'editor', post, settings );

registerServiceWorker();
