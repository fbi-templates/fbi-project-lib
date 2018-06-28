const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))

function datetimeFormat (dt) {
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const date = (dt.getDate() + '').padStart(2, '0')
  const hour = (dt.getHours() + '').padStart(2, '0')
  const minute = (dt.getMinutes() + '').padStart(2, '0')
  const second = (dt.getSeconds() + '').padStart(2, '0')

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

module.exports = name => {
  return `${name || pkg.name} v${pkg.version}
${pkg.description}
Authors: ${pkg.author}
Date:    ${datetimeFormat(new Date())} `
}
