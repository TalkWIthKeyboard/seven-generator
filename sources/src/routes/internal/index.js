const user = require('./users')
const router = require('koa-router')()

router.use('/user', user.routes(), user.allowedMethods())

module.exports = router