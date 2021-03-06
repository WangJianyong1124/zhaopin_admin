# Nodejs项目
### 前端
- 前端工程化环境 (webpack)
- CSS预处理工具 (sass)
- JS库 (jQuery)
- 路由 (SME-Router)
- JS模块化 (ES Module、CommonJS Module)
- UI组件库(Bootstrap、AdminLTE)
- 架构 RMVC (Art-template)

### 后端
- Node.js
- Express
- mongoDB(Mongoose)
- EJS
- jwt(json web token)
- 架构 RMVP

### 开发架构
- 前后端分离的开发架构

### backend 后端文件夹
  - controllers 负责处理用户输入和响应
  - middlewares 中间件
  - models 负责模型控制 操作管理系统数据
  - public 公共文件
  - routes 存放路由相关文件
  - utils 工具类
  - views 后台返回数据样式

### frontend 前端文件夹
  - public 公共文件夹
  - src/assets 资源文件 不会被webpack压缩
  - components 组件类
  - controllers 处理用户操作
  - databus 事件总线
  - routes 路由
  - views 存放html
  - app.js 程序入口


### 数据库名(zhaopin-admin) MongoDB
  - 端口 27017
  - 集合 users
  - 字段 username、password


### 遇到的问题
  - a链接问题 
    - 当我填写完表单点提交的时候 点保存没反应 通过在定义的点击事件里面打印文字 发现触发了点击的事件  但是就是不会将数据保存到数据库 而且添加用户的模态框也不会消失  
    - 解决办法： 阻止a链接的默认行为
   ......
