// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';

import { getRandomAdvert } from './search';
import './style.scss';


const { __ } = i18n;
const {
  RichText,
} = editor;


// Block attriutes
const attrs = {
  id: {
    type: 'number',
    default: 0,
  },
  title: {
    type: 'array',
    source: 'children',
    selector: 'h2',
    default: '',
  },
  teaser: {
    type: 'array',
    source: 'children',
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
export const name = 'computerword/advert';

export const settings = {
  title: __('CW Advert'),
  description: __('Advertisements by Computerworld.NO'),
  icon: 'cover-image',

  category: 'cw',
  attributes: attrs,

  edit ({ attributes, className, setAttributes }) {
    const { id, title, teaser, image, caption } = attributes;

    if(!id) {
      getRandomAdvert().then(adv => setAttributes(adv));
      return null;
    }

    return (
      <div className={ className }>
        <article className="cw-article cw-advert-article">
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
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title, teaser, image, caption, link } = attributes;
    return (
      <div className={ className }>
        <article className="cw-article cw-advert-article">
          <a href={ link }>
            <figure>
              <img src={ image } alt={ caption } />
            </figure>
            <h2>{ title }</h2>
            <p className="teaser">{ teaser }</p>
          </a>
          <a className="readmore" href={ link }>les mer</a>
        </article>
      </div>
    );
  },
};
