const router = require('koa-router')()
const redis = require('./../utils/ioredis')

const main = async (ctx, next) => {
  const keys = await redis.keys('*')
  await ctx.render('index', {
    title: keys,
  })
}

router.get('/', main)

module.exports = router
