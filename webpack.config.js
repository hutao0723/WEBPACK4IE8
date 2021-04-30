
const path = require("path");
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提出css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = {

    mode: 'development',
    // 入口
    entry: {
        app: "./src/index"
    },
    // 出口
    output: {
        // 输出地址
        path: resolve('./dist'),
        // 输出文件名称,保留8位hash值（无法实现前端静态资源在浏览器上长缓存）
        filename: '[name].[hash:8].js',
        // 打包后的资源的访问路径前缀
        publicPath: "/"
    },
    //上下文目录 根目录
    context: process.cwd(),
    devtool: "cheap-module-eval-source-map",
    resolve: {
        // 依次按后缀名查找
        extensions: [".js", ".jsx", ".json"],
        // 配置引入别名
        alias: {
            "@": resolve("./src"),
        }
    },

    optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				exclude: /node_modules/,
				uglifyOptions: {
					ie8: true // 解决ie下的关键字default的问题
				}
			})
		]
	},

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                        use: {
                            loader: 'babel-loader',
                           
                            options: {
                                presets: [['@babel/preset-env'],["@babel/preset-react"]],
                                plugins: [
                                    ["@babel/plugin-transform-runtime", {
                                        "corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
                                       
                                    }]
                                ]
                            }
                        }

                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|svg)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 3 * 1024     // 3kb
                                }

                            },
                            {
                                loader: 'image-webpack-loader',  // 压缩图片
                                options: {
                                    bypassOnDebug: true, // webpack@1.x
                                    disable: true, // webpack@2.x and newer
                                },
                            }
                        ]

                    },
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            // 'postcss-loader'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: 'less-loader',
                                options: {
                                    lessOptions: {
                                        javascriptEnabled: true
                                    }
                                }
                            },
                            // 'postcss-loader'
                        ]
                    },
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 添加页面标题
            title: 'webpack4ie81',
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 删除空白符与换行符    
                collapseWhitespace: true,
                // 压缩内联css 
                minifyCSS: true
            },
            template: resolve('./public/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ],
    devServer: {
        // 服务器从哪里提供内容
        contentBase: path.join(__dirname, "dist"),
        // 启用压缩
        compress: true,
        // 服务端口
        port: 9000,
        // 服务启动自动打开浏览器
        open: true,

        stats: { colors: true },

        host: '0,0,0,0',

        useLocalIp: true,   //使用本地 IP 打开

    }
}