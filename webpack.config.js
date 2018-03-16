/**
 * External dependencies
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// Main CSS loader for everything but blocks..
const mainCSSExtractTextPlugin = new ExtractTextPlugin( {
	filename: './[basename]/build/style.css',
} );

// CSS loader for styles specific to block editing.
const editBlocksCSSPlugin = new ExtractTextPlugin( {
	filename: './blocks/build/edit-blocks.css',
} );

// CSS loader for styles specific to blocks in general.
const blocksCSSPlugin = new ExtractTextPlugin( {
	filename: './blocks/build/style.css',
} );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	use: [
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				plugins: [
					require( 'autoprefixer' ),
				],
			},
		},
		{
			loader: 'sass-loader',
			query: {
				includePaths: [ 'src/components/gutenberg/edit-post/assets/stylesheets' ],
				data: '@import "colors"; @import "admin-schemes"; @import "breakpoints"; @import "variables"; @import "mixins"; @import "animations";@import "z-index";',
			},
		},
	],
};

const externals = {
	react: 'React',
	'react-dom': 'ReactDOM',
	'react-dom/server': 'ReactDOMServer',
	tinymce: 'tinymce',
	moment: 'moment',
	jquery: 'jQuery',
};

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: '/public',
	},
	plugins: [
    	new HtmlWebpackPlugin({
      		template: './public/index.html',
    	}),
    	blocksCSSPlugin,
		editBlocksCSSPlugin,
		mainCSSExtractTextPlugin,
  	],	
  	externals,
  	resolve: {
		modules: [
			__dirname,
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.pegjs/,
				use: 'pegjs-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
	            test: /\.css$/,
	            use: [
	            	{
	                	loader: 'style-loader'
	            	}, 
	            	{
	                	loader: 'css-loader'
	            	}
	            ]
			},
			{
				test: /style\.scss$/,
				include: [
					/blocks/,
				],
				use: blocksCSSPlugin.extract( extractConfig ),
			},
			{
				test: /editor\.scss$/,
				include: [
					/blocks/,
				],
				use: editBlocksCSSPlugin.extract( extractConfig ),
			},
			{
				test: /\.scss$/,
				exclude: [
					/blocks/,
				],
				use: mainCSSExtractTextPlugin.extract( extractConfig ),
			},
		]
	},
	devServer: {
		contentBase: './public',
		inline: true,
		// port: 3001,
		open: true
	}
}