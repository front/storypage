// External Dependencies
import React from 'react';
import {
	i18n,
	editor,
} from '@frontkom/gutenberg';

const { __ } = i18n;
const {
	RichText,
} = editor;

import './style.scss';

// Block attriutes
const attributes = {
	title: {
		type: 'array',
		source: 'children',
		selector: 'h2',
		default: 'Test din app',
	},
	teaser: {
		type: 'array',
		source: 'children',
		selector: 'p',
		default: 'Alle, fra butikken nedi gata til TV-kanalene, satser på interaksjon via mobile applikasjoner for å knytte sitt publikum nærmere til seg.',
	},
	image: {
		type: 'string',
		default: 'https://placeimg.com/600/280/people/grayscale',
	},
};

// Block name and settings
export const name = 'computerword/advert';

export const settings = {
	title: __( 'CW Advert' ),
	description: __( ' Advertisement by ComputerWorld ' ),
	icon: 'universal-access-alt',

	category: 'cw',
	attributes,

	edit( { attributes: attr, className, setAttributes } ) {
		const { title, teaser } = attr;
		return (
			<div className={ className }>
				<article className="cw-article cw-advert-article">
					<span>
						<figure>
							<img src="http://static.cw.newsfront.no/sites/default/files/styles/crop_image_main_medium/public/img/mobile-copy-1024x522.jpg" alt="" />
						</figure>
						<RichText
							tagName="h2"
							value={ title }
							onChange={ value => setAttributes( { title: value } ) }
							inlineToolbar
						/>
						<RichText
							tagName="p"
							className="teaser"
							value={ teaser }
							onChange={ value => setAttributes( { teaser: value } ) }
							inlineToolbar
						/>
					</span>
					<span className="readmore">les mer</span>
				</article>
			</div>
		);
	},

	save( { attributes: attr, className } ) {
		const { title, teaser } = attr;
		return (
			<div className={ className }>
				<article className="cw-article cw-advert-article">
					<a href="http://www.google.com">
						<figure>
							<img src="http://static.cw.newsfront.no/sites/default/files/styles/crop_image_main_medium/public/img/mobile-copy-1024x522.jpg" alt="" />
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
