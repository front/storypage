/**
 * External dependencies
 */
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const {
  InnerBlocks,
  RichText,
} = editor;

export const name = 'minerva/section';

export const settings = {
  title: __('Section'),
  icon: 'editor-table',
  description: __('Section by Minerva'),

  category: 'minerva',

  attributes: {
    title: {
      type: 'string',
      default: 'Mest lest',
    },
  },

  edit ({ attributes, className, setAttributes }) {
    const { title } = attributes;

    return (
      <div className={ className }>
        <div className="wp-block-minerva-section-content">
          <div className="minerva-section-title">
            <RichText
              tagName="span"
              value={ title }
              onChange={ value => setAttributes({ title: value }) }
              inlineToolbar
            />
          </div>
          <InnerBlocks />
        </div>
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title } = attributes;

    return (
      <div className={ className }>
        <div className="wp-block-minerva-section-content">
          <div className="minerva-section-title">
            <RichText.Content
              tagName="span"
              value={ title }
            />
          </div>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};
