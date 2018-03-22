import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to StoryPage</h1>
				<p><Link to="/pages">Check all pages</Link></p>
			</div>
		);
	}
}

export default App;
