#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const controller = require('./libs/command')

program
  .version('1.0.0')
  .option('-d, --database <n>', 'Choose database type (0. mongoDB; 1. mysql; 2. mongoDB + mysql)', parseInt, 0)
  .option('-b, --backend <n>', 'Choose back-end model or full stack model (0. full stack; 1. backend)', parseInt, 1)
  .parse(process.argv)



controller(path.join(__dirname, 'sources'), process.cwd(), program.database, program.backend)

