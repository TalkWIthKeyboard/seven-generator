const main = require('./main')
const router = require('koa-router')()

router.use('/', main.routes(), main.allowedMethods())

module.exports = router