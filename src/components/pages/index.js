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
    this.props.fetchPosts({ status: 'all', order: 'desc', orderby: 'id' });
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
      const badgeType = post.type === 'page' ? 'info' : 'secondary';

      return (
        <tr key={ post.id }>
          <td><span className={ `badge badge-${badgeType}` }>{ post.type }</span></td>
          <td>{ this.renderPostTitle(post) }</td>
          <td className="text-right">
            <a className="btn btn-sm btn-outline-secondary " href={ post.preview_link } target="_blank">Preview</a>{ ' ' }
            <Link className="btn btn-sm btn-outline-secondary " to={ `/${post.type}s/${post.id}/edit` } target="_blank">Edit</Link>{ ' ' }
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
            <h1>Stories</h1>
            <div className="text-right">
              <Link className="btn btn-outline-secondary float-left" to="/">Go back</Link>
              <Link className="btn btn-secondary" to="/posts/new" target="_blank">New post</Link>{ ' ' }
              { /* <Link className="btn btn-info" to="/pages/new">New page</Link> */ }
              <div className="dropdown d-inline">
                <a className="btn btn-info dropdown-toggle" href="#" role="button" id="pagesDropdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  New page
                </a>
                <div className="dropdown-menu" aria-labelledby="pagesDropdownLink">
                  <Link className="dropdown-item" to="/pages/new" target="_blank">Template free</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/pages/new?template=minerva" target="_blank">Minerva template</Link>
                  <a className="dropdown-item disabled" href="#">CW template (soon)</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
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
