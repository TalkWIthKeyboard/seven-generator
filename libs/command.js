const cf = require('./copyFile')

const blackList = ['views', 'public']
const databaseType = ['mongo', 'mysql', 'all']

/**
 * 命令行控制复制逻辑
 * @param srcPath
 * @param tgtPath
 * @param database
 * @param backend
 */
const operationControl = async (srcPath, tgtPath, database, backend) => {
  return backend
    ? cf(srcPath, tgtPath, blackList, { database: databaseType[database] })
    : cf(srcPath, tgtPath, [], { database: databaseType[database] })
}

module.exports = operationControl
