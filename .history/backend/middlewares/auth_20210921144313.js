const auth = (req, res, next) => {
  // 判断用户名是否存在
  if (req.session.username) {
    next()
  }
}

exports.auth = auth