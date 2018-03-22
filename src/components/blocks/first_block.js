

import React from 'react';

import { Component } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import ImageBlock from '@wordpress/blocks/library/image/block';
import { 
	RichText, 
	source,
	BlockControls,
	InspectorControls,
    AlignmentToolbar,
} from '@wordpress/blocks';

class mySelectPosts extends Component {
	// Method for setting the initial state.
	static getInitialState( selectedPost ) {
		return {
			posts: [],
			selectedPost: selectedPost,
			post: {}, 
		};
	}
	// Constructing our component. With super() we are setting everything to 'this'.
	// Now we can access the attributes with this.props.attributes
	constructor() {
		super( ...arguments );
		// Maybe we have a previously selected post. Try to load it.
		this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );
	}

	render() {
		// Options to hold all loaded posts. For now, just the default.
		let options = [ { value: 0, label: 'Select a Post' } ];
		let output  = 'Loading Posts';

		if (this.state.posts.length > 0) {
			const loading = 'We have %d posts. Choose one.';
			output = loading.replace( '%d', this.state.posts.length );
			
			this.state.posts.forEach((post) => {
				options.push({value:post.id, label:post.title.rendered});
			});
		} else {
			output = 'No posts found. Please create some first.';
		}

		return [
			!! this.props.focus && ( <InspectorControls key='inspector'>
				<SelectControl value={ this.props.attributes.selectedPost } label={ 'Select a Post'} options={ options } />
			</InspectorControls>
			),
		output
     ]
	}
}

export default {
	name: 'myblocks/article',
	options: {
		title: 'Article',

		icon: 'universal-access-alt',

		category: 'layout',

		attributes: {
	        content: {
	            type: 'array',
	            source: 'children',
	            selector: 'p',
	        },
	        alignment: {
	            type: 'string',
	        },
	        title: {
	        	type: 'string',
      			selector: 'h2'
	        },
	        // image: {
	        // 	type: '',
	        // 	selector: 'img'
	        // },
		    link: {
		      type: 'string',
		      selector: 'a'
		    },
		    selectedPost: {
		      type: 'number',
		      default: 0,
    		},
	    },

	    edit: mySelectPosts,

	    // edit( { attributes, className, isSelected, setAttributes } ) {
	    //     const { content, alignment } = attributes;

	    //     function onChangeContent( newContent ) {
	    //         setAttributes( { content: newContent } );
	    //     }

	    //     function onChangeAlignment( newAlignment ) {
	    //         setAttributes( { alignment: newAlignment } );
	    //     }

	    //     return [
	    //     	// <ImageBlock attributes={} />,

	    //         isSelected && (
	    //             <BlockControls key="controls">
	    //                 <AlignmentToolbar
	    //                     value={ alignment }
	    //                     onChange={ onChangeAlignment }
	    //                 />
	    //             </BlockControls>
	    //         ),
	    //         <RichText
	    //             key="editable"
	    //             tagName="h2"
	    //             className={ className }
	    //             style={ { textAlign: alignment } }
	    //             onChange={ onChangeContent }
	    //             value={ content }
	    //         />,
	    //         <div>Footer</div>
	    //     ];
	    // },

	    save( { attributes, className } ) {
	        const { content, alignment } = attributes;

	        return <p className={ className } style={ { textAlign: alignment } }>{ content }</p>;
	    },
	}
}