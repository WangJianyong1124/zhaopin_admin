// 载入加密工具 bcrypt
const bcrypt = require("bcrypt")

// 加密
exports.hash = (myPlaintextPassword) => {
  // 返回的是undefined 因此需要自己封装一个promise
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, 10, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

// 比较密码是否正确
exports.compare = () => {
  return new Promise(() => {
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
    
    })
  })
}
