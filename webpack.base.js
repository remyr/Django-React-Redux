var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('bundle.css');

var root = path.resolve(__dirname, '../');

const postcss = [
  require('autoprefixer')({
    browsers: ['last 2 versions', 'ie > 8']
  }),
];

module.exports = {
	entry: {
		app: ['./src/index.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [
      {
				test: /\.scss$/,
				loaders: ['css', 'postcss' ,'sass']
			},
			{
	      test: /\.(js|jsx)$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      include: root
	    },
			{
				test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10,
          name: '[name].[hash:7].[ext]'
				}
			}
		]
	},
	postcss,
	plugins: [],
}