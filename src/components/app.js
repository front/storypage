// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';

// Internal Dependencies
import ResourcesIndex from './resources';

class App extends React.Component {
	render() {
		const resources = [ 'types', 'articles', 'categories' ];

		return (
			<div className="container">
				<section>
					<h1>Welcome to StoryPage POC</h1>
					<p>This is a POC using <em>Gutenberg package</em> ( <code>npm install @frontkom/gutenberg</code> )</p>

					<p className="text-center">
						<Link className="btn btn-primary" to="/pages">Try it!</Link>
					</p>
				</section>

				<section>	
					<p>Some resources like <b>Types</b>, <b>Articles</b> and <b>Categories</b> are requiered so editor can work.</p>
					<p>Here are the requests and the data structure of those resources:</p>
				</section>

				{ map( resources, resource => <ResourcesIndex key={ `resource-${ resource }` } type={ resource } /> ) }
			</div>
		);
	}
}

export default App;
