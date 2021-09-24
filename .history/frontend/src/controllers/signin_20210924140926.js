// 导入登录页 signin.art的模板文件
import signinTpl from "../views/signin.art"

const htmlSignin = signinTpl({})

// 登录页
const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin)

    // 在登录页中绑定点击事件
    $("#signin").on("submit", _handleSubmit(router))
  }
}

// 点击提交按钮
const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault()
    // router.go("/index")
    // 提交表单   serialize  拿到表单的数据
    const data = $("#signin").serialize()
    // 模拟表单提交
    $.ajax({
      url: "/api/users/signin",
      type: "post",
      dataType: "json",
      data,
      success(res) {
        if (res.ret){
          router.go("/index")
        }
      }
    })
  }
}

export default signin
