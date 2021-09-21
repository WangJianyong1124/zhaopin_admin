const auth = (req, res, next) => {
  // 判断用户名是否存在
  if (req.session.username) {
    // 存在则交给下一个中间件处理
    next()
  }else {

  }
}

exports.auth = auth