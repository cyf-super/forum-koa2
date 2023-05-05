/**
 * @description utils controller
 */
const path = require('path')
const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { uploadFilesizeFailInfo } = require('../model/ErrorInfo')
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

// 文件最大体积：1G
const MIX_SIZE = 1024 * 1024 * 1024

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径
 * @returns
 */
async function saveFile({ name, type, size, filePath }) {
  // 上传文件过大
  if (size > MIX_SIZE) {
    await fse.remove(filePath) // 删除临时文件
    return new ErrorModel(uploadFilesizeFailInfo)
  }

  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath) // 移动文件

  return new SuccessModel({
    code: 0,
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
