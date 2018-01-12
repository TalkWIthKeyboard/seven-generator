const log4 = require('koa-log4')
const path = require('path')
const fs = require('fs')

const logPath = path.join(__dirname, '..', '..', 'logs')

try {
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath)
  }
} catch (err) {
  console.error('Can not mkdir logs.')
}

log4.configure({
  appenders: {
    console: {
      type: 'console',
    },
    errorLog: {
      type: 'dateFile',
      filename: path.join(logPath, 'errors.log'),
      pattern: '-yyyy-MM-dd',
      maxLogSize: 10485760,
      numBackups: 5,
    },
    httpLog: {
      type: 'dateFile',
      filename: path.join(logPath, 'http.log'),
      pattern: '-yyyy-MM-dd',
      maxLogSize: 10485760,
      numBackups: 5,
    },
  },
  categories: {
    default: { appenders: ['httpLog', 'console'], level: 'info' },
    error: { appenders: ['errorLog', 'console'], level: 'error' },
  },
}, { cwd: logPath })


module.exports = {
  error: info => log4.getLogger('error').error(info),
  httpLog: log4.getLogger('http'),
}
