const path = require('path')
const { searchAllFilesAndCopy } = require('./copyFile')

const { changePackageJson } = require('./fileChange')

const blackList = ['views', 'public']
const databaseType = ['mongo', 'mysql', 'all']

/**
 * 命令行控制复制逻辑
 * @param srcPath
 * @param tgtPath
 * @param database
 * @param backend
 * @param name
 */
const operationControl = async (srcPath, tgtPath, database, backend, name) => {
  // 1. 文件的修改
  changePackageJson(path.join(srcPath, 'package.json'), { name })

  return backend
    ? searchAllFilesAndCopy(srcPath, tgtPath, blackList, { database: databaseType[database] })
    : searchAllFilesAndCopy(srcPath, tgtPath, [], { database: databaseType[database] })
}

module.exports = operationControl
