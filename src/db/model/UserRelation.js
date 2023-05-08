/**
 * @description 用户关注关系
 */

const req = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = req.define('UserRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
})

module.exports = UserRelation
