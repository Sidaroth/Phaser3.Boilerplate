const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('../package.json');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
};

module.exports = {
    context: __dirname,
    entry: {
        app: [PATHS.src],
        vendors: Object.keys(pkg.dependencies),
    },
    output: {
        filename: '[name].js',
        path: PATHS.dist,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            configs: path.resolve(__dirname, '../src/configs'),
            core: path.resolve(__dirname, '../src/core'),
            styles: path.resolve(__dirname, '../styles'),
            assets: path.resolve(__dirname, '../assets'),
            scenes: path.resolve(__dirname, '../src/scenes'),
            entities: path.resolve(__dirname, '../src/entities'),
            components: path.resolve(__dirname, '../src/components'),
            utils: path.resolve(__dirname, '../src/utils'),
            root: path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: 'dashes',
                            localIdentName: '[path][name]__[local]',
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(jpg|png|woff)$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
            PRODUCTION: JSON.stringify(false),
        }),
        new HtmlWebpackPlugin({
            template: './index.ejs',
            title: 'Boilerplate -- Change me',
            meta: [{ name: 'robots', content: 'noindex,nofollow' }],
            appMountIds: ['game'],
            inject: false,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true,
            },
            mobile: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '../assets/images/'),
                    to: path.join(PATHS.dist, 'assets/images/'),
                    flatten: false,
                },
                {
                    from: path.join(__dirname, '../assets/audio/'),
                    to: path.join(PATHS.dist, 'assets/audio/'),
                    flatten: false,
                },
            ],
        }),
    ],
};
