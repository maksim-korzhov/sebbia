const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.resolve(__dirname, "./dist");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
	entry: {
		app: [
			"react-hot-loader/patch",
			path.resolve(__dirname, "./src/index.js")
		]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				exclude: /node_modules/,
				use: "eslint-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.(scss|css)$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, "./src/assets/"),
				use: "url-loader?limit=10000&name=assets/[name]-[hash].[ext]"
			}
		]
	},
	resolve: {
		alias: {
			"components": path.resolve(__dirname, "./src/components"),
			"containers": path.resolve(__dirname, "./src/containers"),
			"actions": path.resolve(__dirname, "./src/actions"),
			"reducers": path.resolve(__dirname, "./src/reducers"),
			"store": path.resolve(__dirname, "./src/store"),
			"assets": path.resolve(__dirname, "./src/assets"),
			"utils": path.resolve(__dirname, "./src/utils")
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "./src/assets/index.html"),
			filename: "index.html",
			path: outputPath
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, "./dist"),
        compress: true, // gzip all files
		port: 8080,
        stats: 'errors-only', // не показывать весь лог, только ошибки,
		historyApiFallback: true,
		inline: true,
		hot: true,
		host: "0.0.0.0",
        open: true, // Всегда открывать в новом окне,
	}
};

module.exports = webpackConfig;