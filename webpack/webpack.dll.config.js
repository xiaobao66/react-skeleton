const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJson = require('../package.json');

const ROOT_DIR = path.resolve(__dirname, '../');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);

module.exports = {
  entry: {
    dependencies: Object.keys(packageJson.dependencies),
  },

  output: {
    path: resolvePath('node_modules/react-skeleton/dll'),
    filename: '[name].dll.js',
    library: '_dll_[name]_[hash]',
    libraryTarget: 'var',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: resolvePath(
        'node_modules/react-skeleton/dll',
        '[name].manifest.json',
      ),
      name: '_dll_[name]_[hash]', // 和library设置的一致，输出的manifest.json中的name值
    }),
  ],
};
