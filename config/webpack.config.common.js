/*
 * webpack公用环境配置
 * @Author: Magical
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');         // 自定义html模板文件

const _resolve = (address) =>{
	return path.resolve(__dirname, address)
};


module.exports = {
	entry: {
		main:[
			_resolve('../src/index.js'),
		]
	},

	output: {
		filename: 'js/bundle.js',
		chunkFilename: '[name].chunk.js',
		// 输出文件都放到 dist 目录下
		path: _resolve('../dist'),
		publicPath: ""
	},

	resolve: {
		extensions: [".js", ".json"],   // 免后缀文件类型
		//简化路径
		alias: {
			utils: _resolve('../src/utils'),
			static: _resolve('../src/static'),
			components: _resolve('../src/components'),
            api: _resolve('../src/api')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader?cacheDirectory',  // 将执行结果缓存起来，加速下次执行
				exclude: _resolve("../node_modules"),         // 排除这里面的文件，加速
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8888,
							outputPath: 'static/images/',
							name: '[name].[hash:6].[ext]',  // 指定打包后的图片名字及路径
							fallback: 'file-loader'         // 文件大于8888的交于file-loader
						}
					}
				],
				exclude: _resolve("../src/static/icons")
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							symbolId: 'yg-[name]'
						}
					}
				],
				include: _resolve("../src/static/icons")
			},

		]
	},


	plugins: [
		new HtmlWebpackPlugin({
			inject: true,                // 将js文件放在body中
			favicon: _resolve('../public/favicon.ico'),
			template: _resolve('../public/index.html'),  //指定模板
		})
	],
};
