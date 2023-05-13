/**
 * 数据模型 入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

/**
 * 创建外键
 *
 * Blog中有一个userId的字段来记录所属的User的id
 * 即将与该Blog对应的User关联起来，在查询Blog时会顺带获取User信息
 *
 * foreignKey: 'userId' 指定了外键的userId，如果不指定，默认是UserId
 */
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
}
