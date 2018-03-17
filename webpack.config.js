/**
 * External dependencies
 */
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const { reduce, escapeRegExp, castArray, get } = require( 'lodash' );
const { basename } = require( 'path' );

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

/**
 * Webpack plugin for handling specific template tags in Webpack configuration
 * values like those supported in the base Webpack functionality (e.g. `name`).
 *
 * @see webpack.TemplatedPathPlugin
 */
class CustomTemplatedPathPlugin {
	/**
	 * CustomTemplatedPathPlugin constructor. Initializes handlers as a tuple
	 * set of RegExp, handler, where the regular expression is used in matching
	 * a Webpack asset path.
	 *
	 * @param {Object.<string,Function>} handlers Object keyed by tag to match,
	 *                                            with function value returning
	 *                                            replacement string.
	 *
	 * @return {void}
	 */
	constructor( handlers ) {
		this.handlers = reduce( handlers, ( result, handler, key ) => {
			const regexp = new RegExp( `\\[${ escapeRegExp( key ) }\\]`, 'gi' );
			return [ ...result, [ regexp, handler ] ];
		}, [] );
	}

	/**
	 * Webpack plugin application logic.
	 *
	 * @param {Object} compiler Webpack compiler
	 *
	 * @return {void}
	 */
	apply( compiler ) {
		compiler.plugin( 'compilation', ( compilation ) => {
			compilation.mainTemplate.plugin( 'asset-path', ( path, data ) => {
				for ( let i = 0; i < this.handlers.length; i++ ) {
					const [ regexp, handler ] = this.handlers[ i ];
					if ( regexp.test( path ) ) {
						return path.replace( regexp, handler( path, data ) );
					}
				}

				return path;
			} );
		} );
	}
}

module.exports = {
	entry: [
		'/Users/sofiasousa/Workspace/gutenapp/node_modules/react-scripts/config/polyfills.js',
     	'/Users/sofiasousa/Workspace/gutenapp/node_modules/react-dev-utils/webpackHotDevClient.js',
		'./src/index.js'
	],
	output: {
		pathinfo: true,
		filename: 'static/js/bundle.js',
     	chunkFilename: 'static/js/[name].chunk.js',
		publicPath: '/',
		// path: '/public',
		devtoolModuleFilenameTemplate: info => {
  			return `webpack:///${info.resourcePath}?${info.loaders}`
		}
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new InterpolateHtmlPlugin({
      		NODE_ENV: 'development', 
      		PUBLIC_URL: ''
    	}),
    	new HtmlWebpackPlugin({
      		template: './public/index.html',
      		filename: 'index.html'
    	}),
    	new webpack.NamedModulesPlugin({
    		options: {}
    	}),
    	new webpack.DefinePlugin({
    		definitions: { 'process.env': { NODE_ENV: '"development"', PUBLIC_URL: '""' } }
    	}),
		new webpack.HotModuleReplacementPlugin({
	       options: {},
	       multiStep: undefined,
	       fullBuildTimeout: 200,
	       requestTimeout: 10000 
	  	}),
	  	new CaseSensitivePathsPlugin({ 
	  		options: {}, 
	  		pathCache: {}, 
	  		fsOperations: 0, 
	  		primed: false 
	  	}),
	  	new WatchMissingNodeModulesPlugin({
    		nodeModulesPath: '/Users/sofiasousa/Workspace/gutenapp/node_modules' 
    	}),
  		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    	blocksCSSPlugin,
		editBlocksCSSPlugin,
		mainCSSExtractTextPlugin,
		new CustomTemplatedPathPlugin( {
			basename( path, data ) {
				const rawRequest = get( data, [ 'chunk', 'entryModule', 'rawRequest' ] );
				if ( rawRequest ) {
					return basename( rawRequest );
				}

				return path;
			},
		} ),  
  	],
  	resolve: {
		modules: [
			'node_modules',
			'/Users/sofiasousa/Workspace/gutenapp/node_modules'
		],
		extensions: [ '.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx' ],
		alias: { 
  			'babel-runtime': '/Users/sofiasousa/Workspace/gutenapp/node_modules/babel-runtime',
    		'react-native': 'react-native-web' 
    	},
    	plugins: [
    		// new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    		new ModuleScopePlugin('/Users/sofiasousa/Workspace/gutenapp/src',
    			[ '/Users/sofiasousa/Workspace/gutenapp/package.json'])
    	]
	},
	module: {
		strictExportPresence: true,
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
	node: { 
		dgram: 'empty',
     	fs: 'empty',
     	net: 'empty',
     	tls: 'empty',
     	child_process: 'empty' 
    },
  	performance: { hints: false }
	// devServer: {
	// 	contentBase: './public',
	// 	filename: "bundle.js",
	// 	inline: true,
	// 	port: 8080,
	// 	open: true
	// }
}