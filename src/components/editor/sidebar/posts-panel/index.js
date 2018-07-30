/**
 * External dependencies
 */
import React from 'react';
import { i18n, components, data, element } from '@frontkom/gutenberg-js';

/**
 * Internal Dependencies
 */
import PostsSearch from './posts-search';

const { __ } = i18n;
const { TextControl, CategorySelect } = components;
const { Component, Fragment } = element;
const { withSelect } = data;

class PostsPanel extends Component {
  constructor (props) {
    super(props);

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onTermChange = this.onTermChange.bind(this);

    this.state = {
      categoryId: '',
      term: '',
      blockType: '',
    };
  }

  onCategoryChange (categoryId) {
    this.setState({ categoryId });
  }

  onTermChange (term) {
    this.setState({ term });
  }

  onBlockTypeChange (blockType) {
    this.setState({ blockType });
  }

  render () {
    const { categories } = this.props;
    const { categoryId, term } = this.state;

    return (
      <Fragment>
        <TextControl
          placeholder={ __('Search posts') }
          value={ term }
          onChange={ this.onTermChange }
        />

        <CategorySelect
          key="query-controls-category-select"
          categoriesList={ categories }
          label={ __('Category') }
          noOptionLabel={ __('All') }
          selectedCategoryId={ categoryId }
          onChange={ this.onCategoryChange }
        />

        <PostsSearch
          options={ { categoryId, term, blockType: 'storypage/post'  } }
        />
      </Fragment>
    );
  }
}

export default withSelect(select => {
  const { getCategories, isRequestingCategories } = select('core');

  return {
    categories: getCategories(),
    isRequesting: isRequestingCategories(),
  };
})(PostsPanel);
