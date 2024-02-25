// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TSLoader = {
  test: /\.(ts|tsx)$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
    },
  },
};

const CSSLoader = {
  test: /\.(scss|css)$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        //modules: true,
        //importLoaders: 2,
        //sourceMap: true,
      },
    },
    {
      loader: 'resolve-url-loader',
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                browsers: 'last 3 versions',
                stage: 0,
              },
            ],
          ],
        },
      },
    },
  ],
};

const AssetLoader = {
  test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
  type: 'asset/resource',
};

module.exports = [TSLoader, CSSLoader, AssetLoader];
