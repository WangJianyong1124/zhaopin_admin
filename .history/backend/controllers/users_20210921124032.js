const usersModel = require("../models/users")
// 载入加密对象
const { hash } = require("../utils/tools")


// 注册用户
const signup = async (req, res, next) => {
  // 设置返回数据格式 头部
  res.set('content-type', 'application/json; charset=utf-8')
  // 获取前端传过来的用户名和密码
  const { username, password } = req.body

  // 加密密码
  const bcryptPassword = await hash(password)

  // 判断用户是否存在
  let findResult = await usersModel.findUser(username)

  // 如果数据库中用户存在
  if (findResult) {
    res.render("fail", {
      data: JSON.stringify({
        message: "用户名已存在"
      })
    })
  } else {
    // 如果数据库中用户不存在 则开始添加用户
    let result = await usersModel.signup({
      username,
      password: bcryptPassword
    })


    res.render("success", {
      data: JSON.stringify({
        message: "注册成功"
      })
    })
  }
}

// 用户登录
const signin = async (req, res, next) => {
  // 获取用户名和密码
  const { username, password } = req.body
  // 验证用户名是否存在
  let result = await usersModel.findUser(username)
  console.log(result);
}

// 用户列表
const list = async (req, res, next) => {
  // 设置返回数据格式 头部
  res.set('content-type', 'application/json; charset=utf-8')
  const listResult = await usersModel.findList()
  res.render("success", {
    data: JSON.stringify(listResult)
  })
}


// 删除用户列表
const remove = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const { id } = req.body
  let result = await usersModel.removeUser(id)

  if (result) {
    res.render('success', {
      data: JSON.stringify({
        message: '删除成功！'
      })
    })
  }
  res.render('fail', {
    data: JSON.stringify({
      message: '删除失败！'
    })
  })
}

exports.signup = signup
exports.list = list
exports.remove = remove