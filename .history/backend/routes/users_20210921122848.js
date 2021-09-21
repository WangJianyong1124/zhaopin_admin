var express = require('express');
var router = express.Router();

// 载入中间件
const { signup, list, remove } = require("../controllers/users")


router.post('/', signup);
router.get("/", list)
router.delete("/", remove)

router.post("sigin", signin)

module.exports = router;
