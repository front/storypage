import React from 'react';
import classnames from 'classnames';

// import CoverImage from '@wordpress/blocks/library/cover-image/block';
import { 
	RichText,
	ImagePlaceholder,
	source,
	BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
    MediaUpload,
    InspectorControls
} from '@wordpress/blocks';

import { 
	IconButton,
	RangeControl,
	ToggleControl,
    Toolbar,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

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
        alignment: {
            type: 'string',
        },
        url: {
			type: 'string',
		},
		align: {
			type: 'string',
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
			default: 50,
		}
    },

    transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/heading' ],
				transform: ( { content } ) => (
					createBlock( 'sp/article', { title: content } )
				),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/heading', 'core/cover-image' ],
				transform: ( { title, url, align, id, hasParallax, dimRatio } ) => (
					createBlock( 'core/cover-image', { title, url, align, id, hasParallax, dimRatio  } )
				),
			},
		],
	},

    edit( { attributes, setAttributes, isSelected, className } ) {
        const { title, alignment, url, align, id, hasParallax, dimRatio } = attributes;

        // Text events
        // const onChangeTitleAlignment = ( nextAlign ) => { setAttributes( { alignment: nextAlign } )};

        // Image events
        const updateAlignment = ( nextAlign ) => setAttributes( { align: nextAlign } );
        const onSelectImage = ( media ) => setAttributes( { url: media.url, id: media.id } );
		const setDimRatio = ( ratio ) => setAttributes( { dimRatio: ratio } );

        const style = url ? { backgroundImage: `url(${ url })` } : undefined;

        const classes = classnames(className, dimRatioToClass( dimRatio ), {
				'has-background-dim': dimRatio !== 0,
				'has-parallax': hasParallax,
			}
		);

		const richText = isSelected && [
            <RichText
                key="editable-text"
                tagName="p"
                className={ className }
                style={ { textAlign: alignment } }
                onChange={ ( title ) => { setAttributes( { title: title } ) } }
                value={ title }
            />
        ];

		const controls = isSelected && [
			<BlockControls key="controls">
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
				<h2>{ __( 'Cover Image Settings a' ) }</h2>
				<ToggleControl
					label={ __( 'Fixed Background' ) }
					checked={ !! hasParallax }
					onChange={ () => setAttributes( { hasParallax: ! hasParallax } ) }
				/>
				<RangeControl
					label={ __( 'Background Dimness' ) }
					value={ dimRatio }
					onChange={ setDimRatio }
					min={ 0 }
					max={ 100 }
					step={ 10 }
				/>
			</InspectorControls>
		];


        if (!url) {
    		const icon = 'format-image';
    		const label = __( 'Article image' );
    		
    		return [
    			// controls,
    			<ImagePlaceholder
        			key="cover-image-placeholder"
        			{ ...{ className, icon, label, onSelectImage } }
        		/>,
        		// richText
        	]
    	} else {
    		return [
    			// controls,
        		<section
					key="preview"
					data-url={ url }
					style={ style }
					className={ classes }
				/>,
				// richText
			]
    	}
    },

    save( { attributes, className } ) {
        const { title, alignment, url, align, id, hasParallax, dimRatio } = attributes;
        const style = url ? { backgroundImage: `url(${ url })` } : undefined;

        const classes = classnames(className, dimRatioToClass( dimRatio ), {
				'has-background-dim': dimRatio !== 0,
				'has-parallax': hasParallax,
			},
			align ? `align${ align }` : null,
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