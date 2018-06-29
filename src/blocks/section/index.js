// External Dependencies
import React, { Fragment } from 'react';
import { 
	i18n,
	components,
	editor,
	storypage,
} from '@frontkom/gutenberg';
import classnames from 'classnames';

// Internal Dependences
import edit, {
	dimRatioToClass,
	backgroundImageStyles,
} from './edit';

import './style.scss';

const { __ } = i18n;
const {	getColorClass, InnerBlocks } = editor;

const { section } = storypage.blocks;

export const name = 'storypage/section-background';

export const settings = {
	...section.settings,

	title: __( 'Section with background' ),

	attributes: {
		hasImage: {
			type: 'boolean',
			default: false,
		},
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
		},		
		id: {
			type: 'number',
		},
		url: {
			type: 'string',
		},
		hasParallax: {
			type: 'boolean',
			default: false,
		},
		dimRatio: {
			type: 'number',
			default: 50,
		},
		data: {
			type: 'object',
			default: {},
		},
	},

	edit,

	save( { attributes, className } ) {
		const {
			hasImage,
			backgroundColor,
			customBackgroundColor,
			id,
			url,
			hasParallax,
			dimRatio,
			data,
		} = attributes;
		
		let style = {};
		let classes = '';

		if ( !! hasImage ) {
			style = backgroundImageStyles( url );

			classes = classnames(
				className,
				dimRatioToClass( dimRatio ),
				{
					'has-background-dim': dimRatio !== 0,
					'has-parallax': hasParallax,
				},
			);
		} else {
			const backgroundClass = getColorClass( 'background-color', backgroundColor );

			classes = classnames( {
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
			} );

			style = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			};
		}

		return (
			<div className={ classes } style={ style } { ...data }>
				<InnerBlocks.Content />
			</div>
		);
	},
};
