const statsConfig = require('../configs/stats')

module.exports = stats => {
  console.log('')

  const infos = stats ? Array.isArray(stats) ? stats : [stats] : [stats]

  infos.map(i => {
    const opts = i.compilation.options
    const assets = i.compilation.assets

    console.log(
      `Target: ${ctx.utils.style.bold(opts.output.libraryTarget)}${opts.output.library ? '  Name: ' + ctx.utils.style.bold(opts.output.library) : ''}  File: ${ctx.utils.style.bold(opts.entry)}`
    )

    const compilationAssets = Object.keys(assets)
    const maxLength = Math.max(...compilationAssets.map(a => a.length)) + 5

    console.log('Output:')

    compilationAssets.map(asset => {
      const obj = {
        name: asset,
        size: assets[asset].size()
      }
      console.log(
        `${ctx.utils.style.green(obj.name.padStart(maxLength, ' '))}    ${(obj.size / 1024).toFixed(2)}K`
      )
    })

    console.log(`${i.toString(statsConfig)}\n`)
  })
}
