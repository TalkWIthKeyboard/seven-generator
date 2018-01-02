#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const controller = require('./libs/command')

program
  .version('1.0.0')
  .option('-n, --name [name]', 'The name of this project', 'koa2-demo')
  .option('-d, --database <n>', 'Choose database type (0. mongoDB; 1. mysql; 2. mongoDB + mysql)', parseInt, 0)
  .option('-b, --backend <n>', 'Choose back-end model or full stack model (0. full stack; 1. backend)', parseInt, 1)
  .parse(process.argv)

const tgtPath = path.join(process.cwd(), program.name)
if (!fs.existsSync(tgtPath)) {
  fs.mkdirSync(tgtPath)
}
controller(path.join(__dirname, 'sources'), tgtPath, program.database, program.backend, program.name)

