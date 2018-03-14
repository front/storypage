import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to StoryPage</h1>
				<Link to="/posts">Check all posts</Link>
			</div>
		);
	}
}

export default App;
