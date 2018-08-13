/* eslint react/jsx-key: 0 */

// External Dependencies
import React from 'react';
import { i18n, editor, components } from '@frontkom/gutenberg-js';

import { defineCustomElements } from '@frontkom/cw-latest-news';
defineCustomElements(window);

// Web Component options
const solr =  'https://solrproxy.devz.no/solr/newsfront-computerworld';

// Editor elements
const { __ } = i18n;
const { InspectorControls } = editor;
const { PanelBody } = components;

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

    function updateTag (ev) {
      const value = ev.target.value;
      const _tag = value && value.replace(/[^\w]/g, '-').toLowerCase();
      setAttributes({ tag: _tag });
    }
    function updateRows (ev) {
      const value = ev.target.value;
      const _rows = parseInt(value.replace(/[^\d]/g, '')) || 0;
      setAttributes({ rows: _rows });
    }

    return (
      <div>
        <InspectorControls>
          <PanelBody title={ __('Latest News Settings') }>
            <strong>Select a tag:</strong>
            <input type="text" value={ tag } onChange={ updateTag } />
            <br /><br />
            <strong>Number of articles:</strong>
            <input type="text" value={ rows } onChange={ updateRows } />
          </PanelBody>
        </InspectorControls>
        <div className={ className } onClick={ ev => ev.preventDefault() }>
          <cw-latest-news solr={ solr } rows={ rows } tag={ tag }></cw-latest-news>
        </div>
      </div>
    );
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
