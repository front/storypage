// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';

import { articleAttributes } from './index';
import './tertiary.scss';
/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { 
  RichText,
} = editor;

export const name = 'minerva/article-tertiary';

export const settings = {
  title: __('Article Tertialy'),

  icon: 'universal-access-alt',

  description: __(' Article Tertialy by Minerva '),

  category: 'minerva',

  attributes: articleAttributes,

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, category, date, imageUrl, authorName, authorImageUrl } = attributes;

    return (
      <div className={ className }>
        <div className="minerva-article-category">
          <RichText
            tagName="span"
            value={ category }
            onChange={ value => setAttributes({ category: value }) }
            inlineToolbar
          />	
        </div>
        <div className="minerva-article-content">
          <div>
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
            <div className="minerva-article-author meta">
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
          <img alt="" src={ imageUrl } className="minerva-article-image" />
        </div>
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, category, date, imageUrl, authorName, authorImageUrl } = attributes;

    return (
      <div className={ className }>
        <div className="minerva-article-category">
          <RichText.Content
            tagName="span"
            value={ category }
          />
        </div>
        <div className="minerva-article-content">
          <div>
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
            <div className="minerva-article-author meta">
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
          <img alt="" src={ imageUrl } className="minerva-article-image" />
        </div>
      </div>
    );
  },
};
