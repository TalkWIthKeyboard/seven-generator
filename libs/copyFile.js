const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')

/**
 * 复制文件
 * @param srcPath 源文件路径
 * @param tgtPath 目标文件路径
 * @returns {Promise.<void>}
 */
const copyFile = (srcPath, tgtPath) => {
  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(srcPath)
    rd.on('error', err => {
      reject(err)
    })

    const wr = fs.createWriteStream(tgtPath)
    wr.on('error', err => {
      reject(err)
    })

    wr.on('close', () => {
      resolve()
    })

    rd.pipe(wr)
  })
}

/**
 * 对于多选项配置的文件过滤
 * @param baseName
 * @param tgtPath
 * @param option
 * @returns {boolean}
 */
const multiplyFilter = (baseName, tgtPath, option) => {
  const dirName = path.dirname(tgtPath)
  const splitList = baseName.split('_')

  if (splitList.length > 0) {
    switch (splitList[0]) {
      case 'config':
        return splitList[1] === option.database
          ? path.join(dirName, splitList[0])
          : false
      case '.gitignore':
        return path.join(dirName, splitList[0])
      case 'package':
        return splitList[1] === 'copy.json'
          ? path.join(dirName, `${splitList[0]}.json`)
          : false
      default:
        break
      // 继续添加规则
    }
  }

  return tgtPath
}

/**
 * 递归获取一个路径下所有的文件路径
 * @param srcPath 源路径
 * @param tgtPath 目标路径
 * @param blackList 黑名单
 * @param option 配置
 *        {
 *          database: mongo/mysql,
 *          ...
 *        }
 * @returns {Promise.<*>}
 * @example
 * searchAllFilesAndCopy(
 *    path.join(__dirname, '..', 'sources'),
 *    path.join(__dirname, '..', 'hello'),
 *    ['views', 'public'],
 *    { database: 'mongo' }
 * )
 */
const searchAllFilesAndCopy = async (srcPath, tgtPath, blackList, option) => {
  // 过滤黑名单文件
  if (_.filter(blackList, each => each !== path.basename(srcPath)).length !== blackList.length) {
    return
  }
  const afterFilter = multiplyFilter(path.basename(srcPath), tgtPath, option)
  // 文件 直接复制
  if (!fs.statSync(srcPath).isDirectory() && afterFilter) {
    await copyFile(srcPath, afterFilter)
  }
  // 文件夹 创建文件夹,递归复制
  try {
    const files = fs.readdirSync(srcPath)
    if (afterFilter) {
      if (!fs.existsSync(afterFilter)) {
        fs.mkdirSync(afterFilter)
      }
    } else {
      return
    }
    await Promise.map(files, each => {
      return searchAllFilesAndCopy(
        path.join(srcPath, each),
        path.join(afterFilter, each),
        blackList,
        option
      )
    })
  } catch (err) {
    throw err
  }
}

module.exports = {
  searchAllFilesAndCopy,
  copyFile,
}
