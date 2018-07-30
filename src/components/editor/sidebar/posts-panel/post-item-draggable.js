/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { components, data, element } from '@frontkom/gutenberg-js';

const { Draggable } = components;
const { Component } = element;
const { withSelect } = data;

class PostItemDraggable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      block: { },
    };
  }

  componentDidMount () {
    const { post } = this.props;

    const block = {
      id: post.id,
      title: [ post.title.rendered ],
      link: post.link,
      imageId: post.featured_media,
      categoryId: post.categories[ 0 ],
      authorId: post.author,
      type: 'static',
    };

    this.setState({ block });
  }

  render () {
    const { isDragging, ...props } = this.props;
    const { index, rootUID } = this.props.insertionPoint;
    const { block } = this.state;

    const className = classnames('components-posts-list-item-draggable', {
      'is-visible': isDragging,
    });

    const transferData = {
      type: 'block',
      fromIndex: index,
      rootUID,
      attributes: block,
    };

    return (
      <Draggable className={ className } transferData={ transferData } { ...props }>
        <div className="components-posts-list-item-draggable-inner"></div>
      </Draggable>
    );
  }
}

export default withSelect(select => ({
  insertionPoint: select('core/editor').getBlockInsertionPoint(),
}))(PostItemDraggable);
