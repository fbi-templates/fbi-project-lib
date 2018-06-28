const webpack = require('webpack')
const banner = require('./banner')
const merge = require('webpack-merge')
const stringify = require('../helpers/stringify')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const opts = ctx.options
const builds = opts.builds

const modules = {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            // https://github.com/stylelint/stylelint-config-standard
            extends: 'stylelint-config-standard',
            // Docs: http://stylelint.io/user-guide/rules/
            // Example: http://stylelint.io/user-guide/example-config/
            rules: {
              'rule-empty-line-before': [
                'always',
                {
                  except: ['inside-block-and-after-rule'],
                  ignore: ['inside-block']
                }
              ]
            }
          }
        }
      ]
    },
    {
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: opts.worker || {}
      }
    },
    {
      test: /\.wasm$/,
      type: 'javascript/auto',
      use: 'wasm-loader'
    }
  ]
}

const config = builds.map(build => {
  return {
    entry: build.input,
    output: {
      filename: build.output,
      libraryTarget: build.libraryTarget || 'var',
      library: build.library || '',
      globalObject: 'this'
    },
    devtool: build.sourcemap ? 'source-map' : false,
    mode: build.uglify ? 'production' : 'development',
    // https://webpack.js.org/configuration/externals/
    externals: build.externals || {}
  }
})

module.exports = config.map(c => {
  c.plugins = c.plugins || []
  c.plugins.push(new webpack.DefinePlugin(stringify(opts.data)))
  c.plugins.push(new webpack.BannerPlugin(banner(c.output.library)))

  if (opts.copy.length > 0) {
    c.plugins.push(new CopyWebpackPlugin(opts.copy))
  }

  c['module'] = modules

  if (opts.eslint.enable) {
    // eslint-loader
    c.module.rules.unshift({
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude: /node_modules/,
      options: merge(
        {},
        {
          root: true,
          parser: 'babel-eslint',
          extends: 'eslint-config-standard',
          // formatter: require('eslint-friendly-formatter'),
          parserOptions: {
            ecmaVersion: 8,
            sourceType: 'module',
            ecmaFeatures: {
              experimentalObjectRestSpread: true
            }
          },
          env: {
            browser: true
          },
          cache: true
        },
        opts.eslint.options
      )
    })
  }

  return c
})
