// External Dependencies
import React from 'react';
import {
	initializeEditor,
	registerBlockType,
	RichText,
    BlockControls,
    AlignmentToolbar,
} from '@frontkom/gutenberg';

import '@frontkom/gutenberg/build/css/core-blocks/style.css'; // blocks
import '@frontkom/gutenberg/build/css/style.css'; // componnets, editor, edit-post
import '@frontkom/gutenberg/build/css/core-blocks/edit-blocks.css'; // edit-blocks
import '@frontkom/gutenberg/build/css/core-blocks/theme.css'; // edit-blocks

class Editor extends React.Component {
	componentDidMount() {
		const { type, id } = this.props.post;
		const overridePost = { };

		initializeEditor( 'editor', type, id, this.props.settings, overridePost );

		// const blockStyle = { backgroundColor: '#900', color: '#fff', padding: '20px' };

		// // step 1
		// registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-01', {
		//     title: 'Hello World (Step 1)',
		//     icon: 'universal-access-alt',
		//     category: 'layout',
		//     edit() {
		//         return <p style={ blockStyle }>Hello editor.</p>;
		//     },

		//     save() {
		//         return <p style={ blockStyle }>Hello saved content.</p>;
		//     },
		// } );

		// // step 2
		// registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-02', {
		//     title: 'Hello World (Step 2)',

		//     icon: 'universal-access-alt',

		//     category: 'layout',

		//     edit( { className } ) {
		//         return <p className={ className }>Hello editor.</p>;
		//     },

		//     save( { className } ) {
		//         return <p className={ className }>Hello saved content.</p>;
		//     },
		// } );

		// // step 3
		// registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-03', {
		//     title: 'Hello World (Step 3)',

		//     icon: 'universal-access-alt',

		//     category: 'layout',

		//     attributes: {
		//         content: {
		//             type: 'array',
		//             source: 'children',
		//             selector: 'p',
		//         },
		//     },

		//     edit( { attributes, className, setAttributes } ) {
		//         const { content } = attributes;

		//         function onChangeContent( newContent ) {
		//             setAttributes( { content: newContent } );
		//         }

		//         return (
		//             <RichText
		//                 tagName="p"
		//                 className={ className }
		//                 onChange={ onChangeContent }
		//                 value={ content }
		//             />
		//         );
		//     },

		//     save( { attributes, className } ) {
		//         const { content } = attributes;

		//         return (
		//             <RichText.Content tagName="p" className={ className } value={ content } />
		//         );
		//     },
		// } );

		// // step 4
		// registerBlockType( 'gutenberg-boilerplate-esnext/hello-world-step-04', {
		//     title: 'Hello World (Step 4)',

		//     icon: 'universal-access-alt',

		//     category: 'layout',

		//     attributes: {
		//         content: {
		//             type: 'array',
		//             source: 'children',
		//             selector: 'p',
		//         },
		//         alignment: {
		//             type: 'string',
		//         },
		//     },

		//     edit( { attributes, className, setAttributes } ) {
		//         const { content, alignment } = attributes;

		//         function onChangeContent( newContent ) {
		//             setAttributes( { content: newContent } );
		//         }

		//         function onChangeAlignment( newAlignment ) {
		//             setAttributes( { alignment: newAlignment } );
		//         }

		//         return [
		//             <BlockControls>
		//                 <AlignmentToolbar
		//                     value={ alignment }
		//                     onChange={ onChangeAlignment }
		//                 />
		//             </BlockControls>,
		//             <RichText
		//                 tagName="p"
		//                 className={ className }
		//                 style={ { textAlign: alignment } }
		//                 onChange={ onChangeContent }
		//                 value={ content }
		//             />
		//         ];
		//     },

		//     save( { attributes, className } ) {
		//         const { content, alignment } = attributes;

		//         return (
		//             <RichText.Content
		//                 className={ className }
		//                 style={ { textAlign: alignment } }
		//                 value={ content }
		//             />
		//         );
		//     },
		// } );
	}

	render() {
		return <div id="editor" className="gutenberg__editor"></div>;
	}
}

export default Editor;
