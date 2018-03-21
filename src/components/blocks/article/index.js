import React from 'react';
import classnames from 'classnames';

import { 
	IconButton,
	PanelBody,
	RangeControl,
	ToggleControl,
    Toolbar,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

// cover image style
import './editor.scss';
import './style.scss';

import { createBlock } from '@wordpress/blocks/api';

import { 
	RichText,
	AlignmentToolbar,
	MediaUpload,
	ImagePlaceholder,
	BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
} from '@wordpress/blocks';

const validAlignments = [ 'left', 'center', 'right', 'wide', 'full' ];

export const name = 'sp/article';

export const settings = {
	title: 'Article',
	
	description: __( 'Article has an image and a title.' ),

	icon: 'universal-access-alt',

	category: 'layout',

	attributes: {
        title: {
            type: 'array',
            source: 'children',
            selector: 'h2',
        },
        url: {
			type: 'string',
		},
		textAlign: {
			type: 'string',
			default: 'center',
		},
		id: {
			type: 'number',
		},
		hasParallax: {
			type: 'boolean',
			default: false,
		},
		dimRatio: {
			type: 'number',
			default: 0,
		}
    },

    edit( { attributes, setAttributes, isSelected, className } ) {
        const { url, title, textAlign, id, hasParallax, dimRatio } = attributes;
		
		const updateAlignment = ( nextAlign ) => setAttributes( { align: nextAlign } );
		const onSelectImage = ( media ) => setAttributes( { url: media.url, id: media.id } );
		const toggleParallax = () => setAttributes( { hasParallax: ! hasParallax } );
		const setDimRatio = ( ratio ) => setAttributes( { dimRatio: ratio } );

        const style = url ? { backgroundImage: `url(${ url })` } : undefined;

        const classes = classnames(className, dimRatioToClass( dimRatio ), {
				'has-background-dim': dimRatio !== 0,
				'has-parallax': hasParallax,
			}
		);

  		const alignmentToolbar	= (
			<AlignmentToolbar
				value={ textAlign }
				onChange={ ( nextAlign ) => {
					setAttributes( { textAlign: nextAlign } );
				} }
			/>
		);

		const controls = isSelected && [
			<BlockControls key="controls">
				{ alignmentToolbar }
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ id }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit image' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			</BlockControls>,
			<InspectorControls key="inspector">
				<h2>{ __( 'Article Image Settings' ) }</h2>
				<ToggleControl
					label={ __( 'Fixed Background' ) }
					checked={ !! hasParallax }
					onChange={ toggleParallax }
				/>
				<RangeControl
					label={ __( 'Background Dimness' ) }
					value={ dimRatio }
					onChange={ setDimRatio }
					min={ 0 }
					max={ 100 }
					step={ 10 }
				/>
				<PanelBody title={ __( 'Text Alignment' ) }>
					{ alignmentToolbar }
				</PanelBody>
			</InspectorControls>
		];

		const richText = (
			<RichText
			    key="title"
				tagName="h2"
				placeholder={ __( 'Write title…' ) }
				value={ title }
				style={ { textAlign: textAlign } }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				isSelected={ isSelected }
				inlineToolbar
			/>
		);

        if (!url) {
    		const icon = 'format-image';
    		const label = __( 'Article image' );
    		
    		return [
    			controls,
    			<ImagePlaceholder
        			key="cover-image-placeholder"
        			{ ...{ className, icon, label, onSelectImage } }
        		/>,
        		richText
        	]
    	} 
    	
    	return [
			controls,
    		<section
				key="preview"
				data-url={ url }
				style={ style }
				className={ classes }
			/ >,
			(title || isSelected ? richText : null ),
		]
    },

    save( { attributes, className } ) {
        const { title, alignment, url, id, hasParallax, dimRatio } = attributes;
        const style = url ? { backgroundImage: `url(${ url })` } : undefined;

        const classes = classnames(className, dimRatioToClass( dimRatio ), {
				'has-background-dim': dimRatio !== 0,
				'has-parallax': hasParallax,
			},
		);

        return (
        	<div>
        		<section className={ classes } style={ style }></section>
        		<h2 style={ { textAlign: alignment } }>{ title }</h2>
        	</div>
        )
    },
}

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}