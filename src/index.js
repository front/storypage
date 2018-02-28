import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './gutenberg/build/blocks/build/style.css';
import './gutenberg/build/components/build/style.css';
import './gutenberg/build/blocks/build/edit-blocks.css';
import './gutenberg/build/editor/build/style.css';
import './gutenberg/build/edit-post/build/style.css';

import { initializeEditor } from './gutenberg/build/edit-post';
import { registerCoreBlocks } from './gutenberg/build/blocks';

const post = {
	content: {},
	templates: '',
	title: { raw: 'Título do post AQUI' },
	type: 'post'
};
const settings = {
	alignWide: false,
	availableTemplates: [],
	blockTyoes: true,
	disableCustomColors: false,
	titlePlaceholder: 'Adicionar um titlo aqui!'
};

registerCoreBlocks();
initializeEditor( 'editor', post, settings );

registerServiceWorker();
