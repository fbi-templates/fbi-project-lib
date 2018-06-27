module.exports = (task, builds, name) => {
  const taskParams = ctx.task.getParams(task)
  const names = taskParams.name || name
  const namesArr = names ? names.split(',').map(name => name.trim()) : []
  let needBuilds = []

  if (namesArr.length > 0 && builds.length > 0) {
    for (let i = 0, len = namesArr.length; i < len; i++) {
      const tmp = builds.find(b => b._name === namesArr[i])
      if (tmp) {
        needBuilds.push(tmp)
      }
    }
  }

  return needBuilds
}
