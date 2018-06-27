const path = require('path')
const fs = require('fs-extra')

module.exports = function () {
  let tmp
  if (ctx.options.copy) {
    const keys = Object.keys(ctx.options.copy)

    if (keys.length > 0) {
      tmp = {}
      keys.map(k => {
        tmp[path.join(process.cwd(), k)] = path.join(
          process.cwd(),
          ctx.options.copy[k]
        )
      })
    }
  }

  if (!tmp || Object.keys(tmp).length === 0) {
    return false
  }

  return Promise.all(
    Object.keys(tmp).map(async t => {
      await fs.copy(t, tmp[t])
      const src = path.relative(process.cwd(), t)
      const dist = path.relative(process.cwd(), tmp[t])
      ctx.logger.log(`Copy '${src}' -> '${dist}'`)
    })
  )
}
