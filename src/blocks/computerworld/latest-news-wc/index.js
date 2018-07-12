// External Dependencies
import React from 'react';
import { i18n } from '@frontkom/gutenberg-js';
const { __ } = i18n;

import { defineCustomElements } from '@frontkom/cw-latest-news';
defineCustomElements(window);

// Web Component options
const options = {
  solr: 'https://solrproxy.devz.no/solr/newsfront-computerworld',
  tag: 'business-intelligence',
  rows: 4,
};


// Block attriutes
const attributes = {};

// Block name and settings
export const name = 'computerword/latest-news-wc';

export const settings = {
  title: __('CW Latest News (WebComp)'),
  description: __('Latest News from ComputerWorld'),
  icon: 'editor-table',

  category: 'cw',
  attributes,

  edit ({ className }) {
    return (
      <div className={ className }>
        <cw-latest-news { ...options } ></cw-latest-news>
      </div>
    );
  },

  save ({ className }) {
    return (
      <div className={ className }>
        <cw-latest-news { ...options } ></cw-latest-news>
      </div>
    );
  },
};
