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

// 用户列表
const list = async (req, res, next) => {
  // 设置返回数据格式 头部
  res.set('content-type', 'application/json; charset=utf-8')
  const listResult = await usersModel.findList()
  res.render("success", {
    data: JSON.stringify(listResult)
  })
}


// 删除用户
const remove = async (req, res, next) => {
  // 设置返回数据格式 头部
  res.set('content-type', 'application/json; charset=utf-8')
  // 记录用户点击的是谁
  const { id } = req.body
  let result = await usersModel.remove(id)
  res.render("success", {
    data: {
      message: "用户删除成功"
    }
  })
}

exports.signup = signup
exports.list = list
exports.remove = remove