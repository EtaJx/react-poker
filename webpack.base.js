const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'React Poker'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonChunkPlugin({
            name: 'runtime'
        }),
        new ExtractTextPlugin('[name].css')
    ],
    output:{
        filename:'[name].[chunckhas].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use :ExtractTextPlugin.extract([
                    fallback:'style-loader',
                    use:'css-loader',
                ])
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use : [
                    'file-loader'
                ]
            }
        ]
    },
    externals: {
        lodash: {
            commonjs:'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
}