// External Dependencies
import React from 'react';
import {
	i18n,
	editor,
} from '@frontkom/gutenberg';


import { attributes } from './index';
import './secondary.scss';
/**
 * WordPress dependencies
 */
const { __ } = i18n;
const { 
	RichText,
} = editor;

export const name = 'minerva/article-secondary';

export const settings = {
	title: __( 'Article Secondary' ),

	icon: 'universal-access-alt',

	description: __( ' Article Secondary by Minerva ' ),

	category: 'minerva',

	attributes,

	edit( { attributes, className, setAttributes } ) {
		const { title, teaser, category, date, authorName, authorImageUrl } = attributes;

		return (
			<div className={ className }>			
				<RichText
					tagName="h1"
					className="minerva-article-title"
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>
				<div className="minerva-article-teaser">
					<div className="minerva-article-category">
						<RichText
							tagName="span"
							value={ category }
							onChange={ ( value ) => setAttributes( { category: value } ) }
						/>
					</div>			
					<RichText
						tagName="p"
						value={ teaser }
						onChange={ ( value ) => setAttributes( { teaser: value } ) }
					/>
				</div>
				<div className="minerva-article-author">
					<img src={ authorImageUrl } className="minerva-article-avatar" />
					<div className="minerva-article-meta">
						<RichText 
							tagName="span"					
							className="minerva-article-name"
							value={ authorName }
							onChange={ ( value ) => setAttributes( { authorName: value } ) }
						/>
						<RichText 
							tagName="span"					
							className="minerva-article-date"
							value={ date }
							onChange={ ( value ) => setAttributes( { date: value } ) }
						/>
					</div>
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { title, teaser, category, date, authorName, authorImageUrl } = attributes;

		return (
			<div className={ className }>
				<RichText.Content 
					tagName="h1"
					className="minerva-article-title"
					value={ title }
				/>
				<div className="minerva-article-teaser">
					<div className="minerva-article-category">
						<RichText.Content
							tagName="span"
							value={ category }
						/>
					</div>
					<RichText.Content 
						tagName="p"					
						value={ teaser }
					/>
				</div>
				<div className="minerva-article-author">
					<img src={ authorImageUrl } className="minerva-article-avatar" />
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
	},
};
