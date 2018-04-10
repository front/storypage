// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Internal Dependencies
import ArticlesIndex from './articles';
import CategoriesIndex from './categories';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to StoryPage</h1>
				<nav><Link to="/pages">Check all pages</Link></nav>

				<h2>Fake Resources</h2>
				<hr />
				<ArticlesIndex />
				<hr />
				<CategoriesIndex />
			</div>
		);
	}
}

export default App;
