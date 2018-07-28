// External Dependencies
import React from 'react';
import classnames from 'classnames';
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

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { withFallbackStyles, PanelBody, TextControl, withAPIData } = components;
const { getColorClass, withColors, InspectorControls, RichText } = editor;
const { Component, compose } = element;
const { withSelect } = data;

const {
  // Inspector controls
  TextColorPanel,
  TextSettingsPanel,
  PostSettingsPanel,
  // componentDidUpdate
  didUpdateCategory,
  didUpdateAuthor,
  didUpdatePost,
  // selectors
  withSelectAuthor,
  withSelectCategory,
  withSelectCategories,
  withAPIDataPost,
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
      ...didUpdatePost(prevProps, this.props),
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

    const fontSize = getFontSize(attributes);

    const style = {
      color: textColor.class ? undefined : textColor.value,
    };

    const classes = classnames(
      className,
      'hero hero-tertiary post type-post status-publish format-standard has-post-thumbnail category-nyhet tag-faktasjekk tag-faktisk-no tag-skatteparadiser',
      {
        [ textColor.class ]: textColor.class,
      }
    );

    return (
      <article className={ classes }>
        <InspectorControls>
          <PostSettingsPanel props={ this.props } />
          <TextSettingsPanel props={ this.props } />
          <TextColorPanel props={ this.props } />

          <PanelBody title={ __('Article Secondary Settings') }>
            <TextControl
              value={ link }
              label={ __('Article URL') }
              onChange={ value => setAttributes({ link: value, type: 'static' }) }
            />
            <TextControl
              value={ authorUrl }
              label={ __('Author URL') }
              onChange={ value => setAttributes({ authorUrl: value, type: 'static' }) }
            />
          </PanelBody>
        </InspectorControls>

        <div className="term">
          <a className="inner">{ category }</a>
        </div>
        <a className="link-wrapper">
          <RichText
            tagName="h1"
            className="title"
            style={ {
              fontSize: fontSize ? fontSize + 'px' : undefined,
              ...style,
            } }
            value={ title }
            onChange={ value => setAttributes({ title: value, type: 'static' }) }
            formattingControls={formattingControls}
            inlineToolbar
          />
          <div className="desc">
            <span className="term-inline term-debatt">{ category }</span>
            <RichText
              tagName="p"
              style={ style }
              value={ teaser }
              onChange={ value => setAttributes({ teaser: value, type: 'static' }) }
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
            <time>{ date }</time>
          </li>
        </ul>
      </article>
    );
  }
}

export const name = 'minerva/article-tertiary';

const secondaryAttributes = JSON.parse(JSON.stringify(articleAttributes));
secondaryAttributes.customFontSize.default = 36;
secondaryAttributes.fontSize.default = 'large';

export const settings = {
  title: __('Article Tertialy'),
  icon: 'list-view',
  description: __(' Article Tertialy by Minerva '),

  category: 'minerva',

  attributes: secondaryAttributes,

  edit: compose(
    withSelect((select, props) => ({
      ...withSelectCategories(select),
      ...withSelectCategory(select, props),
      ...withSelectAuthor(select, props),
    })),
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
    withAPIData(props => ({
      ...withAPIDataPost(props),
    })),
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
      'hero hero-tertiary post type-post status-publish format-standard has-post-thumbnail category-nyhet tag-faktasjekk tag-faktisk-no tag-skatteparadiser',
      {
        [ textClass ]: textClass,
      },
    );

    return (

      <article className={ classes }>
        <div className="term">
          <a className="inner">{ category }</a>
        </div>
        <a className="link-wrapper" href={ link }>
          <RichText.Content
            tagName="h1"
            className="title"
            style={ { fontSize: fontSizeClass ? undefined : customFontSize, ...style } }
            value={ title }
          />
          <div className="desc">
            <span className="term-inline term-debatt">{ category }</span>
            <RichText.Content
              tagName="p"
              style={ style }
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
            <time>{ date }</time>
          </li>
        </ul>
      </article>
    );
  },
  draggablePost: true,
};
