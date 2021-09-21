/* v */
// 导入 index.art 模板文件
import router from "../routes"
import indexTpl from "../views/index.art"
// 导入登录页 signin.art的模板文件
import signinTpl from "../views/signin.art"
import usersTpl from "../views/users.art"
import usersListTpl from "../views/users-list.art"
import usersListPageTpl from "../views/users-pages.art"

// 将index.art模板文件的内容保存到 变量中
const htmlIndex = indexTpl({})
const htmlSignin = signinTpl({})


// 定义每页几条
const pageSize = 3

// 临时存储读取的数据
let dataList = []

// 当前用户点击的页
let currentPage = 1



// 点击提交按钮
const _handleSubmit = (router) => {
  return (e) => {
    console.log(e);
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
        if (res.ret) {
          router.go("/index")
        }
      }
    })
  }
}

// 添加
const _signup = () => {
  const $btnClose = $("#users-close")
  // 提交表单   serialize  拿到表单的数据
  const data = $("#users-form").serialize()
  // 模拟表单提交
  $.ajax({
    url: "/api/users",
    type: "post",
    data,
    success(res) {
      // 添加成功之后刷新页面
      // console.log(res)
      // 添加数据之后读取数据 
      _loadData()
      // 然后渲染第一页的数据
      // _list(1)
    }
  })

  $btnClose.click()
}

// 分页逻辑
const _pagenation = (data) => {
  // 定义总条数
  const total = data.length
  // 求总页数
  const pageCount = Math.ceil(total / pageSize)
  // 根据总页数生成数组
  const pageArray = new Array(pageCount)

  const htmlPage = usersListPageTpl({
    pageArray,
  })

  $("#users-page").html(htmlPage)

  // 默认页面页码高亮
  // $("#users-page-list li:nth-child(2)").addClass("active")
  _setPageActive(currentPage)

}

// 加载数据方法
const _loadData = () => {
  return $.ajax({
    url: "/api/users",
    // async: false 发送同步请求
    // async: false,
    success(result) {
      dataList = result.data

      //   // 分页
      _pagenation(result.data)
      _list(currentPage)
    }
    // success(result) {
    //   // 渲染list逻辑
    //   $("#users-list").html(usersListTpl({
    //     data: result.data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    //   }))

    // }
  })
}

/**
 * 页码高亮
 * @param {当前选中的是哪个页} index 
 */
const _setPageActive = (index) => {
  $("#users-page #users-page-list li:not(:first-child, :last-child")
    .eq(index - 1)
    .addClass("active")
    .siblings()
    .removeClass("active")
}

/**
 * 
 * @param {*} pageNum 当前在第几页
 */
const _list = (pageNum) => {
  url: "/api/users/list",
    // 渲染list逻辑
    $("#users-list").html(usersListTpl({
      data: dataList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    }))
}

// 首页
const index = (router) => {

  const _loadIndex = (res) => {

    // 渲染页面
    res.render(htmlIndex)

    // 让页面撑满屏幕
    // window.resize
    $(window, ".wrapper").resize()

    // 填充用户列表
    $("#content").html(usersTpl())

    // 绑定删除按钮
    $("#users-list").on("click", ".remove", function () {
      $.ajax({
        url: "/api/users",
        type: "delete",
        data: {
          id: $(this).data("id")
        },
        success() {
          _loadData()

          // 是否是最后一页
          const isLastPage = Math.ceil(dataList.length / pageSize) === currentPage
          // 是否是这一页的最后一条数据
          const isResOne = dataList.length % pageSize === 1
          // 是否不是第一页
          const notPageFirst = currentPage > 0

          if (isLastPage && isResOne && notPageFirst) {
            // 跳转到前一页
            currentPage--
          }

        }
      })
    })

    // 点击之后页码高亮
    $("#users-page").on("click", "#users-page-list li:not(:first-child, :last-child)", function () {
      const index = $(this).index()
      $(this).addClass("active").siblings().removeClass("active")
      // 渲染其他页
      _list(index)
      // 修改当前用户点击的页为 当前值
      currentPage = index
      _setPageActive(index)
    })

    // 点击前一页
    $("#users-page").on("click", "#users-page-list li:first-child", function () {
      if (currentPage > 1) {
        currentPage--
        _list(currentPage)
        _setPageActive(currentPage)
      }
    })

    // 点击后一页
    $("#users-page").on("click", "#users-page-list li:last-child", function () {
      if (currentPage < Math.ceil(dataList.length / pageSize)) {
        currentPage++
        _list(currentPage)
        _setPageActive(currentPage)
      }
    })


    // 点击退出账号
    $("#users-signout").on("click", () => {
      router.go("/signin")
      $.ajax({
        url: "/api/users/signout",
        dataType: "json",
        success(result) {
          if (result.ret) {
            // 刷新页面
            location.reload()
          }
        }
      })
    })

    // 第一次 渲染list
    await _loadData()
    // _list(1)

    // 点击保存 提交表单
    $("#users-save").on("click", _signup)

  }
}

return async (req, res, next) => {
  $.ajax({
    url: "/api/users/isAuth",
    // 后端没定义header 可以使用这句
    dataType: "json",
    async: false,
    success(result) {
      if (result.ret) {
        _loadIndex()
      } else {
        router.go("/signin")
      }
    }
  })
}

// 登录页
const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSignin)

    // 在登录页中绑定点击事件
    $("#signin").on("submit", _handleSubmit(router))
  }
}


export {
  index,
  signin,
}