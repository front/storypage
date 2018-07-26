/**
 * External dependencies
 */
import React from 'react';
import { i18n, components, data, element } from '@frontkom/gutenberg-js';

// import CategorySelect from 'gutenberg/components/query-controls/category-select';

/**
 * Internal Dependencies
 */
import PostsSearch from './posts-search';

const { __ } = i18n;
const { TextControl/* , SelectControl*/ } = components;
const { Component, Fragment } = element;
const { withSelect } = data;

class PostsPanel extends Component {
  constructor (props) {
    super(props);

    // this.onCategoryChange = this.onCategoryChange.bind(this);
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
    // const { categories, availableBlocks } = this.props;
    const { categoryId, term /* , blockType*/ } = this.state;

    return (
      <Fragment>
        { /* <SelectControl
          label={ __('Type of block') }
          value={ blockType }
          onChange={ this.onBlockTypeChange }
          options={ availableBlocks.map(({ name, title, category }) => ({
            value: name,
            label: `${title} (${category})`,
          })) }
        /> */ }

        <TextControl
          placeholder={ __('Search posts') }
          value={ term }
          onChange={ this.onTermChange }
        />

        { /* <CategorySelect
          key="query-controls-category-select"
          categoriesList={ categories }
          label={ __('Category') }
          noOptionLabel={ __('All') }
          selectedCategoryId={ categoryId }
          onChange={ this.onCategoryChange }
        /> */}

        <PostsSearch
          options={ { categoryId, term, blockType: 'storypage/post'  } }
        />
      </Fragment>
    );
  }
}

export default withSelect(select => {
  const { getCategories, isRequestingCategories } = select('core');
  // const { getBlockTypes } = select('core/blocks');

  return {
    categories: getCategories(),
    isRequesting: isRequestingCategories(),
    // availableBlocks: getBlockTypes().filter(block => block.draggablePost),
  };
})(PostsPanel);
