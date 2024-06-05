const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
 module: {
   rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
   ],
 },
 plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
    }),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'public/styles', to: 'styles' },
            { from: 'public/scripts', to: 'scripts' },
            { from: 'public/resources/images', to: 'resources/images' },
        ],
    }),
],
 resolve: {
    extensions: ['.js', '.json', '.css']
},
devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true
}
};