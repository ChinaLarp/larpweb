module.exports = {
  entry:{
    app: [
      './src/index.js',
    ]
  },
  output: {
  path: __dirname + '/dist/client/',
  filename: 'bundle.js'
},
module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                  loader: 'babel-loader',
                  query: {
          presets: ['env', 'react','es2015','stage-0']
        }
              },
              {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
            {
                test: /\.json?$/,
                loader: 'json-loader'
            }
        ]
    }}
