/* v */
// 导入 index.art 模板文件
import router from "../routes"
import indexTpl from "../views/index.art"
import usersTpl from "../views/users.art"
import usersListTpl from "../views/users-list.art"
import usersListPageTpl from "../views/users-pages.art"

// 将index.art模板文件的内容保存到 变量中
const htmlIndex = indexTpl({})

// 定义每页几条
const pageSize = 10

// 临时存储读取的数据
let dataList = []



// 事件绑定的方法
const _bindMethods = () => {
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

  // 点击保存 提交表单
  $("#users-save").on("click", _signup)
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
  })
}



// 首页
const index = (router) => {
  return async (req, res, next) => {

    $.ajax({
      url: "/api/users/isAuth",
      // 后端没定义header 可以使用这句
      dataType: "json",
      async: false,
      success(result) {
        if (result.ret) {
          console.log(result.ret);
          router.go("/index")
        } else {
          router.go("/signin")
        }
      }
    })

    // 渲染页面
    res.render(htmlIndex)

    // 让页面撑满屏幕
    // window.resize
    $(window, ".wrapper").resize()

    // 填充用户列表
    $("#content").html(usersTpl())
    // 第一次 渲染list
    await _loadData()

    // 页面事件绑定
    _bindMethods()
  }
}



export default index