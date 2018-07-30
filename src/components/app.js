// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
  resetLocalStorage () {
    localStorage.removeItem('storypage');
    window.location.reload();
  }

  render () {
    return (
      <div>
        <section className="jumbotron">
          <div className="container">
            <h1>Welcome to the StoryPage Prototype</h1>
            <p>
              This is a ReactJS app consuming live JSON from <strong><Link target="_blank" to="https://www.minervanett.no/" rel="noopener noreferrer">Minervanett.no</Link></strong>.
              To build the UI, we <strong><Link target="_blank" to="https://www.npmjs.com/package/@frontkom/gutenberg-js" rel="noopener noreferrer">ported Gutenberg to JavaScript</Link></strong>, then built our own blocks and functionality on top of that.
              The result is an early version of <strong>StoryPage</strong>: An open source editor for newspaper front pages.
            </p>
            <p className="text-right"><Link className="btn btn-primary" to="/pages">Try it now</Link></p>

            <p>In this prototype all data is stored in your browser's localStorage, click to clear it and start over:</p>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={ () => this.resetLocalStorage() }
            >Clear localStorage</button>

            <h2>How to test the application</h2>
            <h3>Quick test</h3>
            <p>To see some of the main features, just click <strong><Link to="/pages">Try it now</Link></strong>, and create a new page. Click an element to edit, or use the plus (+) button to add new blocks of content! Note that you can drag articles into the page from the sidebar.</p>

            <h3>Full test</h3>
            <ol>
              <li>
                Check our <strong><Link target="_blank" to="https://github.com/front/storypage" rel="noopener noreferrer">Github</Link></strong> repository and follow the <Link target="_blank" to="https://github.com/front/storypage#install" rel="noopener noreferrer">instructions</Link> to install it:
                <ul>
                  <li>Clone our repo <code>git clone git@github.com:front/storypage.git</code></li>
                  <li>Install npm dependencies <code>npm install</code></li>
                  <li>Run the app <code>npm start</code></li>
                </ul>
              </li>
              <li>Check our NPM <strong><Link target="_blank" to="https://www.npmjs.com/package/@frontkom/gutenberg-js" rel="noopener noreferrer">package</Link></strong> for the Gutenberg dependency.</li>
            </ol>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
