import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import path from 'path';
import sass from 'sass';
import webpack, { Configuration, WebpackPluginInstance } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const devMode = process.env.NODE_ENV !== 'production';

const serverPlugins: WebpackPluginInstance[] = [new ForkTsCheckerWebpackPlugin()];
const clientPlugins: WebpackPluginInstance[] = [
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    title: 'Carcasonne',
    template: 'src/client/index.html',
  }),
];
const clientEntry = ['./src/client/main.tsx'];

if (devMode) {
  clientEntry.unshift('webpack-hot-middleware/client?name=client&quiet=true');
  clientPlugins.push(new webpack.HotModuleReplacementPlugin());
  clientPlugins.push(new webpack.NoEmitOnErrorsPlugin());
  clientPlugins.push(new ReactRefreshWebpackPlugin());
  serverPlugins.push(new NodemonPlugin({
    watch: ['./dist/server'],
    ext: 'js',
    script: './dist/server/server.js',
    verbose: true,
  }));
} else {
  clientPlugins.push(new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }));
}

const webpackOptions: Configuration[] = [{
  name: 'server',
  mode: devMode ? 'development' : 'production',
  entry: './src/server/server.ts',
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, '/dist/server/'),
  },
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
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
  entry: clientEntry,
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
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx|ts)?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx', '.tsx', '.ts'],
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

export default webpackOptions;
