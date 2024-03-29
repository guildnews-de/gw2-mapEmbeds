const { resolve } = require('path');
// const { ESLint, MiniCssExtract, BundleAnalyzer } = require('./plugins');
const plugins = require('./plugins');
const loaders = require('./loaders');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  target: 'web',
  entry: './src/index.ts',
  output: {
    filename: 'gw2-map-embeds.js',
    path: resolve(__dirname, '../dist'),
    chunkFilename: 'js/[id].[contenthash].js',
    assetModuleFilename: 'assets/[contenthash][ext]',
    hashDigestLength: 16,
    clean: true,
  },
  plugins: plugins,
  module: {
    rules: loaders,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  performance: {
    maxAssetSize: 512000,
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
