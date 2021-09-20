// 导入数据库连接文件
const { Users } = require("../utils/db")

const findUser = (username) => {
  return Users.findOne({ username })
}

const signup = ({ username, password }) => {
  const users = new Users({
    username,
    password
  })

  // 保存到数据库中
  return users.save()
}


// 查询列表
const findList = () => {
  return Users.find().sort({_id: -1})
}

// 删除
const remove = id => {
  console.log(11111111);
  return Users.findByIdAndDelete(id)
}

exports.signup = signup
exports.findUser = findUser
exports.findList = findList
exports.remove = remove