// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

// Internal Dependencies
import ResourcesIndex from './resources';

class App extends React.Component {
	render() {
		const resources = [ 'types', 'posts', 'categories' ];

		return (
			<div>
				<section className="jumbotron">
					<div className="container">
						<h1>Welcome to StoryPage POC</h1>
						<p>This is a POC using <Link target="_blank" to="https://www.npmjs.com/package/@frontkom/gutenberg">Gutenberg</Link> package.</p>
						<code>npm install @frontkom/gutenberg</code>
						<p className="text-right"><Link className="btn btn-primary" to="/stories">Try it!</Link></p>

						<hr className="my-4" />

						<p>
							Some resources like <b>Types</b>, <b>Post</b> and <b>Categories</b> are required so editor can work.<br />
							Here are the requests and the data structure of those resources:
						</p>						
					</div>
				</section>

				<section className="container">
					{ map( resources, resource => <ResourcesIndex key={ `resource-${ resource }` } type={ resource } /> ) }
				</section>
			</div>
		);
	}
}

export default App;
