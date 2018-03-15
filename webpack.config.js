const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    	// new ExtractTextPlugin('style.bundle.css'),
  	],
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
	            test: /\.(css|scss)$/,
	            use: [
	            	{
	                	loader: 'style-loader'
	            	}, 
	            	{
	                	loader: 'css-loader'
	            	}, 
	            	{
	                	loader: 'sass-loader'
	            	}
	            ]
			},
			// {
			// 	test: /\.css$/,
			// 	loader: ExtractTextPlugin.extract({
			// 		use: 'css-loader',
			// 	}),
			// }
		]
	},
	devServer: {
		contentBase: './public',
		inline: true,
		// port: 3001,
		open: true
	}
}