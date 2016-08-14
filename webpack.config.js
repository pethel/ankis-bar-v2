const path = require('path');
const autoprefixer = require('autoprefixer');

const paths = {
    assets: 'src/main/resources/assets/'
};


console.log(path.resolve('..'));

module.exports = {
    entry: path.join(__dirname, paths.assets, 'index.js'),
    output: {
        path: path.join(__dirname, paths.assets),
        filename: 'build/main.js'
    },
    module: {
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
