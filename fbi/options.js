const dist = 'dist'

module.exports = {
  builds: [
    {
      input: './src/index.js',
      output: `${dist}/demo.umd.js`,
      libraryTarget: 'umd',
      library: 'demojs',
      sourcemap: true,
      uglify: false,
      // "web" | "webworker" | "node" | "async-node" | "node-webkit" | "electron-main" | "electron-renderer" | function
      target: 'web',
      // https://webpack.js.org/configuration/externals/
      externals: {},
      // data only for this build
      data: {},
      // https://github.com/webpack-contrib/copy-webpack-plugin#from
      copy: []
    }
  ],

  data: {
    __XXX__: 'xxx'
  },

  // https://github.com/webpack-contrib/worker-loader#options
  worker: {
    name: `${dist}/workers/[name].js`,
    inline: false,
    fallback: true,
    publicPath: './'
  },

  eslint: {
    enable: true,
    options: {
      // http://eslint.org/docs/user-guide/configuring
      rules: {
        // rules docs: https://standardjs.com/rules.html
      },
      // fix: true
      // emitError: true,
      // emitWarning: true
    }
  },

  postcss: {
    extract: true
  },

  alias: {},

  // https://github.com/webpack-contrib/copy-webpack-plugin#from
  copy: [
    // { from: './src/static', to: './static' }
  ]
}
