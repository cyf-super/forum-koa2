## 基于 koa2 的博客网站

这是一个基于 koa2、后端渲染摸板的博客网站，具备的功能有：

- 登陆注册
- 发表博客
- 关注、@其它人等等

### 技术栈

- koa2 + @koa/router
- session + radis
- MySql（sequelize）
- ejs 模板

### 使用

在 src/conf/db.js 中，配置你的数据库账号密码

```
npm install  // 安装依赖

npm run dev  // 起一个koa服务
```

本地需要启动 redis 服务

```
redis-server
```
