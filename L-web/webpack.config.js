var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps
  entry:{
    index:'./src/index.js'
  },
  output:{
    path:__dirname+'/dist',
    filename: '[name].bundle.js'//[name]跟entry里面键名有关
  },
  module:{
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      { test: /\.js[x]?$/, loader:'babel-loader',exclude:/node_modules/}
    ]
  },
  resolve:{
    extensions: ['', '.js', '.jsx', '.scss']
  },
  devServer: {
    inline:true,//inline模式
    hot: true//热更替
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热更替必须加这个插件，否则disable
    new OpenBrowserPlugin({//自动打开浏览器
      url: 'http://localhost:8080/index.html'
    })
  ]
};
