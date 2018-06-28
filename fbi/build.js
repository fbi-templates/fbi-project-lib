const path = require('path')
const webpack = require('webpack')
const statsLogger = require('./helpers/stats-logger')
const webpackConfigs = require('./configs/webpack.config')
const clean = require('./helpers/clean')

const dist = path.join(process.cwd(), 'dist')

async function build () {
  await clean(dist)

  return new Promise((resolve, reject) => {
    webpack(webpackConfigs, (err, stats) => {
      if (err) {
        reject(err)
      }

      statsLogger(stats.stats)
      resolve()
    })
  })
}

module.exports = build
