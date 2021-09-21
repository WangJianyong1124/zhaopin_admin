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

// router.route("/signin", signin(router))

export default router