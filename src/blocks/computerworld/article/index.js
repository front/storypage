/* eslint react/jsx-key: 0 */

// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
  components,
} from '@frontkom/gutenberg-js';

import ArticleSearch, { getImageUrl } from './search';
import './style.scss';


const { __ } = i18n;
const {
  RichText,
  // PlainText,
  InspectorControls,
} = editor;

const {
  PanelBody,
  Placeholder,
  BaseControl,
} = components;


// Block attriutes
const attrs = {
  id: {
    type: 'number',
    default: 0,
  },
  title: {
    type: 'string',
    selector: 'h2',
    default: '',
  },
  teaser: {
    type: 'string',
    selector: 'p',
    default: '',
  },
  image: {
    type: 'string',
    default: '',
  },
  caption: {
    type: 'string',
    default: '',
  },
  link: {
    type: 'string',
    default: '',
  },
  imgSource: {
    type: 'string',
    default: 'main',
  },
  imgStyle: {
    type: 'string',
    default: 'large',
  },
};

// Block name and settings
export const name = 'computerword/article';

export const settings = {
  title: __('CW Article'),
  description: __('Articles by Computerworld.NO'),
  icon: 'text',

  category: 'cw',
  attributes: attrs,

  edit ({ attributes, className, setAttributes }) {
    const { id, title, teaser, image, caption, imgSource, imgStyle } = attributes;
    const imgUrl = getImageUrl(image, imgSource, imgStyle);

    // Helper to load the data from the article
    function setArticle (article) {
      // console.log('Set article', article);
      setAttributes({ id: article.entity_id });
      setAttributes({ title: article.short_title });
      setAttributes({ teaser: article.teaser });
      setAttributes({ link: article.link });
      setAttributes({ image: article.main_image });
      setAttributes({ caption: article.image_caption });
    }

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __('Article Search') }>
            <ArticleSearch select={ setArticle } />
          </PanelBody>

          <PanelBody title={ __('Article Settings') }>
            <BaseControl label="Image Source">
              <select value={ imgSource } onChange={ ev => setAttributes({ imgSource: ev.target.value }) }>
                <option value="main">Main</option>
                <option value="hero">Hero</option>
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
              </select>
            </BaseControl>
            <BaseControl label="Image Style">
              <select value={ imgStyle } onChange={ ev => setAttributes({ imgStyle: ev.target.value }) }>
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
                <option value="original">Original</option>
              </select>
            </BaseControl>
          </PanelBody>
        </InspectorControls>

        { !id ? (
          <Placeholder
            label="ComputerWorld Article"
            instructions="Please select an article from the sidebar."
          />
        ) : (
          <article className="cw-article">
            <span>
              <figure>
                <img src={ imgUrl } alt={ caption } />
              </figure>
              <RichText
                tagName="h2"
                value={ title }
                onChange={ value => setAttributes({ title: value }) }
                inlineToolbar
              />
              <RichText
                tagName="p"
                className="teaser"
                value={ teaser }
                onChange={ value => setAttributes({ teaser: value }) }
                inlineToolbar
              />
            </span>
            <span className="readmore">les mer</span>
          </article>
        ) }
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, image, caption, link, imgSource, imgStyle } = attributes;
    const imgUrl = getImageUrl(image, imgSource, imgStyle);
    return (
      <div className={ className }>
        <article className="cw-article">
          <a href={ link }>
            <figure>
              <img src={ imgUrl } alt={ caption } />
            </figure>
            <RichText.Content
              tagName="h2"
              value={ title }
            />
            <RichText.Content
              tagName="p"
              className="teaser"
              value={ teaser }
            />
          </a>
          <a className="readmore" href={ link }>les mer</a>
        </article>
      </div>
    );
  },
};
