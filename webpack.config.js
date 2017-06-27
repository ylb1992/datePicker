module.exports = function(env) {
	var webpack = require('webpack'),
	path = require('path'),
	fs = require('fs'),
	packageConf = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
	
	var name = packageConf.name,
		verion = packageConf.verion,
		library = name.replace(/^(\w)/, m => m.toUpperCase()),
		proxyPort = 8081,
		plugins = [],
		loaders = [];

	// release
	if (env && env.pro) {
		name += `-${version}.min`;
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					drop_console: false
				}
			})
		);
	}


	if (fs.existsSync('./.babelrc')) {
		var babelConf = JSON.parse(fs.readFileSync('.babelrc'));
		loaders.push({
			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: babelConf
		});
	}

	return {
		entry: './src/main.js',
		output: {
			filename: `${name}.js`,
			path: path.resolve(__dirname, 'dist/js'),
			publicPath: '/static/js/',
		},

		plugins: plugins,

		module: {
			loaders: loaders
		},

		devServer: {
			proxy: {
				"*": `http://127.0.0.1:${proxyPort}`,
			}
		}
	};
}