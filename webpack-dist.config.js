const webpack = require('webpack');

let config = require('@ucd-lib/cork-app-build').dist({
    // root directory, all paths below will be relative to root
    root : __dirname,
    // path to your entry .js file
    entry : 'public/pages/acc.js',
    // folder where bundle.js and ie-bundle.js will be written
    dist : 'public/dist',
    // path your client (most likely installed via yarn) node_modules folder.
    // Due to the flat:true flag of yarn, it's normally best to separate 
    // client code/libraries from all other modules (ex: build tools such as this).
    // will take an array of relative paths as well
    clientModules : 'node_modules',

    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': JSON.stringify('development')
    //     })
    // ],
  });
  
  module.exports = config;