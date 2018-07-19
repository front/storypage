// External Dependencies
import React from 'react';
import {
  i18n,
  components,
  editor,
} from '@frontkom/gutenberg-js';

import { articleAttributes, formattingControls } from './default-attributes';
import './tertiary.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { PanelBody, TextControl } = components;
const { InspectorControls, RichText } = editor;

export const name = 'minerva/article-tertiary';

export const settings = {
  title: __('Article Tertialy'),

  icon: 'universal-access-alt',

  description: __(' Article Tertialy by Minerva '),

  category: 'minerva',

  attributes: articleAttributes,

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, category, categoryUrl, date, imageUrl, authorName, authorUrl, authorImageUrl, link } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
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
          <RichText
            tagName="span"
            value={ category }
            onChange={ value => setAttributes({ category: value }) }
            formattingControls={formattingControls}
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
              formattingControls={formattingControls}
            />
            <RichText
              tagName="p"
              className="minerva-article-teaser"
              value={ teaser }
              onChange={ value => setAttributes({ teaser: value }) }
              formattingControls={formattingControls}
            />
            <div className="minerva-article-author">
              <img alt="" src={ authorImageUrl } className="minerva-author-avatar" />
              <div className="minerva-article-meta">
                <RichText
                  tagName="span"
                  className="minerva-author-name"
                  value={ authorName }
                  onChange={ value => setAttributes({ authorName: value }) }
                  formattingControls={formattingControls}
                />
                <RichText
                  tagName="span"
                  className="minerva-article-date"
                  value={ date }
                  onChange={ value => setAttributes({ date: value }) }
                  formattingControls={formattingControls}
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
    const { title, teaser, category, categoryUrl, date, imageUrl, authorName, authorUrl, authorImageUrl, link } = attributes;

    return (
      <div className={ className }>
        <div className="minerva-article-category">
          <a href={ categoryUrl }>
            <RichText.Content
              tagName="span"
              value={ category }
            />
          </a>
        </div>
        <div className="minerva-article-content">
          <div>
            <a href={ link }>
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
            </a>
            <div className="minerva-article-author">
              <a href={ authorUrl }>
                <img alt="" src={ authorImageUrl } className="minerva-author-avatar" />
              </a>
              <div className="minerva-article-meta">
                <a href={ authorUrl }>
                  <RichText.Content
                    tagName="span"
                    className="minerva-author-name"
                    value={ authorName }
                  />
                </a>
                <RichText.Content
                  tagName="span"
                  className="minerva-article-date"
                  value={ date }
                />
              </div>
            </div>
          </div>
          <a href={ link }>
            <img alt="" src={ imageUrl } className="minerva-article-image" />
          </a>
        </div>
      </div>
    );
  },
};
