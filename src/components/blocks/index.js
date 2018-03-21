import { registerBlockType } from '@wordpress/blocks/api';

import * as article from './article';

export const registerCustomBlocks = () => {
	[
		article
	].forEach( ( { name, settings } ) => {
		registerBlockType( name, settings );
	} );

	// setDefaultBlockName( paragraph.name );
	// setUnknownTypeHandlerName( freeform.name );
};