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
const { PanelBody, BaseControl, FontSizePicker, RangeControl, IconButton, Toolbar } = components;
const { RichText, InspectorControls, PanelColor, MediaUpload, BlockControls } = editor;


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
    titleFontSize: {
      type: 'number',
      // default: 56,
    },
    titleColor: {
      type: 'string',
      // default: '#FFFFFF',
    },
    textFontSize: {
      type: 'number',
      // default: 20,
    },
    textColor: {
      type: 'string',
      // default: '#FFFFFF',
    },
    ctaFontSize: {
      type: 'number',
      // default: 16,
    },
    ctaColor: {
      type: 'string',
      // default: '#FFFFFF',
    },
    button1Text: {
      type: 'string',
      default: 'Learn more',
    },
    button2Text: {
      type: 'string',
      default: 'Download',
    },
    button1Url: {
      type: 'string',
      default: '#',
    },
    button2Url: {
      type: 'string',
      default: '#',
    },
  },

  description: __('Hero Block'),

  edit ({ attributes, className, setAttributes }) {
    const {
      backgroundType, backgroundColor, backgroundImage, overlayOpacity,
      contentWidth, imageLayout, imageUrl,
      title, teaser, button1Text, button2Text, button1Url, button2Url,
      titleFontSize, titleColor, textFontSize, textColor, ctaFontSize, ctaColor,
    } = attributes;

    const containerStyle = {
      backgroundColor: backgroundType === 'color' ? backgroundColor : 'black',
      backgroundImage: backgroundType === 'image' && `url('${backgroundImage}')`,
    };
    const overlayStyle = backgroundType === 'color' ? {} : {
      display: 'block',
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`,
    };

    const titleStyle = {
      fontSize: titleFontSize && `${titleFontSize}px`,
      color: titleColor,
    };
    const textStyle = {
      fontSize: textFontSize && `${textFontSize}px`,
      color: textColor,
    };
    const ctaStyle = {
      fontSize: ctaFontSize && `${ctaFontSize}px`,
      color: ctaColor,
      borderColor:  ctaColor,
    };

    const onSelectImage = (media, field) => {
      setAttributes({
        [field]: media.url,
      });
    };
    const noClick = ev => ev.preventDefault();

    return [
      <div className={ className } style={ containerStyle }>
        { backgroundType === 'image' && <BlockControls>
          <Toolbar>
            <MediaUpload type="image"
              onSelect={ media => onSelectImage(media, 'backgroundImage') } render={ ({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              ) }
            />
          </Toolbar>
        </BlockControls> }
        <div className="bg-overlay" style={ overlayStyle }></div>
        <section className={ `image-${imageLayout}` } style={ wrapperStyle }>
          <header>
            <RichText
              tagName="h2" value={ title } style={ titleStyle }
              placeholder="Hero title"
              onChange={ value => setAttributes({ title: value }) }
              inlineToolbar
            />
            <RichText
              tagName="p" className="teaser" value={ teaser } style={ textStyle }
              placeholder="Text content"
              onChange={ value => setAttributes({ teaser: value }) }
              inlineToolbar
            />
          </header>
          <footer>
            { button1Text &&
              <a href={ button1Url } className="btn" style={ ctaStyle } onClick={ noClick }>{ button1Text }</a> }
            { button2Text &&
              <a href={ button2Url } className="btn" style={ ctaStyle } onClick={ noClick }>{ button2Text }</a> }
          </footer>
          { imageLayout && <figure>
            <MediaUpload type="image"
              onSelect={ media => onSelectImage(media, 'imageUrl') } render={({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              )}
            />
            <img src={ imageUrl } />
          </figure> }
        </section>
      </div>,
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

        {/* Element style overrides */}
        <PanelBody title={ __('Title Settings') } initialOpen={ false }>
          <FontSizePicker
            fontSizes={ TITLE_FONT_SIZES } fallbackFontSize={ 56 } value={ titleFontSize }
            onChange={ value => setAttributes({ titleFontSize: value }) }
          />
          <PanelColor
            colorValue={ titleColor } initialOpen={ false } title={ __('Title Color') }
            onChange={ value => setAttributes({ titleColor: value }) }
          />
        </PanelBody>
        <PanelBody title={ __('Text Settings') } initialOpen={ false }>
          <FontSizePicker
            fontSizes={ TEXT_FONT_SIZES } fallbackFontSize={ 20 } value={ textFontSize }
            onChange={ value => setAttributes({ textFontSize: value }) }
          />
          <PanelColor
            colorValue={ textColor } initialOpen={ false } title={ __('Text Color') }
            onChange={ value => setAttributes({ textColor: value }) }
          />
        </PanelBody>
        <PanelBody title={ __('CTA Settings') } initialOpen={ false }>
          <BaseControl label="Button 1 Text">
            <input type="text" value={ button1Text }
              onChange={ ev => setAttributes({ button1Text: ev.target.value }) } />
          </BaseControl>
          <BaseControl label="Button 1 Url">
            <input type="text" value={ button1Url }
              onChange={ ev => setAttributes({ button1Url: ev.target.value }) } />
          </BaseControl>
          <hr />
          <BaseControl label="Button 2 Text">
            <input type="text" value={ button2Text }
              onChange={ ev => setAttributes({ button2Text: ev.target.value }) } />
          </BaseControl>
          <BaseControl label="Button 2 Url">
            <input type="text" value={ button2Url }
              onChange={ ev => setAttributes({ button2Url: ev.target.value }) } />
          </BaseControl>
          <hr />
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
    const {
      backgroundType, backgroundColor, backgroundImage, overlayOpacity,
      contentWidth, imageLayout, imageUrl,
      title, teaser, button1Text, button2Text, button1Url, button2Url,
      titleFontSize, titleColor, textFontSize, textColor, ctaFontSize, ctaColor,
    } = attributes;


    const containerStyle = {
      backgroundColor: backgroundType === 'color' ? backgroundColor : 'black',
      backgroundImage: backgroundType === 'image' && `url('${backgroundImage}')`,
    };
    const overlayStyle = backgroundType === 'image' && {
      display: 'block',
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`,
    };

    const titleStyle = {
      fontSize: titleFontSize && `${titleFontSize}px`,
      color: titleColor,
    };
    const textStyle = {
      fontSize: textFontSize && `${textFontSize}px`,
      color: textColor,
    };
    const ctaStyle = {
      fontSize: ctaFontSize && `${ctaFontSize}px`,
      color: ctaColor,
      borderColor:  ctaColor,
    };

    return (
      <div className={ className } style={ containerStyle }>
        <div className="bg-overlay" style={ overlayStyle }></div>
        <section className={ `image-${imageLayout}` } style={ wrapperStyle }>
          <header>
            { title && <h2 style={ titleStyle }>{ title }</h2> }
            { teaser && <p style={ textStyle }>{ teaser }</p> }
          </header>
          <footer>
            { button1Text && <a href={ button1Url } className="btn" style={ ctaStyle }>{ button1Text }</a> }
            { button2Text && <a href={ button2Url } className="btn" style={ ctaStyle }>{ button2Text }</a> }
          </footer>
          { imageLayout && <figure><img src={ imageUrl } /></figure> }
        </section>
      </div>
    );
  },
};
