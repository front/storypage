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
		default: 'Wifi-nettverk på flyplasser sikkerhetsrisiko',
	},
	teaser: {
		type: 'array',
		source: 'children',
		selector: 'p',
		default: 'I ytterste konsekvens kan det føre til at fremmede får kontroll over en flyplass og overtar flyplasstyringen, viser rapporten fra PA Consulting Group.',
	},
	image: {
		type: 'string',
		default: 'https://placeimg.com/600/280/people/grayscale',
	},
};

// Block name and settings
export const name = 'computerword/article';

export const settings = {
	title: __( 'CW Article' ),
	description: __( ' Article by ComputerWorld ' ),
	icon: 'universal-access-alt',

	category: 'cw',
	attributes,

	edit( { attributes: attr, className, setAttributes } ) {
		const { title, teaser } = attr;
		return (
			<div className={ className }>
				<article className="cw-article">
					<span>
						<figure>
							<img src="http://static.cw.newsfront.no/sites/default/files/styles/crop_image_landscape_large/public/dcx/flyplass_53723e.jpg" alt="" />
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
				<article className="cw-article">
					<a href="http://www.google.com">
						<figure>
							<img src="http://static.cw.newsfront.no/sites/default/files/styles/crop_image_landscape_large/public/dcx/flyplass_53723e.jpg" alt="" />
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
