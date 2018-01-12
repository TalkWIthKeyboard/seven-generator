const router = require('koa-router')()

const userResponse = (ctx) => {
  ctx.body = { data: 'This is the management of users router.' }
}

router.get('/', userResponse)

module.exports = router