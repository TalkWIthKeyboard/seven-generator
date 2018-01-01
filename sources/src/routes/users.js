const router = require('koa-router')()

const userResponse = (ctx, next) => {
  ctx.body = 'this is a users response'
}

router.get('/', userResponse)

module.exports = router
