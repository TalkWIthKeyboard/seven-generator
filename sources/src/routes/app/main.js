const router = require('koa-router')()
const redis = require('./../../connect/ioredis')

const main = async (ctx) => {
  const keys = await redis.keys('*')
  await ctx.render('index', {
    title: keys
  })
}

router.get('/', main)

module.exports = router
