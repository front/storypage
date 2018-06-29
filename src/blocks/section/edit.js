// External Dependencies
import React, { Fragment } from 'react';
import { 
	i18n,
	components,
	editor,
	element,
	storypage,
} from '@frontkom/gutenberg';
import classnames from 'classnames';

const { __ } = i18n;
const { compose } = element;
const {
	IconButton,
	PanelBody,
	RangeControl,
	ToggleControl,
	Toolbar,
	withFallbackStyles,
} = components;
const {
	getColorClass,
	withColors,
	AlignmentToolbar,	
	BlockAlignmentToolbar,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	PanelColor,
	PostTypeSupportCheck,
	RichText,
} = editor;

const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

class SectionBlockEdit extends React.Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.toggleImage = this.toggleImage.bind( this );
		this.toggleParallax = this.toggleParallax.bind( this );
		this.setDimRatio = this.setDimRatio.bind( this );
	}

	toggleImage() {
		this.props.setAttributes( { hasImage: ! this.props.attributes.hasImage } )
	}

	onSelectImage( media ) {
		if ( ! media || ! media.url ) {
			this.props.setAttributes( { url: undefined, id: undefined } );
			return;
		}

		this.props. setAttributes( { url: media.url, id: media.id } );

		if ( media.data ) {
			this.updateData( media.data );
		}
	}

	toggleParallax() { 
		this.props.setAttributes( { hasParallax: ! this.props.attributes.hasParallax } );
	}

	setDimRatio( ratio ) { 
		this.props.setAttributes( { dimRatio: ratio } );
	}

	updateData( nextData ) {
		nextData = reduce( nextData, ( result, value, key ) => {
			key = key.replace( '_', '-' );
			result[ `data-${ key }` ] = value;

			return result;
		}, {} );

		this.props.setAttributes( { data: nextData } );
	}

	render() {
		const {
			attributes,
			setAttributes,
			className,
			backgroundColor,
			setBackgroundColor,
			fallbackBackgroundColor,
		} = this.props;

		const {
			hasImage,
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
				}
			);
		} else {
			style = { backgroundColor: backgroundColor.class ? undefined : backgroundColor.value }
			classes = classnames(
				className, {
					'has-background': backgroundColor.value,
					[ backgroundColor.class ]: backgroundColor.class,
				},
			);
		}

		const controls = (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<PostTypeSupportCheck supportKeys="media-library">
							<MediaUpload
								onSelect={ this.onSelectImage }
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
						</PostTypeSupportCheck>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings' ) }>
						<ToggleControl
							label={ __( 'Has background image' ) }
							checked={ !! hasImage }
							onChange={ this.toggleImage }
						/>
						{ hasImage && !! url && (
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed Background' ) }
									checked={ !! hasParallax }
									onChange={ this.toggleParallax }
								/>
								<RangeControl
									label={ __( 'Background Dimness' ) }
									value={ dimRatio }
									onChange={ this.setDimRatio }
									min={ 0 }
									max={ 100 }
									step={ 10 }
								/>
							</Fragment>						
						) }

						{
							!hasImage &&
							<PanelColor
								colorValue={ backgroundColor.value }
								initialOpen={ false }
								title={ __( 'Background Color' ) }
								onChange={ setBackgroundColor }
							/>
						}

					</PanelBody>
				</InspectorControls>
			</Fragment>
		);

		if ( !! hasImage && ! url ) {
			return (
				<div>
					{ controls }
					<MediaPlaceholder
						icon="format-image"
						labels={ {
							title: __( 'Background image' ),
							name: __( 'an image' ),
						} }
						onSelect={ this.onSelectImage }
						accept="image/*"
						type="image"
					/>
				</div>
			);
		}

		return (
			<Fragment>
				{ controls }
				<div
					data-url={ url }
					className={ classes }
					style={ style }
					{ ...data }
				>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	}
}

export default compose( 
	withColors( 'backgroundColor' ),
	FallbackStyles,
)( SectionBlockEdit );

export function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

export function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}
