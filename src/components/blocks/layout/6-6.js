import React from 'react';
import { times } from 'lodash';
import classnames from 'classnames';
import memoize from 'memize';

import { __, sprintf } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

import { 
    BlockAlignmentToolbar,
	BlockControls,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/blocks';

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getColumnLayouts = memoize( ( columns ) => {
	return times( columns, ( n ) => ( {
		name: `column-${ n + 1 }`,
		label: sprintf( __( 'Column %d' ), n + 1 ),
		icon: 'columns',
	} ) );
} );

export const name = 'sp/col6-col6';

export const settings = {
	title: 'Layout 2 columns',

	description: __( '2 eq columns layout' ),

	icon: 'columns',

	category: 'layout',

	attributes: {
		columns: {
			type: 'number',
			default: 2
		},
		align: {
			type: 'string'
		}
	},

	getEditWrapperProps( attributes ) {
		const { align } = attributes;

		return { 'data-align': align };
	},

	edit( { attributes, setAttributes, className, focus } ) {
		const { align, columns } = attributes;
		const classes = classnames( className, 'wp-block-columns', `wp-block-columns has-${ columns }-columns` );

		// console.log(getColumnLayouts( columns ));

		return [
			...focus ? [
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						controls={ [ 'wide', 'full' ] }
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>,
			] : [],
			<div className={ classes } key="container">
				<InnerBlocks layouts={ getColumnLayouts( columns ) } />
			</div>,
		];
	},


	save( {attributes} ) {
		const { columns } = attributes;

		return (
			<div className={ `wp-block-columns has-${ columns }-columns` }>
				<InnerBlocks.Content />
			</div>
		);
	}
}