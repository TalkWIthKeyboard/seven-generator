const main = require('./main')
const user = require('./users')
const router = require('koa-router')()

router.use('/seven/main', main.routes(), main.allowedMethods())
router.use('/seven/user', user.routes(), user.allowedMethods())

module.exports = router
