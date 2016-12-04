var webpack = require('webpack');

module.exports = {
  entry:['./src/index.js'],
  output:{
    filename: 'index.bundle.js'
  },
  module:{
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve:{
    extensions: ['', '.js', '.jsx', '.scss']
  },
  devServer: {
    inline:true
  }
};
