const path = require('path')
const rollup = require('rollup')
const clean = require('./helpers/clean')
// const builds = require('./helpers/config')
const getConfig = require('./helpers/config')
const findTargets = require('./helpers/find-targets')

const dist = path.join(process.cwd(), ctx.options.dist)

async function watch (config) {
  const watcher = rollup.watch(config)
  const src = path.relative(
    path.join(process.cwd(), ctx.options.src),
    config.input
  )
  const dest = path.relative(
    path.join(process.cwd(), ctx.options.dist),
    config.output.file
  )

  return new Promise((resolve, reject) => {
    watcher.on('event', event => {
      switch (event.code) {
        // the watcher is (re)starting
        case 'START':
          break
        // building an individual bundle
        case 'BUNDLE_START':
          break
        // finished building a bundle
        case 'BUNDLE_END':
          ctx.logger.info(`Bundle(${config._name}) '${src}' -> '${dest}'`)
          break
        // finished building all bundles
        case 'END':
          resolve()
          break
        // encountered an error while bundling
        case 'ERROR':
        // encountered an unrecoverable error
        case 'FATAL':
          watcher.close()
          reject(event)
      }
    })
  })
}

async function entry (name) {
  const builds = await getConfig()

  // log all targets
  ctx.logger.log(
    `All targets: ${builds.map(n => n._name)}. (fbi w --name=target,target,...)`
  )

  let needBuilds = findTargets('watch', builds, name)

  if (needBuilds.length === 0) {
    await clean(dist)
    ctx.logger.log('Clean dist folder done.')

    needBuilds = builds
  }

  if (needBuilds.length > 0) {
    await Promise.all(needBuilds.map(watch))
  }
}

module.exports = entry
