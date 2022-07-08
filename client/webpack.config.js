const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const dotenv = require('dotenv');
dotenv.config();

/*
mode : 프로덕션 모드인지 개발 모드인지 확인하는 옵션이다.
devtool : 프로덕션 모드인 경우엔 hidden-source-map을 권장한다. (외부에서 리액트 구조를 확인할 수 없다.)
resolve : 확장자나 경로를 알아서 처리할 수 있도록 설정하는 옵션이다.
module : 이 옵션에 설치한 ts-loader와 babel-loader를 설정하면 된다. loader들은 오른쪽에서 왼쪽 방향으로 적용되기 때문에 ts-loader를 babel-loader보다 오른쪽에 위치시켜야 한다.
output : 번들화 된 파일을 export할 경로와 파일명을 설정한다.
plugins : 설치한 플러그인을 적용하는 옵션이다
*/
module.exports = {
  entry: './src/index.tsx',

  mode: isDevelopment ? 'development' : 'production',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: './public/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        process.env.NODE_ENV === 'development'
          ? process.env.API_URL
          : process.env.API_BUILD_URL
      ),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(png|jpe?g)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
