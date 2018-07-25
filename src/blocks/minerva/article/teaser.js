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
import './teaser.scss';

/**
* WordPress dependencies
*/
const { __ } = i18n;
const { withFallbackStyles, PanelBody, TextControl } = components;
const { getColorClass, withColors, InspectorControls, RichText } = editor;
const { Component, compose } = element;
const { withSelect } = data;

const {
  // Inspector controls
  TextColorPanel,
  TextSettingsPanel,
  // componentDidUpdate
  didUpdateAuthor,
  // selectors
  withSelectAuthor,
  // events
  getFontSize,
} = controls;

const { getComputedStyle } = window;

class TeaserEdit extends Component {
  componentDidUpdate (prevProps) {
    const { setAttributes } = this.props;

    const attributes = {
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
      date,
      author,
      authorUrl,
      authorImageUrl,
      link,
    } = attributes;

    const fontSize = getFontSize(attributes);

    const titleStyle = {
      color: textColor.class ? undefined : textColor.value,
      fontSize: fontSize ? fontSize + 'px' : undefined,
    };

    const titleClasses = classnames(
      'minerva-article-title',
      {
        [ textColor.class ]: textColor.class,
      }
    );

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __('Article Primary Settings') }>
            <TextSettingsPanel props={ this.props } />
            <TextColorPanel props={ this.props } />

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

        <RichText
          tagName="h2"
          className={ titleClasses }
          style={ titleStyle }
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
    );
  }
}

export const name = 'minerva/article-teaser';

const teaserAttributes = JSON.parse(JSON.stringify(articleAttributes));
teaserAttributes.customFontSize.default = 26;
teaserAttributes.fontSize.default = '';
teaserAttributes.customTextColor.default = '#BF5048';

export const settings = {
  title: __('Article Teaser'),
  icon: 'list-view',
  description: __(' Article Teaser by Minerva '),
  category: 'minerva',

  attributes: teaserAttributes,

  edit: compose(
    withSelect((select, props) => {
      return {
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
    } = attributes;

    const textClass = getColorClass('color', textColor);
    const fontSizeClass = fontSize && `is-${fontSize}-text`;

    const titleStyle = {
      color: textClass ? undefined : customTextColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
    };

    const titleClasses = classnames(
      'minerva-article-title',
      {
        [ textClass ]: textClass,
      }
    );

    return (
      <div className={ className }>
        <a href={ link }>
          <RichText.Content
            tagName="h2"
            className={ titleClasses }
            style={ titleStyle }
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
    );
  },
  draggablePost: true,
};
