// External Dependencies
import React from 'react';
import LatestNews from './LatestNews';

import { i18n } from '@frontkom/gutenberg-js';
const { __ } = i18n;


// Block attriutes
const attributes = {};

// Block name and settings
export const name = 'computerword/latest-news';

export const settings = {
  title: __('CW Latest News (React)'),
  description: __('Latest News from ComputerWorld'),
  icon: 'editor-table',

  category: 'cw',
  attributes,

  edit ({ className }) {
    return (
      <div className={ className }>
        <LatestNews edit={ true } />
      </div>
    );
  },

  save ({ className }) {
    return (
      <div className={ className }>
        <LatestNews edit={ false } />
      </div>
    );
  },
};
