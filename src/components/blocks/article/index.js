import React from 'react';
import classnames from 'classnames';

import { 
	IconButton,
	PanelBody,
	PanelColor,
	RangeControl,
	ToggleControl,
    Toolbar,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import './editor.scss';
import './style.scss';

import { 
	AlignmentToolbar,
    BlockAlignmentToolbar,
	BlockControls,
	ColorPalette,
	ImagePlaceholder,
    InspectorControls,
	MediaUpload,
	RichText,
} from '@wordpress/blocks';

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
            selector: 'p',
        },
        url: {
			type: 'string',
		},
		textAlign: {
			type: 'string',
			default: 'left',
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
		},	
		dropCap: {
			type: 'boolean',
			default: false,
		},
		textColor: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		fontSize: {
			type: 'number',
			default: 20
		},
    },

    edit( { attributes, setAttributes, isSelected, className } ) {
        const { url, title, textAlign, id, hasParallax, dimRatio, dropCap, textColor, backgroundColor, fontSize } = attributes;
		
		// image events
		const updateAlignment = ( nextAlign ) => setAttributes( { align: nextAlign } );
		const onSelectImage = ( media ) => setAttributes( { url: media.url, id: media.id } );
		const toggleParallax = () => setAttributes( { hasParallax: ! hasParallax } );
		const setDimRatio = ( ratio ) => setAttributes( { dimRatio: ratio } );

		// text events
		const toggleDropCap = () => { setAttributes( { dropCap: ! dropCap } )};

        const style = url ? { backgroundImage: `url(${ url })` } : undefined;

        const classes = classnames('wp-block-cover-image', dimRatioToClass( dimRatio ), {
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
				<PanelBody title={ __( 'Text Settings' ) }>
					<ToggleControl
						label={ __( 'Drop Cap' ) }
						checked={ !! dropCap }
						onChange={ toggleDropCap }
					/>
					<RangeControl
						label={ __( 'Font Size' ) }
						value={ fontSize || '' }
						onChange={ ( value ) => setAttributes( { fontSize: value } ) }
						min={ 10 }
						max={ 200 }
						beforeIcon="editor-textcolor"
						allowReset
					/>
					{ alignmentToolbar }
				</PanelBody>
				<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor } initialOpen={ false }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						value={ textColor }
						onChange={ ( colorValue ) => setAttributes( { textColor: colorValue } ) }
					/>
				</PanelColor>
			</InspectorControls>
		];

		const richText = (
			<RichText
			    key="title"
				tagName="p"
				placeholder={ __( 'Write a title…' ) }
				value={ title }
				style={ { 
					backgroundColor: backgroundColor,
					color: textColor,
					fontSize: fontSize ? fontSize + 'px' : undefined,
					textAlign: textAlign 
				} }
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
    	const { url, title, textAlign, id, hasParallax, dimRatio, dropCap, textColor, backgroundColor, fontSize } = attributes;
		
        const imageStyle = url ? { backgroundImage: `url(${ url })` } : undefined;
        const imageClasses = classnames('wp-block-cover-image', dimRatioToClass( dimRatio ), {
				'has-background-dim': dimRatio !== 0,
				'has-parallax': hasParallax,
			},
		);

		const textStyle = {
        	backgroundColor: backgroundColor,
			color: textColor,
			fontSize: fontSize ? fontSize + 'px' : undefined,
			textAlign: textAlign 
        };

        const textClasses = classnames( {
			'has-background': backgroundColor,
			'has-drop-cap': dropCap,
		} );

        return (
        	<div className={ className }>
        		<section className={ imageClasses } style={ imageStyle }></section>
        		<p className={ textClasses } style={ textStyle }>{ title }</p>
        	</div>
        )
    },
}

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}