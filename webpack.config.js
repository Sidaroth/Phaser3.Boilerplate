const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'eval-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
    },
    devServer: {
        port: 3000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src'),
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'assets'),
            scenes: path.resolve(__dirname, 'src/scenes'),
            components: path.resolve(__dirname, 'src/components'),
            config: path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx'],
    },
};
