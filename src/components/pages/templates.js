import { isEmpty } from 'lodash';

export default function getTemplates( { type, posts } ) {
	if ( type === 'page' && ! isEmpty( posts ) && posts.length >= 6 ) {
		return [
			[ 'rows/col4-col4-col4', { }, [
				[ 'custom/post', {
					layout: 'col4 column-start1',
					title: [ posts[ 0 ].title.rendered ],
					id: posts[ 0 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'col4 column-start5',
					title: [ posts[ 1 ].title.rendered ],
					id: posts[ 1 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'col4 column-start9',
					title: [ posts[ 2 ].title.rendered ],
					id: posts[ 2 ].featured_media,
				} ],
			] ],	
			[ 'rows/col7-col5', { }, [ 
				[ 'custom/post', { 
					layout: 'col7 column-start1',
					title: [ posts[ 3 ].title.rendered ],
					id: posts[ 3 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'col5 column-start8',
					title: [ posts[ 4 ].title.rendered ],
					id: posts[ 4 ].featured_media,
				} ],
				[ 'custom/post', { 
					layout: 'col5 column-start8',
					title: [ posts[ 5 ].title.rendered ],
					id: posts[ 5 ].featured_media,
				} ],
			] ],
		];
	}

	return '';
}
