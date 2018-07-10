/**
 * External Dependencies
 */
import { i18n, blocks, data } from '@frontkom/gutenberg';

/**
 * Internal Dependencies
 */
import * as article from './article';

const { __ } = i18n;
const { registerBlockType } = blocks;

export const initComputerworld = () => {
	// Append the CW blocks to the categories
	const categories = [
		{
			slug: 'cw',
			title: __( 'CW Blocks' ),
		},
		...data.select( 'core/blocks' ).getCategories(),
	];
	data.dispatch( 'core/blocks' ).setCategories( categories );

	// registering CW Blocks
	[
		article,
	].forEach( ( { name, settings } ) => {
		registerBlockType( name, settings );
	} );
};
