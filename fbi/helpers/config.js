const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const sourcemaps = require('rollup-plugin-sourcemaps')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const bundleWorker = require('rollup-plugin-bundle-worker')

const pkg = require(path.join(process.cwd(), 'package.json'))

const data = ctx.options.replace || {}

Object.keys(data).map(d => {
  data[d] = JSON.stringify(data[d])
})

const builds = ctx.options.builds

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: path.resolve(process.cwd(), ctx.options.src, opts.entry),
    external: opts.external,
    uglify: opts.uglify,
    plugins: [
      replace(data),
      json(),
      postcss(ctx.options.postcss || {}),
      buble(ctx.options.buble || {}),
      bundleWorker(),
      alias(Object.assign({}, ctx.options.alias, opts.alias)),
      commonjs(),
      nodeResolve()
    ].concat(opts.plugins || []),
    output: {
      file: path.resolve(process.cwd(), ctx.options.dist, opts.dest),
      format: opts.format,
      banner: opts.banner,
      name: opts.name || pkg.name
    }
  }

  if (opts.env) {
    config.plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(opts.env)
      })
    )
  }

  if (ctx.options.sourcemap) {
    config.plugins.push(sourcemaps())
    config.output['sourcemap'] = true
    config.output['sourcemapFile'] = path.resolve(
      process.cwd(),
      ctx.options.dist,
      opts.dest + '.map'
    )
  }

  if (ctx.options.eslint.enable) {
    config.plugins.unshift(
      require('rollup-plugin-eslint')(
        Object.assign(
          {
            formatter: require('eslint-friendly-formatter'),
            exclude: 'node_modules/**',
            include: '**/*.js'
          },
          ctx.options.eslint.options
        )
      )
    )
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

module.exports = Object.keys(builds).map(genConfig)
