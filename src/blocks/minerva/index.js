/**
 * External Dependencies
 */
import { filter } from 'lodash';
import { i18n, blocks, data } from '@frontkom/gutenberg-js';

/**
 * Internal Dependencies
 */
import * as articlePrimary from './article/primary';
import * as articleSecondary from './article/secondary';
import * as articleTertiary from './article/tertiary';
import * as podcastBox from './podcast-box';

const { __ } = i18n;
const { registerBlockType } = blocks;

const category = {
  slug: 'minerva',
  title: __('Minerva Blocks'),
};

export const initMinerva = () => {
  const currentCategories = filter(data.select('core/blocks').getCategories(), ({ slug }) => (slug !== category.slug));

  // registering Minerva Blocks category
  const categories = [
    category,
    ...currentCategories,
  ];

  data.dispatch('core/blocks').setCategories(categories);
	
  // registering Minerva Blocks
  [
    articlePrimary,
    articleSecondary,
    articleTertiary,
    podcastBox,
  ].forEach(({ name, settings }) => {
    registerBlockType(name, settings);
  });
};
