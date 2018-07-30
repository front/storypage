// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
// import { map } from 'lodash';

// Internal Dependencies
// import ResourcesIndex from './resources';

class App extends React.Component {
  resetLocalStorage () {
    localStorage.removeItem('storypage');
    window.location.reload();
  }

  render () {
    // const resources = [ 'types', 'posts', 'categories' ];

    return (
      <div>
        <section className="jumbotron">
          <div className="container">
            <h1>Welcome to StoryPage POC</h1>
            <p>This is a ReactJS POC using <Link target="_blank" to="https://www.npmjs.com/package/@frontkom/gutenberg-js" rel="noopener noreferrer">Gutenberg JS</Link> package.</p>
            <code>npm install @frontkom/gutenberg-js</code>
            <p className="text-right"><Link className="btn btn-primary" to="/pages">Try it!</Link></p>
            <p>In this POC all data is stored in your browser's localStorage, click to clear it and start over:</p>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={ () => this.resetLocalStorage() }
            >Clear localStorage</button>

            { /* <hr className="my-4" />

						<p>
							Some resources like <b>Types</b>, <b>Post</b> and <b>Categories</b> are required so editor can work.<br />
							Here are the requests and the data structure of those resources:
						</p> */ }
          </div>
        </section>

        { /* <section className="container">
					{ map( resources, resource => <ResourcesIndex key={ `resource-${ resource }` } type={ resource } /> ) }
				</section> */ }
      </div>
    );
  }
}

export default App;
