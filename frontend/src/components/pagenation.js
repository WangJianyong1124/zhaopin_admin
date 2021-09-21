import usersListPageTpl from "../views/users-pages.art"

import page from "../databus/page"

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

// 分页逻辑
const pagenation = (data, pageSize) => {
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
  _setPageActive(page.currentPage)

  _bindEvent(data, pageSize)
}

const _bindEvent = (data, pageSize) => {

  // 点击之后页码高亮
  $("#users-page").on("click", "#users-page-list li:not(:first-child, :last-child)", function () {
    const index = $(this).index()
    // $(this).addClass("active").siblings().removeClass("active")
    // 渲染其他页
    // _list(index)
    // 修改当前用户点击的页为 当前值
    // currentPage = index
    // 修改
    page.setCurrentPage(index)
    //
    $("body").trigger("changeCurrentPage", index)

    _setPageActive(index)
  })

  // 点击前一页
  $("#users-page").on("click", "#users-page-list li:first-child", function () {
    if (page.currentPage > 1) {
      page.setCurrentPage(page.currentPage - 1)
      $("body").trigger("changeCurrentPage", page.currentPage)
      _setPageActive(page.currentPage)
    }
  })

  // 点击后一页
  $("#users-page").on("click", "#users-page-list li:last-child", function () {
    if (page.currentPage < Math.ceil(data.length / pageSize)) {
      page.setCurrentPage(page.currentPage + 1)
      $("body").trigger("changeCurrentPage", page.currentPage)
      _setPageActive(page.currentPage)
    }
  })
}

export default pagenation