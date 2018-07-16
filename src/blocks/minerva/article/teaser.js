// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';

import { articleAttributes } from './default-attributes';
import './teaser.scss';

/**
* WordPress dependencies
*/
const { __ } = i18n;
const {
 RichText,
} = editor;

export const name = 'minerva/article-teaser';

export const settings = {
  title: __('Article Teaser'),
  icon: 'universal-access-alt',
  description: __(' Article Teaser by Minerva '),
  category: 'minerva',

  attributes: articleAttributes,

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, date, authorName, authorImageUrl } = attributes;

    return (
      <div className={ className }>
        <RichText
          tagName="h2"
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
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, date, authorName, authorImageUrl } = attributes;

    return (
      <div className={ className }>
        <RichText.Content
          tagName="h2"
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
    );
  }
};
