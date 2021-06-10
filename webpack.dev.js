const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ElectronReloadPlugin = require('webpack-electron-reload')({
    path: path.join(__dirname, './electron.js'),
});

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        ElectronReloadPlugin()
    ],
});