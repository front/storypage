// External Dependencies
import React from 'react';
import {
  i18n,
  editor,
} from '@frontkom/gutenberg-js';

// Internal Dependencies
import './style.scss';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const {
  RichText,
} = editor;

export const name = 'minerva/podcast-box';

export const settings = {
  title: __('Podcast Box'),

  icon: 'universal-access-alt',

  description: __(' Podcast box by Minerva '),

  category: 'minerva',

  attributes: {
    title: {
      type: 'array',
      source: 'children',
      selector: 'h1',
    },
    subtitle: {
      type: 'array',
      source: 'children',
      selector: 'h2',
    },
    teaser: {
      type: 'array',
      source: 'children',
      selector: 'p',
    },
    link: {
      type: 'string',
      default: 'https://www.minervanett.no/podkast/episode-25-kristoffer-egeberg/',
    },
  },

  edit ({ attributes, className, setAttributes }) {
    const { title, subtitle, teaser } = attributes;

    return (
      <div className={ className }>
        <RichText
          tagName="h1"
          className="minerva-podcast-box-title"
          value={ title }
          onChange={ value => setAttributes({ title: value }) }
        />
        <RichText
          tagName="h2"
          className="minerva-podcast-box-subtitle"
          value={ subtitle }
          onChange={ value => setAttributes({ subtitle: value }) }
        />
        <RichText
          tagName="p"
          className="minerva-podcast-box-teaser"
          value={ teaser }
          onChange={ value => setAttributes({ teaser: value }) }
        />
        <div className="minerva-podcast-box-links">
          <a href="">Hør siste episode</a>
          <a href="">Abonner via iTunes</a>
        </div>
      </div>
    );
  },

  save ({ attributes, className }) {
    const { title, subtitle, teaser, link } = attributes;

    return (
      <div className={ className }>
        <RichText.Content
          tagName="h1"
          className="minerva-podcast-box-title"
          value={ title }
        />
        <a href={ link } target="_blank">
          <RichText.Content
            tagName="h2"
            className="minerva-podcast-box-subtitle"
            value={ subtitle }
          />

          <RichText.Content
            tagName="p"
            className="minerva-podcast-box-teaser"
            value={ teaser }
          />
        </a>
        <div className="minerva-podcast-box-links">
          <a href="https://www.minervanett.no/podKast/">Hør siste episode</a>
          <a href="https://itunes.apple.com/no/podcast/minervapodden/id1086075439?l=nb&mt=2">Abonner via iTunes</a>
        </div>
      </div>
    );
  },
};
