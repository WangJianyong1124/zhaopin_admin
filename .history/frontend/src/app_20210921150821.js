// 加载css
import "./assets/common.css"

// 加载路由
import router from "./routes"

// 第一个打开的页面
$.ajax({
  url: "/api/users/isAuth",
  // 后端没定义header 可以使用这句
  dataType: "json",
  success(result) {
    if (result.ret) {
      console.log(result.ret);
    }
    router.go("/index")
  }
})
