const path = require('path')
const rollup = require('rollup')
const clean = require('./helpers/clean')
// const builds = require('./helpers/config')
const getConfig = require('./helpers/config')
const { uglify } = require('rollup-plugin-uglify')
const { minify } = require('uglify-es')
const findTargets = require('./helpers/find-targets')
const copy = require('./helpers/copy')

const dist = path.join(process.cwd(), ctx.options.dist)

async function build (config) {
  if (config.uglify) {
    config.plugins.push(uglify(ctx.options.uglify || {}, minify))
  }
  delete config.uglify

  const src = path.relative(
    path.join(process.cwd(), ctx.options.src),
    config.input
  )
  const dest = path.relative(
    path.join(process.cwd(), ctx.options.dist),
    config.output.file
  )

  try {
    const bundle = await rollup.rollup(config)
    await bundle.generate(config.output)
    await bundle.write(config.output)
    ctx.logger.info(`Bundle(${config._name}) '${src}' -> '${dest}'`)
  } catch (err) {
    throw err
  }
}

async function entry (name) {
  const builds = await getConfig()

  // log all targets
  ctx.logger.log(
    `All targets: ${builds.map(n => n._name)}. (fbi b --name=target,target,...)`
  )

  let needBuilds = findTargets('build', builds, name)

  if (needBuilds.length === 0) {
    await clean(dist)
    ctx.logger.log('Clean dist folder done.')

    needBuilds = builds
  }

  if (needBuilds.length > 0) {
    await Promise.all(needBuilds.map(build))
  }

  await copy()
}

module.exports = entry
