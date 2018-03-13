import React from 'react';

import GutenbergEditor from './gutenberg_editor';

class App extends React.Component {
	state = {
		post: {
			content: {},
			templates: '',
			title: { raw: 'Title post' },
			type: 'post'
		}
	};

	render() {
		return (
			<GutenbergEditor post={ this.state.post } />
		);
	}
}

export default App;
