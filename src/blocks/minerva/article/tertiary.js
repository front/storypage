// External Dependencies
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { isEmpty, get } from 'lodash';
import {
  i18n,
  components,
  data,
  editor,
  element,
} from '@frontkom/gutenberg-js';

import {
  articleAttributes,
  formattingControls,
  controls,
} from './default-attributes';
import './tertiary.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { withFallbackStyles, PanelBody, TextControl, ToggleControl, Toolbar } = components;
const { getColorClass, withColors, BlockControls, InspectorControls, RichText } = editor;
const { Component, compose } = element;
const { withSelect } = data;

const {
  // Toolbar
  MediaUploadToolbar,
  // Inspector controls
  TextColorPanel,
  TextSettingsPanel,
  // componentDidUpdate
  // didUpdateMedia,
  didUpdateCategory,
  didUpdateAuthor,
  // selectors
  withSelectMedia,
  withSelectAuthor,
  withSelectCategory,
  // events
  getFontSize,
} = controls;

const { getComputedStyle } = window;

class TertiaryEdit extends Component {
  componentDidUpdate (prevProps) {
    const { setAttributes, media } = this.props;

    const attributes = {
      // ...didUpdateMedia(prevProps, this.props),
      ...didUpdateCategory(prevProps, this.props),
      ...didUpdateAuthor(prevProps, this.props),
    };

    if (media && media !== prevProps.media) {
      attributes.imageUrl = get(media, 'media_details.sizes.medium_large.source_url', '');
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
      category,
      categoryUrl,
      date,
      imageUrl,
      author,
      authorUrl,
      authorImageUrl,
      link,
      hasImage,
    } = attributes;

    const style = {
      color: textColor.class ? undefined : textColor.value,
    };
    const classes = classnames(
      className,
      {
        [ textColor.class ]: textColor.class,
      }
    );

    const fontSize = getFontSize(attributes);

    return (
      <div className={ classes } style={ style }>
        { hasImage && <BlockControls>
          <Toolbar>
            <MediaUploadToolbar props={ this.props } />
          </Toolbar>
        </BlockControls> }
        <InspectorControls>
          <PanelBody title={ __('Image Settings') }>
            <ToggleControl
              label={ __('Show image') }
              checked={ !! hasImage }
              onChange={ () => {
                setAttributes({ hasImage: ! hasImage });
              } }
            />
          </PanelBody>
          <TextSettingsPanel props={ this.props } />
          <TextColorPanel props={ this.props } />

          <PanelBody title={ __('Article Tertialy Settings') }>
            <TextControl
              value={ categoryUrl }
              label={ __('Category URL') }
              onChange={ value => setAttributes({ categoryUrl: value }) }
            />
            <TextControl
              value={ link }
              label={ __('Article URL') }
              onChange={ value =>  setAttributes({ link: value }) }
            />
            <TextControl
              value={ authorUrl }
              label={ __('Author URL') }
              onChange={ value => setAttributes({ authorUrl: value }) }
            />
          </PanelBody>
        </InspectorControls>

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
        <div className="minerva-article-content">
          <div>
            <RichText
              tagName="h2"
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
                /> */ }
                <span className="minerva-author-name">{ author }</span>
                { /* <RichText
                  tagName="span"
                  className="minerva-article-date"
                  value={ date }
                  onChange={ value => setAttributes({ date: value }) }
                  formattingControls={formattingControls}
                /> */ }
                <span className="minerva-article-date">{ moment(date).format('LL') }</span>
              </div>
            </div>
          </div>
          { hasImage && <img alt="" src={ imageUrl } className="minerva-article-image" /> }
        </div>
      </div>
    );
  }
}

export const name = 'minerva/article-tertiary';

const tertiaryAttributes = JSON.parse(JSON.stringify(articleAttributes));
tertiaryAttributes.customFontSize.default = 26;
tertiaryAttributes.fontSize.default = '';

export const settings = {
  title: __('Article Tertialy'),
  icon: 'list-view',
  description: __(' Article Tertialy by Minerva '),

  category: 'minerva',

  attributes: tertiaryAttributes,

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
  )(TertiaryEdit),

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
      textColor,
      customTextColor,
      customFontSize,
      fontSize,
      hasImage,
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const style = {
      color: textClass ? undefined : customTextColor,
    };
    const classes = classnames(
      className,
      {
        [ textClass ]: textClass,
      },
    );

    return (
      <div className={ classes } style={ style }>
        <div className="minerva-article-category">
          <a href={ categoryUrl }>
            { /* <RichText.Content
              tagName="span"
              value={ category }
            /> */ }
            <span>{ category }</span>
          </a>
        </div>
        <div className="minerva-article-content">
          <div>
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
          { hasImage && <a href={ link }>
            <img alt="" src={ imageUrl } className="minerva-article-image" />
          </a> }
        </div>
      </div>
    );
  },
  draggablePost: true,
};
