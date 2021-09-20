var express = require('express');
var router = express.Router();

// 载入中间件
const { signup, list } = require("../controllers/users")


router.post('/', signup);
router.get("/", list)
router.delete("/", remove)

module.exports = router;
