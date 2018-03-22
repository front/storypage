import { registerBlockType } from '@wordpress/blocks/api';

import * as article from './article';
import * as layout_6_6 from './layout/6-6';

export const registerCustomBlocks = () => {
	[
		article,
		layout_6_6,
	].forEach( ( { name, settings } ) => {
		registerBlockType( name, settings );
	} );

	// setDefaultBlockName( paragraph.name );
	// setUnknownTypeHandlerName( freeform.name );
};