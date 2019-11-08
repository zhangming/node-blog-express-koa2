const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  // 登录 POST
  if(method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
      if(data.username) {
        req.session.username = data.username
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录 GET 测试
  if(method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if(data.username) {
        req.session.username = data.username
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录 cookie 测试
  if(method === 'GET' && req.path === '/api/user/logintest') {
    if(req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('登录失败')
    )
  }
}
module.exports = handleUserRouter