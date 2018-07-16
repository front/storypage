// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import queryString from 'query-string';

// Internal Dependencies
import { fetchPost, savePost } from '../../store/actions';
import { getPost } from '../../store/selectors';
import Editor from '../editor';
import Loading from './loading';
import NotFound from './not_found';
import getTemplates from './templates';

let settings = {
  alignWide: true,
  availableTemplates: [],
  allowedBlockTypes: true,
  disableCustomColors: false,
  disablePostFormats: false,
  titlePlaceholder: 'Add title',
  bodyPlaceholder: 'Add content',
  isRTL: false,
  autosaveInterval: 10,
  canPublish: false,
  // canSave: false,
  // canAutosave: false,
};

class PagesEdit extends React.Component {
  state = {
    id: null,
    type: null,
  };

  componentDidMount () {
    let { id } = this.props.match.params;
    const type = this.props.match.params[ 0 ].slice(0, -1);

    if (id) {
      this.props.fetchPost(id);
    }
    else {
      id = Date.now();
      this.props.savePost({ id, type });
    }

    this.setState({ id, type });
  }

  render () {
    const { id, type } = this.state;

    if (this.props.match.params.id && isEmpty(this.props.post)) {
      return <NotFound />;
    }

    if (! id || ! type) {
      return <Loading />;
    }

    const badgeType = type === 'page' ? 'info' : 'secondary';

    settings = {
      ...settings,
      template: getTemplates(queryString.parse(this.props.location.search).template),
    };

    const post = {
      id,
      type,
      ...this.props.post,
    };

    return (
      <div>
        <div className="clearfix jumbotron" style={{ height: '32px', overflow: 'hidden', margin: 0, padding: 0 }}>
          <p className="float-left">This is a <span className={ `badge badge-${badgeType}` }>{ type }</span>!</p>
          <Link className="btn btn-sm btn-outline-secondary float-right" to="/stories">Go back to Stories</Link>
        </div>
        <Editor post={ post } settings={ settings } />
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    post: getPost(state, ownProps.match.params.id),
  };
}

export default connect(mapStateToProps, { fetchPost, savePost })(PagesEdit);
