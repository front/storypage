// Internal Dependencies
import apiRequest from './api-request';
import { addQueryArgs } from './url';

window.wp = {
	apiRequest, 
	url: { addQueryArgs },
};

window._wpDateSettings = { l10n: { locale: 'pt_PT' } };

// customize Gutenberg
window.customGutenberg = {
	categories: [
		{ slug: 'rows', title: 'Rows Blocks' },
		{ slug: 'common', title: 'Common Blocks' },
		{ slug: 'formatting', title: 'Formatting' },
		{ slug: 'layout', title: 'Layout Elements' },
		{ slug: 'widgets', title: 'Widgets' },
		{ slug: 'embed', title: 'Embeds' },
		{ slug: 'shared', title: 'Shared Blocks' },
	],
	// rows: [
	// 	{ cols: [ 6, 6 ], title: 'col6 x 2', description: '2 eq columns layout' },
	// 	{ cols: [ 4, 4, 4 ], title: 'col4 x 3', description: '3 eq columns layout' },
	// 	{ cols: [ 7, 5 ], title: 'col7-col5', description: 'A col7 and a col5' },
	// 	{ cols: [ 5, 7 ], title: 'col5-col7', description: 'A col5 and a col7' },
	// 	{ cols: [ 1, 10, 1 ], title: 'col1-col10-col1', description: 'A col1, a col10 and a col1' },
	// 	{ cols: [ 2, 8, 2 ], title: 'col2-col8-col2', description: 'A col2, a col8 and a col2' },
	// ],
	tabs: [
		{
			options: {
				name: 'rows',
				title: 'Rows',
				className: 'editor-inserter__tab',
			},
			tabScrollTop: 0,
			getItemsForTab() {
				return ( item ) => item.category === 'rows';
			},
		},
		{
			options: {
				name: 'blocks',
				title: 'Blocks',
				className: 'editor-inserter__tab',
			},
			tabScrollTop: 0,
			getItemsForTab() {
				return ( item ) => item.category !== 'embed' && item.category !== 'shared' && item.category !== 'rows';
			},
		},
	],
};
