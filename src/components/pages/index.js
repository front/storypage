// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, isEmpty, mapKeys, mapValues } from 'lodash';

// Internal Dependencies
import { fetchPosts, savePost, deletePost } from '../../store/actions';
import InputNSubmit from '../form/input-n-submit';

class PagesIndex extends React.Component {
  constructor (props) {
    super(props);

    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);

    this.state = {
      titles: {},
    };
  }

  componentDidMount () {
    this.props.fetchPosts({ status: 'all', order: 'desc', orderby: 'id', type: 'page' });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.posts !== this.props.posts) {
      const newTitles = mapValues(mapKeys(this.props.posts, 'id'), ({ id }) => (this.state.titles[ id ] || false));

      this.setState({ titles: newTitles });
    }
  }

  onDeleteButtonClick (event) {
    const postId = event.target.value;
    this.props.deletePost(postId);
  }

  toogleTitle (postId, state) {
    const newTitles = this.state.titles;
    newTitles[ postId ] = state;
    this.setState({ titles: newTitles });
  }

  saveTitle (postId, title) {
    this.props.savePost({ id: postId, title });
    this.toogleTitle(postId, false);
  }

  renderPosts () {
    if (isEmpty(this.props.posts)) {
      return <tr><td colSpan="3">No results</td></tr>;
    }

    return map(this.props.posts, post => {
      return (
        <tr key={ post.id }>
          <td>{ this.renderPostTitle(post) }</td>
          <td className="text-right">
            <a className="btn btn-sm btn-outline-secondary " href={ post.preview_link } target="_blank" rel="noopener noreferrer">Preview</a>{ ' ' }
            <Link className="btn btn-sm btn-outline-secondary " to={ `/${post.type}s/${post.id}/edit` } target="_blank" rel="noopener noreferrer">Edit</Link>{ ' ' }
            <button className="btn btn-sm btn-outline-danger" value={ post.id } onClick={ this.onDeleteButtonClick }>Delete</button>
          </td>
        </tr>
      );
    });
  }

  renderPostTitle (post) {
    if (post && this.state.titles[ post.id ]) {
      return (
        <InputNSubmit
          key={ post.id }
          value={ post.title.rendered }
          onSubmit={ newContent => {
            this.saveTitle(post.id, newContent);
          } }
          onCancel={ () => {
            this.toogleTitle(post.id, false);
          } }
        />
      );
    }
    return <button onClick={ () => {
      this.toogleTitle(post.id, true);
    } }>{ post.title.rendered }</button>;
  }

  render () {
    return (
      <div>
        <section className="jumbotron">
          <div className="container">
            <h1>Pages</h1>
            <div className="text-right">
              <Link className="btn btn-outline-secondary float-left" to="/">Go back</Link>

              <Link className="btn btn-info" to="/pages/new?template=minerva" target="_blank" rel="noopener noreferrer">Minerva template</Link>{ ' ' }
              <Link className="btn btn-info" to="/pages/new" target="_blank" rel="noopener noreferrer">Template free</Link>
            </div>
          </div>
        </section>

        <section className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.renderPosts() }
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, { fetchPosts, savePost, deletePost })(PagesIndex);
