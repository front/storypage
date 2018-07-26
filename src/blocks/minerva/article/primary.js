// External Dependencies
import React from 'react';
import classnames from 'classnames';
// import moment from 'moment';
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

    const fontSize = getFontSize(attributes);

    const textStyle = {
      color: textColor.class ? undefined : textColor.value,
    };

    const classes = classnames(
      className,
      'hero hero-primary bg-image l-row post type-post status-publish format-standard has-post-thumbnail category-kommentar tag-boris-johnson tag-brexit tag-eu tag-frihandel tag-wetherspoon',
    );

    const imageClasses = classnames(
      'image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
      },
    );

    const imageStyle = {
      ...(hasImage ? backgroundImageStyles(imageUrl) : {}),
    };

    return (
      <article className={ classes }>
        { hasImage && <BlockControls>
          <Toolbar>
            <MediaUploadToolbar props={ this.props } />
          </Toolbar>
        </BlockControls> }
        <InspectorControls>
          <ImageSettingsPanel props={ { attributes, setAttributes } } options={ { title: __('Background Settings') }} />
          <TextSettingsPanel props={ this.props } options={ { title: __('Title Settings') }} />
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

        <span
          className={ imageClasses }
          style={ imageStyle }></span>
        <div className="container">
          <div className="term">
            <a className="inner">{ category }</a>
          </div>
          <a className="link-wrapper">
            <RichText
              tagName="h1"
              className={ `title ${textColor.class}` }
              style={ {
                fontSize: fontSize ? fontSize + 'px' : undefined,
                ...textStyle,
              } }
              value={ title }
              onChange={ value => setAttributes({ title: value }) }
              formattingControls={formattingControls}
              inlineToolbar
            />
            <div className="desc">
              <RichText
                tagName="p"
                className={ textColor.class }
                style={ { ...textStyle, fontSize: '26px' } }
                value={ teaser }
                onChange={ value => setAttributes({ teaser: value }) }
                formattingControls={formattingControls}
                inlineToolbar
              />
            </div>
          </a>
          <ul className="meta-large">
            <li key="image">
              <a>
                <img src={ authorImageUrl } alt={ author } className="avatar" />
              </a>
            </li>
            <li key="name">
              <a className="name">
                { author }
              </a>
              <time>{ date }</time>
            </li>
          </ul>
        </div>
      </article>
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
      fontSize,
      customFontSize,
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const textStyle = {
      color: textClass ? undefined : customTextColor,
    };
    const classes = classnames(
      className,
      'hero hero-primary bg-image l-row post type-post status-publish format-standard has-post-thumbnail category-kommentar tag-boris-johnson tag-brexit tag-eu tag-frihandel tag-wetherspoon',
    );

    const imageStyle = {
      ...(hasImage ? backgroundImageStyles(imageUrl) : {}),
    };

    const imageClasses = classnames(
      'image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
      },
    );

    return (
      <article className={ classes }>
        <span
          className={ imageClasses }
          style={ imageStyle }></span>
        <div className="container">
          <div className="term">
            <a href={ categoryUrl } className="inner">{ category }</a>
          </div>
          <a href={ link } className="link-wrapper">
            <RichText.Content
              tagName="h1"
              className={ `title ${textClass}` }
              style={ { fontSize: fontSizeClass ? undefined : customFontSize, ...textStyle } }
              value={ title }
            />
            <div className="desc">
              <RichText.Content
                tagName="p"
                style={ textStyle }
                value={ teaser }
              />
            </div>
          </a>
          <ul className="meta-large">
            <li key="image">
              <a href={ authorUrl }>
                <img src={ authorImageUrl } alt={ author } className="avatar" />
              </a>
            </li>
            <li key="name">
              <a href={ authorUrl } className="name">
                { author }
              </a>
              <time>{ date }</time>
            </li>
          </ul>
        </div>
      </article>
    );
  },

  draggablePost: true,
};
