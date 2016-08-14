const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const paths = {
    assets: 'src/main/resources/assets/'
};

const getPlugins = function () {
    return [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ];
};

module.exports = {
    entry: path.join(__dirname, paths.assets, 'index.js'),
    output: {
        path: path.join(__dirname, paths.assets),
        filename: 'build/main.js'
    },
    plugins: getPlugins(),
    module: {
        preLoaders: [
            {
                test: /assets\/.*\.js?$/,
                exclude: /node_modules/,
                loaders: ['eslint-loader']
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015' ]
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style!css!resolve-url!sass?sourceMap!postcss'
            },
            {
                test: /\.(png|jpg|woff|woff2|svg|ttf)$/,
                exclude: /node_modules/,
                loader: 'url?limit=8192'
            }
        ]
    },
    postcss: [autoprefixer({browsers: ['last 2 versions']})],
    noParse: [
        path.join(__dirname, 'node_modules')
    ]
};
