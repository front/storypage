// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';

// Internal Dependencies
import { articleAttributes, backgroundImageStyles } from './default-attributes';
import './primary.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const {
  RichText,
} = editor;

export const name = 'minerva/article-primary';

export const settings = {
  title: __('Article Primary'),
  icon: 'universal-access-alt',
  description: __('Article Primary by Minerva'),

  category: 'minerva',

  attributes: articleAttributes,

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, category, date, imageUrl, authorName, authorImageUrl } = attributes;
    const style = backgroundImageStyles(imageUrl);

    return (
      <div className={ className } style={ style }>
        <div className="container">
          <div className="minerva-article-category">
            <RichText
              tagName="span"
              value={ category }
              onChange={ value => setAttributes({ category: value }) }
              inlineToolbar
            />
          </div>
          <RichText
            tagName="h1"
            className="minerva-article-title"
            value={ title }
            onChange={ value => setAttributes({ title: value }) }
          />
          <RichText
            tagName="p"
            className="minerva-article-teaser"
            value={ teaser }
            onChange={ value => setAttributes({ teaser: value }) }
          />
          <div className="minerva-article-author">
            <img alt="" src={ authorImageUrl } className="minerva-article-avatar" />
            <div className="minerva-article-meta">
              <RichText
                tagName="span"
                className="minerva-article-name"
                value={ authorName }
                onChange={ value => setAttributes({ authorName: value }) }
              />
              <RichText
                tagName="span"
                className="minerva-article-date"
                value={ date }
                onChange={ value => setAttributes({ date: value }) }
              />
            </div>
          </div>
        </div>
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, category, date, imageUrl, authorName, authorImageUrl } = attributes;
    const style = backgroundImageStyles(imageUrl);

    return (
      <div className={ className } style={ style }>
        <div className="container">
          <div className="minerva-article-category">
            <RichText.Content
              tagName="span"
              value={ category }
            />
          </div>
          <RichText.Content
            tagName="h1"
            className="minerva-article-title"
            value={ title }
          />
          <RichText.Content
            tagName="p"
            className="minerva-article-teaser"
            value={ teaser }
          />
          <div className="minerva-article-author">
            <img alt="" src={ authorImageUrl } className="minerva-article-avatar" />
            <div className="minerva-article-meta">
              <RichText.Content
                tagName="span"
                className="minerva-article-name"
                value={ authorName }
              />
              <RichText.Content
                tagName="span"
                className="minerva-article-date"
                value={ date }
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
