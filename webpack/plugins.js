const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ESLint = new ESLintPlugin({
  overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
  context: path.resolve(__dirname, '../src'),
  files: ['**/*.ts', '**/*.tsx'],
});

const MiniCssExtract = new MiniCssExtractPlugin({
  //filename: 'css/[id].[contenthash].css',
  chunkFilename: 'css/[id].[contenthash].css',
});

const BundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: true,
  generateStatsFile: true,
});

module.exports = [ESLint, MiniCssExtract, BundleAnalyzer];
