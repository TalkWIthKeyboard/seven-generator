const cf = require('./copyFile')

const blackList = ['views', 'public']

/**
 * 命令行控制复制逻辑
 * @param srcPath
 * @param tgtPath
 * @param database
 * @param backend
 */
const operationControl = async (srcPath, tgtPath, database, backend) => {
  return backend
    ? cf(srcPath, tgtPath, blackList)
    : cf(srcPath, tgtPath, [])
}

module.exports = operationControl
