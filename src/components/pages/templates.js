import { isEmpty } from 'lodash';

export default function getTemplates( { type, posts } ) {
	if ( type === 'page' && ! isEmpty( posts ) ) {
		return [
			[ 'rows/col4-col4-col4', { }, [
				[ 'custom/post', {
					layout: 'column-1 col4',
					title: [ posts[ 0 ].title.rendered ],
					mediaId: posts[ 0 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'column-2 col4',
					title: [ posts[ 1 ].title.rendered ],
					mediaId: posts[ 1 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'column-3 col4',
					title: [ posts[ 2 ].title.rendered ],
					mediaId: posts[ 2 ].featured_media,
				} ],
			] ],	
			[ 'rows/col4-col4-col4', { }, [ 
				[ 'custom/post', { 
					layout: 'column-1 col4',
					title: [ posts[ 3 ].title.rendered ],
					mediaId: posts[ 3 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'column-2 col4',
					title: [ posts[ 4 ].title.rendered ],
					mediaId: posts[ 4 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'column-3 col4',
					title: [ posts[ 5 ].title.rendered ],
					mediaId: posts[ 5 ].featured_media,
				} ], 
			] ],
		];
	}

	return '';
}
