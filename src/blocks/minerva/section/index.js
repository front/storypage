/**
 * External dependencies
 */
import React from 'react';
import {
  i18n,
  components,
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
  InspectorControls,
} = editor;
const {
  PanelBody,
  TextControl,
} = components;

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
        <InspectorControls>
          <PanelBody title={ __('Section Settings') }>
            <TextControl
              value={ title }
              label={ __('Last episode URL') }
              onChange={ value => setAttributes({ title: value }) }
            />
          </PanelBody>
        </InspectorControls>
        <div className="wp-block-minerva-section-content">
          <div className="minerva-section-title">
            <span>{ title }</span>
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
            <span>{ title }</span>
          </div>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
};
