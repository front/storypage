/* eslint react/jsx-key: 0 */

// External Dependencies
import React from 'react';
import { i18n, editor } from '@frontkom/gutenberg-js';

import { defineCustomElements } from '@frontkom/cw-latest-news';
defineCustomElements(window);

// Web Component options
const solr =  'https://solrproxy.devz.no/solr/newsfront-computerworld';

// Editor elements
const { __ } = i18n;
const { InspectorControls, PlainText } = editor;

// Block attributes
const attrs = {
  tag: {
    type: 'string',
  },
  rows: {
    type: 'number',
  },
};

// Block name and settings
export const name = 'computerword/latest-news-wc';

export const settings = {
  title: __('CW Latest News (WebComp)'),
  description: __('Latest News from ComputerWorld'),
  icon: 'editor-table',

  category: 'cw',
  attributes: attrs,

  edit ({ className, attributes, setAttributes }) {
    const { tag, rows } = attributes;

    function updateTag (value) {
      const _tag = value && value.replace(/[^\w]/g, '-').toLowerCase();
      setAttributes({ tag: _tag });
    }
    function updateRows (value) {
      const _rows = parseInt(value.replace(/[^\d]/g, '')) || 0;
      setAttributes({ rows: _rows });
    }

    return [
      <InspectorControls>
        <hr />
        <div>
          <strong>Select a tag:</strong>
          <PlainText value={ tag } onChange={ updateTag } />
        </div>
        <br />
        <div>
          <strong>Number of articles:</strong>
          <PlainText value={ rows } onChange={ updateRows } />
        </div>
      </InspectorControls>,
      <div className={ className } onClick={ ev => ev.preventDefault() }>
        <cw-latest-news solr={ solr } rows={ rows } tag={ tag }></cw-latest-news>
      </div>,
    ];
  },

  save ({ className, attributes }) {
    const { tag, rows } = attributes;
    return (
      <div className={ className }>
        <cw-latest-news solr={ solr } rows={ rows } tag={ tag }></cw-latest-news>
      </div>
    );
  },
};
