const Koa = require('koa')
const config = require('config')

const app = new Koa()
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const log4js = require('koa-log4')
const { httpLog, error } = require('./utils/log4js')

const routes = require('./routes')


// middlewares
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    error(err)
    ctx.body = {
      message: err.message,
      stack: err.stack,
    }
  }
})

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}))
app.use(log4js.koaLogger(httpLog, { level: 'auto' }))
app.use(require('koa-static')(`${__dirname}/../public`))

app.use(views(`${__dirname}/../views`, {
  extension: 'pug',
}))

// routes
app.use(routes.routes(), routes.allowedMethods())

app.listen(config.get('serverPort') || 3000)

module.exports = app
