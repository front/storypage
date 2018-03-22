import { registerBlockType } from '@wordpress/blocks/api';

import * as article from './article';
import * as row_6_6 from './layout/6-6';
import * as row_4_4_4 from './layout/4-4-4';

export const registerCustomBlocks = () => {
	[
		article,
		row_6_6,
		row_4_4_4,
	].forEach( ( { name, settings } ) => {
		registerBlockType( name, settings );
	} );

	// setDefaultBlockName( paragraph.name );
	// setUnknownTypeHandlerName( freeform.name );
};