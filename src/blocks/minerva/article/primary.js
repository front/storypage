// External Dependencies
import React from 'react';
import {
  i18n,
  components,
  editor,
} from '@frontkom/gutenberg-js';

// Internal Dependencies
import { articleAttributes, backgroundImageStyles, formattingControls } from './default-attributes';
import './primary.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { PanelBody, TextControl } = components;
const { InspectorControls, RichText } = editor;

export const name = 'minerva/article-primary';

export const settings = {
  title: __('Article Primary'),
  icon: 'universal-access-alt',
  description: __('Article Primary by Minerva'),

  category: 'minerva',

  attributes: articleAttributes,

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, category, categoryUrl, date, imageUrl, authorName, authorUrl, authorImageUrl, link } = attributes;
    const style = backgroundImageStyles(imageUrl);

    return (
      <div className={ className } style={ style }>
        <InspectorControls>
          <PanelBody title={ __('Article Primary Settings') }>
            <TextControl
              value={ categoryUrl }
              label={ __('Category URL') }
              onChange={ value => setAttributes({ categoryUrl: value }) }
            />
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

        <div className="container">
          <div className="minerva-article-category">
            <RichText
              tagName="span"
              value={ category }
              onChange={ value => setAttributes({ category: value }) }
              formattingControls={formattingControls}
              inlineToolbar
            />
          </div>
          <RichText
            tagName="h1"
            className="minerva-article-title"
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
              <RichText
                tagName="span"
                className="minerva-author-name"
                value={ authorName }
                onChange={ value => setAttributes({ authorName: value }) }
                formattingControls={formattingControls}
                inlineToolbar
              />
              <RichText
                tagName="span"
                className="minerva-article-date"
                value={ date }
                onChange={ value => setAttributes({ date: value }) }
                formattingControls={formattingControls}
                inlineToolbar
              />
            </div>
          </div>
        </div>
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, category, categoryUrl, date, imageUrl, authorName, authorUrl, authorImageUrl, link } = attributes;
    const style = backgroundImageStyles(imageUrl);

    return (
      <div className={ className } style={ style }>
        <div className="container">
          <div className="minerva-article-category">
            <a href={ categoryUrl }>
              <RichText.Content
                tagName="span"
                value={ category }
              />
            </a>
          </div>
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
      </div>
    );
  },
};
