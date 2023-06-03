const path = require('path');
const loaders = require('./loaders')
const plugins = require('./plugins');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  target: 'web',
  entry: './src/index.ts',
  output: {
    filename: 'gw2-map-embeds.js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[id].[contenthash].js',
    assetModuleFilename: 'assets/[contenthash][ext]',
    hashDigestLength: 16,
    clean: true,
  },
  plugins: [
    plugins.ESLintPlugin,
    plugins.MiniCssExtract,
  ],
  module: {
    rules: [
      loaders.TSLoader,
      loaders.CSSLoader,
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
