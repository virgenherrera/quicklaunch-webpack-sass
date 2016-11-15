'use strict';
const ExtractTextPlugin	= require("extract-text-webpack-plugin")
,	webpack				= require('webpack')
,	Minimize			= process.argv.indexOf('--ugly') !== -1
,	EmbedSASS			= process.argv.indexOf('--embedCss') !== -1
,	Loaders				= []
,	Plugins				= [];

//mandatory Loaders
//Js|jsX
Loaders.push({
	test: /(\.js|.jsx)$/,
	loader: 'babel',
	exclude: '/node_modules/',
	query: {
		presets: ['es2015']
	}
});

//depending on params loaders
//Sass form jsEmbedded or write a separate file
if( EmbedSASS ){
	Loaders.push({
		test: /\.scss$/,
		loaders: ['style', 'css', 'sass']
	});
} else {
	Loaders.push({
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('css!sass')
	});
	Plugins.push(
		new ExtractTextPlugin('stylesheet.css', {
			allChunks: true
		})
	);
}

//console param based uglyfy default pretty
if( Minimize ){
	Plugins.push( new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}) );
}

module.exports = {
	entry: {
		app: './src'
	},
	output: {
		path: './build',
		filename: 'script.js',
		publicPath: '/build/'
	},
	resolve: {
		extensions: ['','.js']
	},
	devServer: {
		host: '127.0.0.1',
		port: 8080,
		inline: true
	},
	module: {
		loaders: Loaders
	},
	plugins: Plugins
};
