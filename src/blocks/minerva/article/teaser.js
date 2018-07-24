// External Dependencies
import React from 'react';
import {
  i18n,
  components,
  editor,
} from '@frontkom/gutenberg-js';

import { articleAttributes, formattingControls } from './default-attributes';
import './teaser.scss';

/**
* WordPress dependencies
*/
const { __ } = i18n;
const { PanelBody, TextControl } = components;
const { InspectorControls, RichText } = editor;

export const name = 'minerva/article-teaser';

export const settings = {
  title: __('Article Teaser'),
  icon: 'list-view',
  description: __(' Article Teaser by Minerva '),
  category: 'minerva',

  attributes: articleAttributes,

  edit ({ attributes, className, setAttributes }) {
    const { title, teaser, date, author, authorUrl, authorImageUrl, link } = attributes;

    return (
      <div className={ className }>
        <InspectorControls>
          <PanelBody title={ __('Article Primary Settings') }>
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
              value={ author }
              onChange={ value => setAttributes({ author: value }) }
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
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, date, author, authorUrl, authorImageUrl, link } = attributes;

    return (
      <div className={ className }>
        <a href={ link }>
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
                value={ author }
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
    );
  },
  draggablePost: true,
};
