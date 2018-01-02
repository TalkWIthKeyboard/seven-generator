const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { copyFile } = require('./copyFile')

/**
 * 修改package.json文件
 * @param sourcePath
 * @param option
 * @example
 * changePackageJson(path.join(__dirname, '..', 'package-test.json'), { name: 'hahahaha' })
 */
const changePackageJson = async (sourcePath, option) => {
  try {
    const copyPath = path.join(path.dirname(sourcePath), 'package_copy.json')
    await copyFile(sourcePath, copyPath)
    const packageObj = JSON.parse(fs.readFileSync(copyPath).toString())
    _.map(option, (value, key) => {
      packageObj[key] = value
    })
    fs.writeFileSync(copyPath, JSON.stringify(packageObj))
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  changePackageJson
}

