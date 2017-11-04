const path = require('path')

module.exports = {
  entry: {
    main: './src/Main.js'
  },
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  }
}