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

// Internal Dependencies
import './style.scss';

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

class PodcastEdit extends Component {
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
      subtitle,
      teaser,
      lastEpUrl,
      subscribeUrl,
    } = attributes;

    const classes = classnames(
      className,
      {
        'has-background': backgroundColor.value,
        [ backgroundColor.class ]: backgroundColor.class,
        [ textColor.class ]: textColor.class,
      }
    );

    const style = {
      backgroundColor: backgroundColor.class ? undefined : backgroundColor.value,
      color: textColor.class ? undefined : textColor.value,
    };

    const fontSize = this.getFontSize(attributes);

    return (
      <div className={ classes } style={ style }>
        <InspectorControls>
          <PanelBody title={ __('Text Settings') } className="blocks-font-size">
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
              value={ lastEpUrl }
              label={ __('Last episode URL') }
              onChange={ value => setAttributes({ lastEpUrl: value }) }
            />
            <TextControl
              value={ subscribeUrl }
              label={ __('iTunes URL') }
              onChange={ value => setAttributes({ subscribeUrl: value }) }
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          tagName="h1"
          className="minerva-podcast-box-title"
          style={ {
            fontSize: fontSize ? fontSize + 'px' : undefined,
          } }
          value={ title }
          onChange={ value => setAttributes({ title: value }) }
          inlineToolbar
        />
        <RichText
          tagName="h2"
          className="minerva-podcast-box-subtitle"
          value={ subtitle }
          onChange={ value => setAttributes({ subtitle: value }) }
          inlineToolbar
        />
        <RichText
          tagName="p"
          className="minerva-podcast-box-teaser"
          value={ teaser }
          onChange={ value => setAttributes({ teaser: value }) }
          inlineToolbar
        />
        <div className="minerva-podcast-box-links">
          <a href={ lastEpUrl }>Hør siste episode</a>
          <a href={ subscribeUrl }>Abonner via iTunes</a>
        </div>
      </div>
    );
  }
}

export const name = 'minerva/podcast-box';

export const settings = {
  title: __('Podcast Box'),
  icon: 'media-default',
  description: __(' Podcast box by Minerva '),

  category: 'minerva',

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: 'h1',
    },
    subtitle: {
      type: 'array',
      source: 'children',
      selector: 'h2',
    },
    teaser: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
    link: {
      type: 'string',
      default: 'https://www.minervanett.no/podkast/episode-25-kristoffer-egeberg/',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
      default: 'white',
    },
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
      default: '#BF5048',
    },
    fontSize: {
      type: 'string',
      default: '',
    },
    customFontSize: {
      type: 'number',
      default: 60,
    },
    lastEpUrl: {
      type: 'string',
      default: 'https://www.minervanett.no/podKast/',
    },
    subscribeUrl: {
      type: 'string',
      default: 'https://itunes.apple.com/no/podcast/minervapodden/id1086075439?l=nb&mt=2',
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
  )(PodcastEdit),

  save ({ attributes, className }) {
    const {
      title,
      subtitle,
      teaser,
      link,
      textColor,
      customTextColor,
      fontSize,
      customFontSize,
      backgroundColor,
      customBackgroundColor,
      lastEpUrl,
      subscribeUrl,
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const backgroundClass = getColorClass('background-color', backgroundColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const style = {
      color: textClass ? undefined : customTextColor,
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
    };
    const classes = classnames(
      className,
      {
        'has-background': backgroundColor || customBackgroundColor,
        [ textClass ]: textClass,
        [ backgroundClass ]: backgroundClass,
      },
    );

    return (
      <div className={ classes } style={ style }>
        <RichText.Content
          tagName="h1"
          className="minerva-podcast-box-title"
          style={ { fontSize: fontSizeClass ? undefined : customFontSize } }
          value={ title }
        />
        <a href={ link }>
          <RichText.Content
            tagName="h2"
            className="minerva-podcast-box-subtitle"
            value={ subtitle }
          />

          <RichText.Content
            tagName="p"
            className="minerva-podcast-box-teaser"
            value={ teaser }
          />
        </a>
        <div className="minerva-podcast-box-links">
          <a href={ lastEpUrl }>Hør siste episode</a>
          <a href={ subscribeUrl }>Abonner via iTunes</a>
        </div>
      </div>
    );
  },
};
