import React from 'react';
import { initializeEditor } from 'gutenberg';

class GutenbergEditor extends React.Component {
	componentDidMount() {
		initializeEditor( 'editor', this.props.post, this.props.settings );
	}

	render() {
		return (
			<div className="gutenberg">
				<div id="editor" className="gutenberg__editor"></div>
			</div>
		);
	}
}

export default GutenbergEditor;
