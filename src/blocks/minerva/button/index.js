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
const { Component, compose } = element;

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
    } = this.props;

    const {
      title,
      url,
    } = attributes;

    const fontSize = this.getFontSize(attributes);

    const classes = classnames(
      className,
      'btn',
      {
        'has-background': backgroundColor.value,
        [ textColor.class ]: textColor.class,
        [ backgroundColor.class ]: backgroundColor.class,
      }
    );

    const style = {
      color: textColor.class ? undefined : textColor.value,
      backgroundColor: backgroundColor.class ? undefined : backgroundColor.value,
      fontSize: fontSize ? fontSize + 'px' : undefined,
    };

    return (
      <a className={ classes } style={ style }>
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
          tagName="span"
          value={ title }
          onChange={ value => setAttributes({ title: value }) }
          inlineToolbar
        />
      </a>
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

    const style = {
      color: textClass ? undefined : customTextColor,
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
    };
    const classes = classnames(
      className,
      'btn',
      {
        'has-background': backgroundColor || customBackgroundColor,
        [ textClass ]: textClass,
        [ backgroundClass ]: backgroundClass,
      },
    );

    return (
      <a href={ url } className={ classes } style={ style }>
        <RichText.Content
          tagName="span"
          value={ title }
        />
      </a>
    );
  },
};
