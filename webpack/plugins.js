const path = require('path');
const _ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ESLintPlugin = new _ESLintPlugin({
  overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
  context: path.resolve(__dirname, '../src'),
  files: ['**/*.ts', '**/*.tsx'],
});

const MiniCssExtract = new MiniCssExtractPlugin({
  //filename: 'css/[id].[contenthash].css',
  chunkFilename: 'css/[id].[contenthash].css',
});

module.exports = {
  ESLintPlugin: ESLintPlugin,
  MiniCssExtract: MiniCssExtract,
};
