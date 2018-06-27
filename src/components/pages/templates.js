// import { isEmpty } from 'lodash';

export default function getTemplates( { type/*, posts*/ } ) {
	const testing = false;
	if ( testing && type === 'page' /*&& ! isEmpty( posts ) && posts.length >= 6 */ ) {
		return [
			[ 'storypage/section', { }, [
				[ 'core/paragraph', { placeholder: 'Add content' } ],
			] ],
		];
	}

	return '';
}
