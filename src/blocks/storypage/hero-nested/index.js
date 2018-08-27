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
import image from './iphone.svg';

const { __ } = i18n;
const { PanelBody, BaseControl, RangeControl, IconButton } = components;
const { InnerBlocks, InspectorControls, PanelColor, MediaUpload } = editor;


const TEMPLATE = [
  ['core/heading', {
    placeholder: 'Hero title',
    content: 'Gutenberg for Drupal 8',
    level: 1,
  }],
  ['core/paragraph', {
    placeholder: 'Hero content',
    content: 'Thanks to open source, we are now reusing the same tools on multiple CMSs',
    customTextColor: '#ffffff',
    customFontSize: 20,
  }],
  ['core/button', {
    text: 'Read more',
    url: 'https://github.com/front/gutenberg-js',
    customTextColor: '#000000',
    customBackgroundColor: '#ffffff',
  }],
];


export const name = 'storypage/hero-nested';

export const settings = {
  title: __('Hero (Nested)'),
  icon: 'cover-image',
  category: 'storypage',

  attributes: {
    imageUrl: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
      default: image,
    },
    backgroundType: {
      type: 'string',
      default: 'color',
    },
    backgroundColor: {
      type: 'string',
      // default: '#2DB8CA',
    },
    backgroundImage: {
      type: 'string',
      default: 'https://placeimg.com/1200/600/nature/grayscale',
    },
    imageLayout: {
      type: 'string',
      default: 'right',
    },
    overlayOpacity: {
      type: 'number',
      default: 40,
    },
    contentWidth: {
      type: 'number',
      default: 960,
    },
  },

  description: __('Hero (Nested) Block'),

  edit ({ attributes, className, setAttributes }) {
    const {
      backgroundType, backgroundColor, backgroundImage, overlayOpacity,
      contentWidth, imageLayout, imageUrl,
    } = attributes;

    const containerStyle = {
      backgroundColor: imageLayout !== 'background' ? backgroundColor || '#2DB8CA' : 'transparent',
    };
    const imgBackgroundStyle = {
      backgroundImage: `url('${imageUrl}')`,
    };
    const imgOverlayStyle = {
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth > 480 ? `${contentWidth}px` : '100%',
    };

    const onSelectImage = media => {
      console.log('Selected', media);
      setAttributes({
        imageUrl: media.url,
      });
    };

    return [
      <div className={ `${className} layout-${imageLayout}` } style={ containerStyle }>
          <main>
            <InnerBlocks template={ TEMPLATE } templateLock={ false } />
          </main>
          { imageLayout !== 'background' && <span className="image-feature">
            <MediaUpload type="image"
              onSelect={ media => onSelectImage(media) } render={({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              ) }
            />
            <img src={ imageUrl } />
          </span> }
        </section>
      </div>,

      backgroundType === 'image' && <BlockControls>
        <Toolbar>
          <MediaUpload type="image"
            onSelect={ media => onSelectImage(media, 'backgroundImage') } render={ ({ open }) => (
              <IconButton className="components-toolbar__control" label={ __('Edit image') }
                icon="edit" onClick={ open } />
            ) }
          />
        </Toolbar>
      </BlockControls>,

      <InspectorControls>
        <PanelBody title={ __('Block Settings') }>
          <BaseControl label="Content Width">
            <input type="number" value={ contentWidth }
              onChange={ ev => setAttributes({ contentWidth: ev.target.value }) } />
          </BaseControl>

          {/* Image placement */}
          <BaseControl label="Image Placement">
            <select value={ imageLayout } onChange={ ev => setAttributes({ imageLayout: ev.target.value }) }>
              <option value="left">On the left</option>
              <option value="right">On the right</option>
              <option value="">No Image</option>
            </select>
          </BaseControl>

          {/* Background control */}
          <BaseControl label="Background Type">
            <select value={ backgroundType } onChange={ ev => setAttributes({ backgroundType: ev.target.value }) }>
              <option value="color">Solid Color</option>
              <option value="image">Image</option>
            </select>
          </BaseControl>
          { backgroundType === 'image' ?
            <RangeControl
              label={ __('Overlay Opacity') } value={ overlayOpacity }
              onChange={ value => setAttributes({ overlayOpacity: value }) }
              min={ 0 } max={ 100 } step={ 5 }
            /> :
            <PanelColor
              title={ __('Background Color') } colorValue={ backgroundColor } initialOpen={ false }
              onChange={ value => setAttributes({ backgroundColor: value }) }
            /> }
        </PanelBody>
      </InspectorControls>,
    ];
  },

  save ({ attributes, className }) {
    const {
      imageUrl, backgroundColor, imageLayout, overlayOpacity, contentWidth,
    } = attributes;

    const containerStyle = {
      backgroundColor: imageLayout !== 'background' ? backgroundColor : 'transparent',
    };
    const imgBackgroundStyle = {
      backgroundImage: `url('${imageUrl}')`,
    };
    const imgOverlayStyle = {
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth > 480 ? `${contentWidth}px` : '100%',
    };

    return (
      <div className={ `${className} layout-${imageLayout}` } style={ containerStyle }>
        { imageLayout === 'background' &&
          <span className="image-background" style={ imgBackgroundStyle } ><div style={ imgOverlayStyle } /></span> }
        <section style={ wrapperStyle }>
          <main>
            <InnerBlocks.Content />
          </main>
          { imageLayout !== 'background' && <span className="image-feature"><img src={ imageUrl } /></span> }
        </section>
      </div>
    );
  },
};
