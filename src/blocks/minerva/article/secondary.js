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
import './secondary.scss';

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
  didUpdateCategory,
  didUpdateAuthor,
  // selectors
  withSelectAuthor,
  withSelectCategory,
  // events
  getFontSize,
} = controls;

const { getComputedStyle } = window;

class SecondaryEdit extends Component {
  componentDidUpdate (prevProps) {
    const { setAttributes } = this.props;

    const attributes = {
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
      date,
      author,
      authorUrl,
      authorImageUrl,
      link,
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
      <div className={ classes }  style={ style }>
        <InspectorControls>
          <TextSettingsPanel props={ this.props } />
          <TextColorPanel props={ this.props } />

          <PanelBody title={ __('Article Secondary Settings') }>
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
          className="minerva-article-title"
          style={ {
            fontSize: fontSize ? fontSize + 'px' : undefined,
          } }
          value={ title }
          onChange={ value => setAttributes({ title: value }) }
          formattingControls={formattingControls}
          inlineToolbar
        />
        <div className="minerva-article-teaser">
          <div className="minerva-article-category">
            { /* <RichText
              tagName="span"
              value={ category }
              onChange={ value => setAttributes({ category: value }) }
              formattingControls={formattingControls}
            />  */ }
            <span>{ category }</span>
          </div>
          <RichText
            tagName="p"
            value={ teaser }
            onChange={ value => setAttributes({ teaser: value }) }
            formattingControls={formattingControls}
            inlineToolbar
          />
        </div>
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
    );
  }
}

export const name = 'minerva/article-secondary';

const secondaryAttributes = JSON.parse(JSON.stringify(articleAttributes));
secondaryAttributes.customFontSize.default = 58;
secondaryAttributes.fontSize.default = '';

export const settings = {
  title: __('Article Secondary'),
  icon: 'text',
  description: __(' Article Secondary by Minerva '),

  category: 'minerva',

  attributes: secondaryAttributes,

  edit: compose(
    withSelect((select, props) => {
      return {
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
  )(SecondaryEdit),

  save ({ attributes, className }) {
    const {
      title,
      teaser,
      category,
      date,
      author,
      authorUrl,
      authorImageUrl,
      link,
      textColor,
      customTextColor,
      customFontSize,
      fontSize,
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
        <a href={ link }>
          <RichText.Content
            tagName="h2"
            className="minerva-article-title"
            style={ { fontSize: fontSizeClass ? undefined : customFontSize } }
            value={ title }
          />
          <div className="minerva-article-teaser">
            <div className="minerva-article-category">
              { /* <RichText.Content
                tagName="span"
                value={ category }
              /> */ }
              <span>{ category }</span>
            </div>
            <RichText.Content
              tagName="p"
              value={ teaser }
            />
          </div>
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
