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
const { IconButton, Toolbar } = components;
const { MediaPlaceholder, MediaUpload } = editor;

export const name = 'storypage/vr-content';

export const settings = {
  title: __('VR content'),
  icon: 'cover-image',
  category: 'storypage',

  attributes: {
    url: {
      type: 'string',
    },
    id: {
      type: 'number',
    },
  },

  description: __('A-FRAME Virtual Reality'),

  edit ({ attributes, className, setAttributes }) {

    const onSelectImage = media => {
      if (! media || ! media.url) {
        setAttributes({ url: undefined, id: undefined });
        return;
      }

      setAttributes({ url: media.url, id: media.id });
    };

    const { id, url } = attributes;

    return (
      <div className={ className} style={ backgroundImageStyles(url) }>
        <Toolbar>
          <MediaUpload
            onSelect={ onSelectImage }
            type="image"
            value={ id }
            render={ ({ open }) => (
              <IconButton
                className="components-toolbar__control"
                label={ __('Edit image') }
                icon="edit"
                onClick={ open }
              />
            ) }
          />
        </Toolbar>

        { ! url &&
          <MediaPlaceholder
            icon="format-image"
            labels={ {
              title: __('VR content'),
              name: __('an image'),
            } }
            onSelect={ onSelectImage }
            accept="image/*"
            type="image"
          />
        }
      </div>
    );
  },

  save ({ attributes, className }) {
    const { url } = attributes;

    return (
      <div className={ className } style={ backgroundImageStyles(url) }></div>
    );
  },
};

export function backgroundImageStyles (url) {
  return url ?
    { backgroundImage: `url(${url})` } :
    {};
}
