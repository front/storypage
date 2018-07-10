export const articleAttributes = {
	title: {
		type: 'array',
		source: 'children',
		selector: 'h1,h2,h3,h4,h5,h6',
		default: 'Title',
	},
	teaser: {
		type: 'array',
		source: 'children',
		selector: 'p',
		default: 'Teaser',
	},		
	category: {
		type: 'string',
		default: 'Category',
	},
	date: {
		type: 'string',
		default: '03. juli 2018',
	},
	imageUrl: {
		type: 'string',
		default: 'https://www.minervanett.no/wp-content/uploads/2018/07/Sologne.jpg',
	},
	authorName: {
		type: 'string',
		default: 'Aksel Fridstrøm',
	},
	authorImageUrl: {
		type: 'string',
		default: 'https://www.minervanett.no/wp-content/uploads/2018/01/Aksel-128x128.jpg',
	},
};	

export const backgroundImageStyles = ( url ) => {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
};
