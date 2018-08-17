/* eslint react/jsx-key: 0 */

/**
 * External dependencies
 */
import React from 'react';
import { i18n, components, editor } from '@frontkom/gutenberg-js';

/**
 * Internal dependencies
 */
import './style.scss';

const { __ } = i18n;
// const { IconButton, Toolbar } = components;
const { RichText } = editor;

export const name = 'storypage/hero';

export const settings = {
  title: __('Hero'),
  icon: 'cover-image',
  category: 'storypage',

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: 'h2',
      default: 'Gutenberg for Drupal 8',
    },
    teaser: {
      type: 'array',
      source: 'children',
      selector: 'p',
      default: 'Thanks to open source, we are now reusing the same tools on multiple CMSs',
    },
    image: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    },
    bgColor: {
      type: 'string',
      default: '#2db8ca',
    },
  },

  description: __('Hero Section'),

  edit ({ attributes, className, setAttributes, isSelected }) {

    const { title, teaser, image, bgColor } = attributes;
    const style = {
      backgroundColor: bgColor,
    };

    // const onSelectImage = media => {
    //   setAttributes({
    //     mediaURL: media.url,
    //     mediaID: media.id,
    //   });
    // };

    return [
      <div className={ className } style={ style }>
        <div className="content">
          <figure><img src={ image } /></figure>
          <RichText
            tagName="h2"
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
            inlineToolbar
          />
          <RichText
            tagName="p"
            className="teaser"
            value={ teaser }
            onChange={ value => setAttributes({ teaser: value }) }
            inlineToolbar
          />
          <footer>
            <button>Learn more</button>
            <button>Download</button>
          </footer>
        </div>
      </div>,
      // isSelected && <Toolbar>
      //   <MediaUpload
      //     onSelect={ onSelectImage }
      //     type="image"
      //     value={ id }
      //     render={ ({ open }) => (
      //       <IconButton
      //         className="components-toolbar__control"
      //         label={ __('Edit image') }
      //         icon="edit"
      //         onClick={ open }
      //       />
      //     ) }
      //   />
      // </Toolbar>,
    ];
  },

  save ({ attributes, className }) {
    const { title, teaser, image, bgColor } = attributes;
    const style = {
      backgroundColor: bgColor,
    };

    return (
      <div className={ className } style={ style }>
        <div className="content">
          <figure><img src={ image } /></figure>
          <h2>{ title }</h2>
          <p>{ teaser }</p>
          <footer>
            <button>Learn more</button>
            <button>Download</button>
          </footer>
        </div>
      </div>
    );
  },
};
