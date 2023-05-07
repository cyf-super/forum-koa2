/**
 * 博客数据模型
 */

const req = require('../seq')
const { INTEGER, TEXT, STRING } = require('../types')

const Blog = req.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '博客内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog
