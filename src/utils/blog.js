const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 的文件内容
const BLOG_LIST_TPL = fs
  .readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
  .toString()

/**
   * 根据blobList 渲染出html字符串
   * @param {*} blogList 博客列表
   * @param {*} canReply 是否可以回复
   * @returns
   */
function getBlogListStr(blogList = [], canReply = true) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
}
