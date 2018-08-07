/* eslint react/jsx-key: 0 */

// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';
import ArticleSearch from './search';

const { __ } = i18n;
const {
  RichText,
  // PlainText,
  InspectorControls,
} = editor;

import './style.scss';

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
  link: {
    type: 'string',
    default: '',
  },
};

// Block name and settings
export const name = 'computerword/article';
const imagePath = 'http://static.cw.newsfront.no/sites/default/files/styles/crop_image_main_large/public';
const sitePath = 'http://www.cw.no';

export const settings = {
  title: __('CW Article'),
  description: __(' Article by ComputerWorld '),
  icon: 'text',

  category: 'cw',
  attributes: attrs,

  edit ({ attributes, className, setAttributes }) {
    const { id, title, teaser, image } = attributes;

    // Helper to load the data from the article
    function setArticle (article) {
      console.log('Set article', article);
      setAttributes({ id: article.entity_id });
      setAttributes({ title: article.short_title });
      setAttributes({ teaser: article.teaser });
      setAttributes({ link: `${sitePath}/${article.path_alias}` });

      const img = article.media && article.media.image && article.media.image.main;
      if(img) {
        setAttributes({ image: `${imagePath}/${img.path}` });
      }
    }

    return [
      <InspectorControls>
        <hr />
        <div>
          <ArticleSearch select={ setArticle } />
        </div>
      </InspectorControls>,
      <div className={ className }>
        { !id ? (
          <div className="components-placeholder">
            <div className="components-placeholder__label">ComputerWorld Article</div>
            <div className="components-placeholder__instructions">Please select an article from the sidebar.</div>
          </div>
        ) : (
          <article className="cw-article">
            <span>
              <figure>
                <img src={ image } alt="" />
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
      </div>,
    ];
  },

  save ({ attributes, className }) {
    const { title, teaser, image, link } = attributes;
    return (
      <div className={ className }>
        <article className="cw-article">
          <a href={ link }>
            <figure>
              <img src={ image } alt="" />
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
          <a className="readmore" href="http://www.google.com">les mer</a>
        </article>
      </div>
    );
  },
};
