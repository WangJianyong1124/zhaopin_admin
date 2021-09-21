
// 导入登录页 signin.art的模板文件
import signinTpl from "../views/signin.art"

// 登录页
const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin)

    // 在登录页中绑定点击事件
    $("#signin").on("submit", _handleSubmit(router))
  }
}
