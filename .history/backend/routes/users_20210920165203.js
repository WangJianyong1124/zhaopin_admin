var express = require('express');
var router = express.Router();

// 载入中间件
const { signup, list } = require("../controllers/users")


router.post('/signup', signup);
router.get("/list", list)
router.delete("/delete", )

module.exports = router;
