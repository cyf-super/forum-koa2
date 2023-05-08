/**
 * @description 博客广场缓存层（cache）
 */

// const { start, set, redisCient } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key前缀
// const KEY_PREFIX = 'forum:square:'

async function getSquareCacheList(pageIndex, pageSize) {
  // const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // redisCient.connect().then(() => {
  //   // 设置键值对
  // redisCient.set('key', 'value', (err, result) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log(result) // OK
  //   }
  // })

  //   // 获取键值对
  //   redisCient.get('key', (err, result) => {
  //     if (err) {
  //       console.error(err)
  //     } else {
  //       console.log('result--> ', result) // value
  //     }
  //   })
  // })
  // 尝试获取缓存
  // const { get } = await start()
  // console.log(get)
  // const cacheRes = await get(key)
  // console.log('cacheRes==> ', cacheRes)
  // if (cacheRes) {
  //   return cacheRes
  // }

  // 没有读取到缓存则读取数据库
  const result = await getBlogListByUser({ pageIndex, pageSize })
  // 设置缓存，过期时间为 1min
  // set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}
