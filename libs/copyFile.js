const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')
const fileNameReplace = {
  '.gitignore*': '.gitignore',

}

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
 * 递归获取一个路径下所有的文件路径
 * @param srcPath 源路径
 * @param tgtPath 目标路径
 * @param blackList 黑名单
 * @returns {Promise.<*>}
 * @example
 * searchAllFilesAndCopy(path.join(__dirname, '..', 'sources'), path.join(__dirname, '..', 'hello'), ['views', 'public'])
 */
const searchAllFilesAndCopy = async (srcPath, tgtPath, blackList) => {
  if (_.filter(blackList, each => each !== path.basename(srcPath)).length !== blackList.length) {
    return
  }

  // 文件 直接复制
  if (!fs.statSync(srcPath).isDirectory()) {
    return copyFile(srcPath, tgtPath)
  }

  // 文件夹 创建文件夹,递归复制
  try {
    const files = fs.readdirSync(srcPath)
    if (!fs.existsSync(tgtPath)) {
      fs.mkdirSync(tgtPath)
    }
    for (let index = 0; index < files.length; index++) {
      await searchAllFilesAndCopy(path.join(srcPath, files[index]), path.join(tgtPath, files[index]), blackList)
    }
  } catch (err) {
    throw err
  }
}

module.exports = searchAllFilesAndCopy
