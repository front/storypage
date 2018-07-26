// External Dependencies
import React from 'react';
import classnames from 'classnames';
import { isEmpty, get } from 'lodash';
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
import './teaser.scss';

/**
* WordPress dependencies
*/
const { __ } = i18n;
const { withFallbackStyles, PanelBody, TextControl, Toolbar } = components;
const { getColorClass, withColors, InspectorControls, RichText, BlockControls } = editor;
const { Component, compose } = element;
const { withSelect } = data;

const {
  // Toolbar
  MediaUploadToolbar,
  // Inspector controls
  TextColorPanel,
  TextSettingsPanel,
  // componentDidUpdate
  didUpdateAuthor,
  didUpdateCategory,
  // selectors
  withSelectMedia,
  withSelectAuthor,
  withSelectCategory,
  // events
  getFontSize,
} = controls;

const { getComputedStyle } = window;

class TeaserEdit extends Component {
  componentDidUpdate (prevProps) {
    const { setAttributes, media } = this.props;

    const attributes = {
      ...didUpdateAuthor(prevProps, this.props),
      ...didUpdateCategory(prevProps, this.props),
    };

    if (media && media !== prevProps.media) {
      attributes.imageUrl = get(media, 'media_details.sizes.medium_large.source_url', '');
      attributes.imageSmallUrl = get(media, 'media_details.sizes.medium_large.source_url', '');
    }

    if (! isEmpty(attributes)) {
      setAttributes(attributes);
    }
  }

  render () {
    const { attributes, className, setAttributes, textColor } = this.props;
    const {
      title,
      teaser,
      date,
      author,
      authorUrl,
      authorImageUrl,
      link,
      category,
      showCategory,
      hasImage,
      imageUrl,
      imageSmallUrl,
    } = attributes;

    const fontSize = getFontSize(attributes);

    const titleStyle = {
      color: textColor.class ? undefined : textColor.value,
      fontSize: fontSize ? fontSize + 'px' : undefined,
    };

    const classes = classnames(
      className,
      'article-teaser',
    );

    const titleClasses = classnames(
      'title',
      { [ textColor.class ]: textColor.class }
    );

    return (
      <article className={ classes }>
        { hasImage && <BlockControls>
          <Toolbar>
            <MediaUploadToolbar props={ this.props } />
          </Toolbar>
        </BlockControls> }
        <InspectorControls>
          <PanelBody title={ __('Article Teaser Settings') }>
            <TextSettingsPanel props={ this.props } options={ { title: __('Title Settings') }} />
            <TextColorPanel props={ this.props } options={ { title: __('Title Color') }} />

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

        { showCategory && <div className="term">
          <a className="inner term-debatt">{ category }</a>
        </div> }

        <a className="link-wrapper">
          { hasImage && <span className="teaser-image">
            <picture>
              <source srcSet={ imageUrl } media="(max-width: 719px)" />
              <source srcSet={ imageSmallUrl } media="(min-width: 720px)" />
              <img src={ imageUrl } alt="Kritikken av Rødt treffer ikke" className="image" />
            </picture>
          </span> }
          <RichText
            tagName="h2"
            className={ titleClasses }
            style={ titleStyle }
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
            formattingControls={formattingControls}
            inlineToolbar
          />
          <div className="desc">
            <RichText
              tagName="p"
              value={ teaser }
              onChange={ value => setAttributes({ teaser: value }) }
              formattingControls={formattingControls}
              inlineToolbar
            />
          </div>
        </a>
        <ul className="meta">
          <li key="image">
            <a>
              <img src={ authorImageUrl } alt={ author } className="avatar" />
            </a>
          </li>
          <li key="name">
            <a className="name">
              { author }
            </a>
            <time classename="date" >{ date }</time>
          </li>
        </ul>
      </article>
    );
  }
}

export const name = 'minerva/article-teaser';

const teaserAttributes = JSON.parse(JSON.stringify(articleAttributes));
teaserAttributes.customFontSize.default = 26;
teaserAttributes.fontSize.default = '';
teaserAttributes.showCategory = {
  type: 'boolean',
  default: true,
};
teaserAttributes.imageSmallUrl = {
  type: 'string',
};

export const settings = {
  title: __('Article Teaser'),
  icon: 'list-view',
  description: __(' Article Teaser by Minerva '),
  category: 'minerva',

  attributes: teaserAttributes,

  edit: compose(
    withSelect((select, props) => {
      return {
        ...withSelectMedia(select, props),
        ...withSelectAuthor(select, props),
        ...withSelectCategory(select, props),
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
  )(TeaserEdit),

  save ({ attributes, className }) {
    const {
      title,
      teaser,
      date,
      author,
      authorUrl,
      authorImageUrl,
      link,
      textColor,
      customTextColor,
      fontSize,
      customFontSize,
      category,
      showCategory,
      hasImage,
      imageUrl,
      imageSmallUrl,
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const titleStyle = {
      color: textClass ? undefined : customTextColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
    };

    const titleClasses = classnames(
      'title',
      { [ textClass ]: textClass }
    );

    const classes = classnames(
      className,
      'article-teaser'
    );

    return (
      <article className={ classes }>
        { showCategory && <div className="term">
          <a className="inner term-debatt">{ category }</a>
        </div> }

        <a href={ link } className="link-wrapper">
          { hasImage && <span className="teaser-image">
            <picture>
              <source srcSet={ imageUrl } media="(max-width: 719px)" />
              <source srcSet={ imageSmallUrl } media="(min-width: 720px)" />
              <img src={ imageUrl } alt="Kritikken av Rødt treffer ikke" className="image" />
            </picture>
          </span> }
          <RichText.Content
            tagName="h2"
            className={ titleClasses }
            style={ titleStyle }
            value={ title }
          />
          <div className="desc">
            <RichText.Content
              tagName="p"
              value={ teaser }
            />
          </div>
        </a>
        <ul className="meta">
          <li key="image">
            <a href={ authorUrl }>
              <img src={ authorImageUrl } alt={ author } className="avatar" />
            </a>
          </li>
          <li key="name">
            <a className="name" href={ authorUrl }>
              { author }
            </a>
            <time classename="date" >{ date }</time>
          </li>
        </ul>
      </article>
    );
  },
  draggablePost: true,
};
