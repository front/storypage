// External Dependencies
import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import qs from 'qs';

// Internal Dependencies
import { fetchPost, savePost } from '../../store/actions';
import { getPost } from '../../store/selectors';
import Editor from '../editor';
import Loading from './loading';
// import NotFound from './not_found';

const settings = {
  template: '',
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
  };

  componentDidMount () {
    let { id } = this.props.match.params;

    if (id) {
      this.props.fetchPost(id);
    }
    else {
      id = Date.now();
      this.props.savePost({ id, type: 'page' });
    }

    this.setState({ id });
  }

  render () {
    const { id } = this.state;

    if (this.props.match.params.id && isEmpty(this.props.post)) {
      return <Loading />;
    }

    if (! id) {
      return <Loading />;
    }

    const post = {
      id,
      type: 'page',
      ...this.props.post,
    };

    return <Editor post={ post } settings={ settings } template={ qs.parse(this.props.location.search.replace('?', '')).template } />;
  }
}

function mapStateToProps (state, ownProps) {
  return {
    post: getPost(state, ownProps.match.params.id),
  };
}

export default connect(mapStateToProps, { fetchPost, savePost })(PagesEdit);
