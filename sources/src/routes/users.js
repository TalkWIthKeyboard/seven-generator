const router = require('koa-router')()

const userResponse = ctx => {
  ctx.body = { data: 'this is a users response' }
}

router.get('/', userResponse)

module.exports = router
