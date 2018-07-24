// External Dependencies
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { isEmpty } from 'lodash';
import {
  i18n,
  components,
  data,
  editor,
  element,
} from '@frontkom/gutenberg-js';

// Internal Dependencies
import {
  articleAttributes,
  formattingControls,
  controls,
} from './default-attributes';
import './primary.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { withFallbackStyles, PanelBody, TextControl, Toolbar } = components;
const { getColorClass, withColors, BlockControls, InspectorControls, RichText } = editor;
const { Component, compose } = element;
const { withSelect } = data;

const {
  // Toolbar
  MediaUploadToolbar,
  // Inspector controls
  ImageSettingsPanel,
  TextColorPanel,
  TextSettingsPanel,
  // componentDidUpdate
  didUpdateMedia,
  didUpdateCategory,
  didUpdateAuthor,
  // selectors
  withSelectMedia,
  withSelectAuthor,
  withSelectCategory,
  // events
  getFontSize,
  // helpers
  backgroundImageStyles,
  dimRatioToClass,
} = controls;

const { getComputedStyle } = window;

class PrimaryEdit extends Component {
  componentDidUpdate (prevProps) {
    const { setAttributes } = this.props;

    const attributes = {
      ...didUpdateMedia(prevProps, this.props),
      ...didUpdateCategory(prevProps, this.props),
      ...didUpdateAuthor(prevProps, this.props),
    };

    if (! isEmpty(attributes)) {
      setAttributes(attributes);
    }
  }

  render () {
    const { attributes, className, setAttributes, textColor } = this.props;
    const {
      title,
      teaser,
      category,
      categoryUrl,
      date,
      imageUrl,
      author,
      authorUrl,
      authorImageUrl,
      link,
      hasImage,
      dimRatio,
      hasParallax,
    } = attributes;

    const style = {
      ...(hasImage ? backgroundImageStyles(imageUrl) : {}),
      color: textColor.class ? undefined : textColor.value,
    };
    const classes = classnames(
      className,
      'wp-block-cover-image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
        [ textColor.class ]: textColor.class,
      }
    );

    const fontSize = getFontSize(attributes);

    return (
      <div className={ classes } style={ style }>
        <BlockControls>
          <Toolbar>
            <MediaUploadToolbar props={ this.props } />
          </Toolbar>
        </BlockControls>
        <InspectorControls>
          <ImageSettingsPanel props={ { attributes, setAttributes } } />
          <TextSettingsPanel props={ this.props } />
          <TextColorPanel props={ this.props } />

          <PanelBody title={ __('Article Primary Settings') }>
            <TextControl
              value={ categoryUrl }
              label={ __('Category URL') }
              onChange={ value => setAttributes({ categoryUrl: value }) }
            />
            <TextControl
              value={ link }
              label={ __('Article URL') }
              onChange={ value => setAttributes({ link: value }) }
            />
            <TextControl
              value={ authorUrl }
              label={ __('Author URL') }
              onChange={ value => setAttributes({ authorUrl: value }) }
            />
          </PanelBody>
        </InspectorControls>

        <div className="container">
          <div className="minerva-article-category">
            { /* <RichText
              tagName="span"
              value={ category }
              onChange={ value => setAttributes({ category: value }) }
              formattingControls={formattingControls}
              inlineToolbar
            /> */ }
            <span>{ category }</span>
          </div>
          <RichText
            tagName="h1"
            className="minerva-article-title"
            style={ {
              fontSize: fontSize ? fontSize + 'px' : undefined,
            } }
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
            formattingControls={formattingControls}
            inlineToolbar
          />
          <RichText
            tagName="p"
            className="minerva-article-teaser"
            value={ teaser }
            onChange={ value => setAttributes({ teaser: value }) }
            formattingControls={formattingControls}
            inlineToolbar
          />
          <div className="minerva-article-author">
            <img alt="" src={ authorImageUrl } className="minerva-author-avatar" />
            <div className="minerva-article-meta">
              { /* <RichText
                tagName="span"
                className="minerva-author-name"
                value={ author }
                onChange={ value => setAttributes({ author: value }) }
                formattingControls={formattingControls}
                inlineToolbar
              /> */ }
              <span className="minerva-author-name">{ author }</span>
              { /* <RichText
                tagName="span"
                className="minerva-article-date"
                value={ date }
                onChange={ value => setAttributes({ date: value }) }
                formattingControls={formattingControls}
                inlineToolbar
              /> */ }
              <span className="minerva-article-date">{ moment(date).format('LL') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const name = 'minerva/article-primary';

const primaryAttributes = JSON.parse(JSON.stringify(articleAttributes));
primaryAttributes.customFontSize.default = 58;
primaryAttributes.fontSize.default = '';
primaryAttributes.customTextColor.default = 'white';

export const settings = {
  title: __('Article Primary'),
  icon: 'cover-image',
  description: __('Article Primary by Minerva'),

  category: 'minerva',

  attributes: primaryAttributes,

  edit: compose(
    withSelect((select, props) => {
      return {
        ...withSelectMedia(select, props),
        ...withSelectCategory(select, props),
        ...withSelectAuthor(select, props),
      };
    }),
    withColors({ textColor: 'color' }),
    withFallbackStyles((node, ownProps) => {
      const { fontSize, customFontSize } = ownProps.attributes;
      const editableNode = node.querySelector('[contenteditable="true"]');
      // verify if editableNode is available, before using getComputedStyle.
      const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
      return {
        fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt(computedStyles.fontSize) || undefined,
      };
    }),
  )(PrimaryEdit),

  save ({ attributes, className }) {
    const {
      title,
      teaser,
      category,
      categoryUrl,
      date,
      imageUrl,
      author,
      authorUrl,
      authorImageUrl,
      link,
      hasImage,
      dimRatio,
      hasParallax,
      textColor,
      customTextColor,
      customFontSize,
      fontSize,
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const style = {
      ...(hasImage ? backgroundImageStyles(imageUrl) : {}),
      color: textClass ? undefined : customTextColor,
    };
    const classes = classnames(
      className,
      'wp-block-cover-image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
        [ textClass ]: textClass,
      },
    );

    return (
      <div className={ classes } style={ style }>
        <div className="container">
          <div className="minerva-article-category">
            <a href={ categoryUrl }>
              { /* <RichText.Content
                tagName="span"
                value={ category }
              /> */ }
              <span>{ category }</span>
            </a>
          </div>
          <a href={ link }>
            <RichText.Content
              tagName="h1"
              className="minerva-article-title"
              style={ { fontSize: fontSizeClass ? undefined : customFontSize } }
              value={ title }
            />
            <RichText.Content
              tagName="p"
              className="minerva-article-teaser"
              value={ teaser }
            />
          </a>
          <div className="minerva-article-author">
            <a href={ authorUrl }>
              <img alt="" src={ authorImageUrl } className="minerva-author-avatar" />
            </a>
            <div className="minerva-article-meta">
              <a href={ authorUrl }>
                { /* <RichText.Content
                  tagName="span"
                  className="minerva-author-name"
                  value={ author }
                /> */ }
                <span className="minerva-author-name">{ author }</span>
              </a>
              { /* <RichText.Content
                tagName="span"
                className="minerva-article-date"
                value={ date }
              /> */ }
              <span className="minerva-article-date">{ moment(date).format('LL') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  },

  draggablePost: true,
};
