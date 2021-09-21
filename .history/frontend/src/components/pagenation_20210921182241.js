// 定义每页几条
const pageSize = 3
// 当前用户点击的页
let currentPage = 1

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
