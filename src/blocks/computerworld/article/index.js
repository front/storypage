/* eslint react/jsx-key: 0 */

// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
  components,
} from '@frontkom/gutenberg-js';

import ArticleSearch from './search';
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
    const { id, title, teaser, image, caption } = attributes;

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
                <img src={ image } alt={ caption } />
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
    const { title, teaser, image, caption, link } = attributes;
    return (
      <div className={ className }>
        <article className="cw-article">
          <a href={ link }>
            <figure>
              <img src={ image } alt={ caption } />
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
