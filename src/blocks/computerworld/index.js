/**
 * External Dependencies
 */
import { filter } from 'lodash';
import { i18n, blocks, data } from '@frontkom/gutenberg-js';

/**
 * Internal Dependencies
 */
import * as article from './article';
import * as advert from './advert';
import * as latestNews from './latest-news';
import * as latestNewsWebComp from './latest-news-wc';

const { __ } = i18n;
const { registerBlockType } = blocks;

const category = {
  slug: 'cw',
  title: __('Cw Blocks'),
};

export const initComputerworld = () => {
  const currentCategories = filter(data.select('core/blocks').getCategories(), ({ slug }) => (slug !== category.slug));

  // Append the CW blocks to the categories
  const categories = [
    category,
    ...currentCategories,
  ];
  data.dispatch('core/blocks').setCategories(categories);

  // registering CW Blocks
  [
    article,
    advert,
    latestNews,
    latestNewsWebComp,
  ]
  .forEach(({ name, settings }) => {
    registerBlockType(name, settings);
  });
};
