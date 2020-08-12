const baseConfig = require('./webpack.config.base');
const path = require('path');
const { merge } = require('webpack-merge');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
};

const PORT = 3000;

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        port: PORT,
        publicPath: 'http://localhost:3000/',
        hot: true,
    },
});
