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
const { PanelBody, BaseControl, FontSizePicker, RangeControl, IconButton } = components;
const { RichText, InspectorControls, PanelColor, MediaUpload } = editor;


const TITLE_FONT_SIZES = [
  { name: 'small',    shortName: 'S',   size: 28 },
  { name: 'regular',  shortName: 'M',   size: 40 },
  { name: 'large',    shortName: 'L',   size: 56 },
  { name: 'larger',   shortName: 'XL',  size: 72 },
];
const TEXT_FONT_SIZES = [
  { name: 'small',    shortName: 'S',   size: 14 },
  { name: 'regular',  shortName: 'M',   size: 16 },
  { name: 'large',    shortName: 'L',   size: 20 },
  { name: 'larger',   shortName: 'XL',  size: 26 },
];
const CTA_FONT_SIZES = [
  { name: 'small',    shortName: 'S',   size: 14 },
  { name: 'regular',  shortName: 'M',   size: 16 },
  { name: 'large',    shortName: 'L',   size: 20 },
  { name: 'larger',   shortName: 'XL',  size: 24 },
];


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
    imageUrl: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
      default: image,
    },
    backgroundColor: {
      type: 'string',
      default: '#2DB8CA',
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
    titleFontSize: {
      type: 'number',
      default: 56,
    },
    titleColor: {
      type: 'string',
      default: '#FFFFFF',
    },
    textFontSize: {
      type: 'number',
      default: 20,
    },
    textColor: {
      type: 'string',
      default: '#FFFFFF',
    },
    ctaFontSize: {
      type: 'number',
      default: 16,
    },
    ctaColor: {
      type: 'string',
      default: '#FFFFFF',
    },
    button1Text: {
      type: 'string',
      default: 'Learn more',
    },
    button2Text: {
      type: 'string',
      default: 'Download',
    },
  },

  description: __('Hero Block'),

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, imageUrl, backgroundColor, button1Text, button2Text,
      imageLayout, overlayOpacity, contentWidth,
      titleFontSize, titleColor, textFontSize, textColor, ctaFontSize, ctaColor,
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
    const titleStyle = {
      fontSize: `${titleFontSize || 56}px`,
      color: titleColor || 'white',
    };
    const textStyle = {
      fontSize: `${textFontSize || 20}px`,
      color: textColor || 'white',
    };
    const ctaStyle = {
      fontSize: `${ctaFontSize || 16}px`,
      color: ctaColor || 'white',
      borderColor:  ctaColor || 'white',
    };

    const onSelectImage = media => {
      console.log('Selected', media);
      setAttributes({
        // mediaURL: media.url,
        // mediaID: media.id,
        imageUrl: media.url,
      });
    };

    return [
      <div className={ `${className} layout-${imageLayout}` } style={ containerStyle }>
        { imageLayout === 'background' &&
          <span className="image-background" style={ imgBackgroundStyle } ><div style={ imgOverlayStyle } /></span> }
        <section style={ wrapperStyle }>
          { imageLayout === 'background' &&
            <MediaUpload type="image"
              onSelect={ media => onSelectImage(media) } render={ ({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              ) }
            />
          }
          <header>
            <RichText
              tagName="h2" value={ title } style={ titleStyle }
              onChange={ value => setAttributes({ title: value }) }
              inlineToolbar
            />
            <RichText
              tagName="p" className="teaser" value={ teaser } style={ textStyle }
              onChange={ value => setAttributes({ teaser: value }) }
              inlineToolbar
            />
          </header>
          <footer>
            <button style={ ctaStyle }>{ button1Text }</button>
            <button style={ ctaStyle }>{ button2Text }</button>
          </footer>
          { imageLayout !== 'background' && <span className="image-feature">
            <MediaUpload type="image"
              onSelect={ media => onSelectImage(media) } render={({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              )}
            />
            <img src={ imageUrl } />
          </span> }
        </section>
      </div>,
      <InspectorControls>
        <PanelBody title={ __('Block Settings') }>
          <BaseControl label="Content Width">
            <input type="number" value={ contentWidth }
              onChange={ ev => setAttributes({ contentWidth: ev.target.value }) } />
          </BaseControl>
          <BaseControl label="Image Placement">
            <select value={ imageLayout } onChange={ ev => setAttributes({ imageLayout: ev.target.value }) }>
              <option value="left">On the left</option>
              <option value="right">On the right</option>
              <option value="background">Background</option>
            </select>
          </BaseControl>
          { imageLayout === 'background' ?
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

        <PanelBody title={ __('Title Settings') }>
          <FontSizePicker
            fontSizes={ TITLE_FONT_SIZES } fallbackFontSize={ 56 } value={ titleFontSize }
            onChange={ value => setAttributes({ titleFontSize: value }) }
          />
          <PanelColor
            colorValue={ titleColor } initialOpen={ false } title={ __('Title Color') }
            onChange={ value => setAttributes({ titleColor: value }) }
          />
        </PanelBody>
        <PanelBody title={ __('Text Settings') }>
          <FontSizePicker
            fontSizes={ TEXT_FONT_SIZES } fallbackFontSize={ 20 } value={ textFontSize }
            onChange={ value => setAttributes({ textFontSize: value }) }
          />
          <PanelColor
            colorValue={ textColor } initialOpen={ false } title={ __('Text Color') }
            onChange={ value => setAttributes({ textColor: value }) }
          />
        </PanelBody>
        <PanelBody title={ __('CTA Settings') }>
          <BaseControl label="Button 1 Text">
            <input type="text" value={ button1Text }
              onChange={ ev => setAttributes({ button1Text: ev.target.value }) } />
          </BaseControl>
          <BaseControl label="Button 2 Text">
            <input type="text" value={ button2Text }
              onChange={ ev => setAttributes({ button2Text: ev.target.value }) } />
          </BaseControl>
          <FontSizePicker
            fontSizes={ CTA_FONT_SIZES } fallbackFontSize={ 16 } value={ ctaFontSize }
            onChange={ value => setAttributes({ ctaFontSize: value }) }
          />
          <PanelColor
            colorValue={ ctaColor } initialOpen={ false } title={ __('CTA Color') }
            onChange={ value => setAttributes({ ctaColor: value }) }
          />
        </PanelBody>
      </InspectorControls>,
    ];
  },

  save ({ attributes, className }) {
    const { title, teaser, imageUrl, backgroundColor, button1Text, button2Text,
      imageLayout, overlayOpacity, contentWidth,
      titleFontSize, titleColor, textFontSize, textColor, ctaFontSize, ctaColor,
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
    const titleStyle = {
      fontSize: `${titleFontSize || 56}px`,
      color: titleColor || 'white',
    };
    const textStyle = {
      fontSize: `${textFontSize || 20}px`,
      color: textColor || 'white',
    };
    const ctaStyle = {
      fontSize: `${ctaFontSize || 16}px`,
      color: ctaColor || 'white',
      borderColor:  ctaColor || 'white',
    };

    return (
      <div className={ `${className} layout-${imageLayout}` } style={ containerStyle }>
        { imageLayout === 'background' &&
          <span className="image-background" style={ imgBackgroundStyle } ><div style={ imgOverlayStyle } /></span> }
        <section style={ wrapperStyle }>
          <header>
            <h2 style={ titleStyle }>{ title }</h2>
            <p style={ textStyle }>{ teaser }</p>
          </header>
          <footer>
            <button style={ ctaStyle }>{ button1Text }</button>
            <button style={ ctaStyle }>{ button2Text }</button>
          </footer>
          { imageLayout !== 'background' && <span className="image-feature"><img src={ imageUrl } /></span> }
        </section>
      </div>
    );
  },
};
