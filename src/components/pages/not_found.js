// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <section className="jumbotron">
        <div className="container">
          <h1>Oops... Page Not Found!</h1>
          <p className="text-left">
            <Link className="btn btn-outline-secondary" to="/pages">Go to Pages</Link>
          </p>
        </div>
      </section>
    </div>
  );
};
