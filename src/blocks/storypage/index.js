/**
 * External dependencies
 */
import { filter } from 'lodash';
import { i18n, blocks, data } from '@frontkom/gutenberg-js';

/**
 * Internal dependencies
 */
import * as post from './post';
import * as row from './row';
import * as section from './section';

const { __ } = i18n;
const { dispatch, select } = data;
const { registerBlockType } = blocks;

const category = {
  slug: 'storypage',
  title: __('StoryPage blocks'),
};

export const initStorypageBlocks = () => {
  const currentCategories = filter(select('core/blocks').getCategories(), ({ slug }) => (slug !== category.slug));

  const categories = [
    category,
    ...currentCategories,
  ];

  dispatch('core/blocks').setCategories(categories);

  // registering Minerva Blocks
  [
    post,
    row,
    section,
  ].forEach(({ name, settings }) => {
    registerBlockType(name, settings);
  });
};
