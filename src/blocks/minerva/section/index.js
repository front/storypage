/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
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
    },
    contentClass: {
      type: 'string',
    },
  },

  edit ({ attributes, className, setAttributes }) {
    const { title, contentClass } = attributes;

    const classes = classnames(
      className,
      'section'
    );

    return (
      <section className={ classes }>
        <InspectorControls>
          <PanelBody title={ __('Section Settings') }>
            <TextControl
              value={ title }
              label={ __('Title') }
              onChange={ value => setAttributes({ title: value }) }
            />
          </PanelBody>
        </InspectorControls>
        { title && <h1 className="section-title">
          <span className="inner">{ title }</span>
        </h1> }
        <div className={ contentClass }>
          <InnerBlocks />
        </div>
      </section>
    );
  },

  save ({ attributes, className }) {
    const { title, contentClass } = attributes;

    const classes = classnames(
      className,
      'section'
    );

    return (
      <section className={ classes }>
        { title && <h1 className="section-title">
          <span className="inner">{ title }</span>
        </h1> }
        <div className={ contentClass }>
          <InnerBlocks.Content />
        </div>
      </section>
    );
  },
};
