var express = require('express');
var router = express.Router();

// 载入中间件
const { signup, list, remove } = require("../controllers/users")

// 获取数据
router.get("/", list)
router.delete("/", remove)

// 登陆注册
router.post('/', signup);
router.post("sigin", signin)

module.exports = router;