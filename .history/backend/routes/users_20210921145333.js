var express = require('express');
var router = express.Router();

// 载入中间件
const { signup, list, remove, signin, signout } = require("../controllers/users")

const {auth} = require("../middlewares/auth")

// 获取数据
router.get("/", auth, list)
router.delete("/", auth, remove)

// 登陆注册
router.post('/', auth, signup);
router.post("/signin", signin)
router.get("/signout", signout)

module.exports = router;
