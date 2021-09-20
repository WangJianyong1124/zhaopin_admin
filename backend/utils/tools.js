// 载入加密工具 bcrypt
const bcrypt = require("bcrypt")

exports.hash = (myPlaintextPassword) => {
    // 返回的是undefined 因此需要自己封装一个promise
    return new Promise((resolve, reject) => {
      bcrypt.hash(myPlaintextPassword, 10, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
}

