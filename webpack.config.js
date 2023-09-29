const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const glob = require('glob');

module.exports = {
  mode: 'production', 

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  
  entry: [
    ...glob.sync('./src/js/**/*.js'),
    ...glob.sync('./src/js/**/*.min.js'),
    ...glob.sync('./src/css/**/*.css'),
    ...glob.sync('./src/js/**/*.min.css'),
  ],

  output: {
    filename: 'bundle.js', // Nome do arquivo unificado.
    path: path.resolve(__dirname, './dir') // Diretório de saída.
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') 
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }
    ]
  }
};