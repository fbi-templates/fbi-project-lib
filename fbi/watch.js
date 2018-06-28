const webpack = require('webpack')
const webpackConfigs = require('./configs/webpack.config')
const statsLogger = require('./helpers/stats-logger')

const compiler = webpack(webpackConfigs)

async function entry (name) {
  return new Promise((resolve, reject) => {
    compiler.watch(
      {
        // watchOptions 示例
        aggregateTimeout: 300,
        poll: undefined
      },
      (err, stats) => {
        if (err) {
          reject(err)
        }

        statsLogger(stats.stats)

        resolve()
      }
    )
  })
}

module.exports = entry
