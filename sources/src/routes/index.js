const internalRouter = require('./internal')
const appRouter = require('./app')
const managementRouter = require('./management')
const router = require('koa-router')()

router.use('/1.0', appRouter.routes(), appRouter.allowedMethods())
router.use('/internal', internalRouter.routes(), internalRouter.allowedMethods())
router.use('/management', managementRouter.routes(), managementRouter.allowedMethods())

module.exports = router