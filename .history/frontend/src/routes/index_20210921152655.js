/* r */
// 引入路由工具 sme-router
import SMERouter from "sme-router"
// 创建路由对象
const router = new SMERouter("root")

/* c */
import { signin, index } from "../controllers"


// 路由
router.route("/signin", signin(router))

router.route("/index", index(router))

// 路由守卫
router.use((req) => {
  // 第一个打开的页面
  $.ajax({
    url: "/api/users/isAuth",
    // 后端没定义header 可以使用这句
    dataType: "json",
    success(result) {
      if (result.ret) {
        console.log(result.ret);
        router.go("/index")
      } else {
        router.go("/signin")
      }
    }
  })

})

// router.route("/signin", signin(router))

export default router