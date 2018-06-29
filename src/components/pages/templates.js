export default function getTemplates( { type } ) {
	const testing = false;
	
	if ( testing && type === 'page' ) {
		return [
			[ 'storypage/section', { }, [
				[ 'core/paragraph', { placeholder: 'Add content' } ],
			] ],
		];
	}

	return '';
}
