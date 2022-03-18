const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const sass = require('sass');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

const serverPlugins = [
  devMode && new NodemonPlugin({
    watch: path.resolve('./dist/server'),
    ext: 'js',
    script: './dist/server/server.js',
    verbose: true,
  }),
].filter(Boolean);

const clientPlugins = [
  new HtmlWebpackPlugin({
    inject: true,
    title: 'Carcasonne',
    template: 'src/client/index.html',
  }),
  !devMode && new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  devMode && new webpack.HotModuleReplacementPlugin(),
  devMode && new webpack.NoEmitOnErrorsPlugin(),
  devMode && new ReactRefreshWebpackPlugin(),
].filter(Boolean);

module.exports = [{
  name: 'server',
  mode: devMode ? 'development' : 'production',
  entry: './src/server/server.ts',
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, '/dist/server/'),
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[j|t]s$/,
        exclude: [/node_modules/],
        resolve: {
          extensions: ['.js', '.ts'],
        },
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/typescript',
            ],
            plugins: [
              '@babel/transform-runtime',
            ],
          },
        },
      },
      { test: /\.json$/ },
    ],
  },
  plugins: serverPlugins,
}, {
  name: 'client',
  mode: devMode ? 'development' : 'production',
  entry: [
    devMode && 'webpack-hot-middleware/client?name=client&quiet=true',
    './src/client/main.tsx',
  ].filter(Boolean),
  output: {
    path: path.join(__dirname, '/dist/client/'),
    filename: '[name].[contenthash].js',
    publicPath: '/js/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              devMode && require.resolve('react-refresh/babel'),
              '@babel/transform-runtime',
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.(c|s[ac])ss$/,
        use: [
          devMode ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: require.resolve('sass-loader'),
            options: {
              implementation: sass,
            },
          }],
      },
    ],
  },
  plugins: clientPlugins,
}];
