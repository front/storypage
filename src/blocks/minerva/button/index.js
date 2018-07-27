// External Dependencies
import React from 'react';
import classnames from 'classnames';
import { find } from 'lodash';
import {
  i18n,
  components,
  editor,
  element,
} from '@frontkom/gutenberg-js';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const {
  getColorClass,
  withColors,
  RichText,
  InspectorControls,
  PanelColor,
} = editor;
const {
  withFallbackStyles,
  FontSizePicker,
  PanelBody,
  TextControl,
} = components;
const { Component, compose, Fragment } = element;

const FONT_SIZES = [
  {
    name: 'small',
    shortName: 'S',
    size: 14,
  },
  {
    name: 'regular',
    shortName: 'M',
    size: 16,
  },
  {
    name: 'large',
    shortName: 'L',
    size: 36,
  },
  {
    name: 'larger',
    shortName: 'XL',
    size: 48,
  },
];

const { getComputedStyle } = window;

class ButtonEdit extends Component {
  getFontSize ({ customFontSize, fontSize }) {
    if (fontSize) {
      const fontSizeObj = find(FONT_SIZES, { name: fontSize });
      if (fontSizeObj) {
        return fontSizeObj.size;
      }
    }

    if (customFontSize) {
      return customFontSize;
    }
  }

  render () {
    const {
      attributes,
      className,
      setAttributes,
      fallbackFontSize,
      textColor,
      setTextColor,
      backgroundColor,
      setBackgroundColor,
      customTextColor,
    } = this.props;

    const {
      title,
      text,
      url,
    } = attributes;

    const fontSize = this.getFontSize(attributes);

    const classes = classnames(
      className,
      'btn',
      {
        'has-background': backgroundColor.value,
        [ backgroundColor.class ]: backgroundColor.class,
        'has-text-color': textColor || customTextColor,
        [ textColor.class ]: textColor.class,
      }
    );

    const style = {
      color: textColor.class ? undefined : textColor.value,
      backgroundColor: backgroundColor.class ? undefined : backgroundColor.value,
      fontSize: fontSize ? fontSize + 'px' : undefined,
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Title Settings') } className="blocks-font-size">
            <FontSizePicker
              fontSizes={ FONT_SIZES }
              fallbackFontSize={ fallbackFontSize }
              value={ fontSize }
              onChange={ fontSizeValue => {
                const thresholdFontSize = find(FONT_SIZES, { size: fontSizeValue });

                if (thresholdFontSize) {
                  setAttributes({
                    fontSize: thresholdFontSize.name,
                    customFontSize: undefined,
                  });
                  return;
                }

                setAttributes({
                  fontSize: undefined,
                  customFontSize: fontSizeValue,
                });
              } }
            />
          </PanelBody>
          <PanelColor
            colorValue={ textColor.value }
            initialOpen={ false }
            title={ __('Text Color') }
            onChange={ setTextColor }
          />
          <PanelColor
            colorValue={ backgroundColor.value }
            initialOpen={ false }
            title={ __('Background Color') }
            onChange={ setBackgroundColor }
          />
          <PanelBody title={ __('Links') }>
            <TextControl
              value={ url }
              label={ __('Url') }
              onChange={ value => setAttributes({ url: value }) }
            />
          </PanelBody>
        </InspectorControls>

        <RichText
          tagName="a"
          value={ text }
          title={ title }
          className={ classes }
          style={ style }
          onChange={ value => setAttributes({ text: value }) }
          inlineToolbar
        />
      </Fragment>
    );
  }
}

export const name = 'minerva/button';

export const settings = {
  title: __('Button'),
  icon: 'button',
  description: __('Button by Minerva'),

  category: 'minerva',

  attributes: {
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'href',
    },
    title: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'title',
    },
    text: {
      type: 'array',
      source: 'children',
      selector: 'a',
    },
    backgroundColor: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    fontSize: {
      type: 'string',
      default: '',
    },
    customFontSize: {
      type: 'number',
      default: 19,
    },
  },

  edit: compose(
    withColors('backgroundColor', { textColor: 'color' }),
    withFallbackStyles((node, ownProps) => {
      const { fontSize, customFontSize } = ownProps.attributes;
      const editableNode = node.querySelector('[contenteditable="true"]');
      // verify if editableNode is available, before using getComputedStyle.
      const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
      return {
        fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt(computedStyles.fontSize) || undefined,
      };
    }),
  )(ButtonEdit),

  save ({ attributes, className }) {
    const {
      url,
      title,
      text,
      textColor,
      backgroundColor,
      fontSize,
      customBackgroundColor,
      customTextColor,
      customFontSize,
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const backgroundClass = getColorClass('background-color', backgroundColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const classes = classnames(
      className,
      'btn',
      {
        'has-text-color': textColor || customTextColor,
        [ textClass ]: textClass,
        'has-background': backgroundColor || customBackgroundColor,
        [ backgroundClass ]: backgroundClass,
      },
    );

    const style = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
    };

    return (
      <RichText.Content
        tagName="a"
        href={ url }
        title={ title }
        className={ classes }
        style={ style }
        value={ text }
      />
    );
  },
};
