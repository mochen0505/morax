#!/usr/bin/env node

const { exec } = require('shelljs')

exec('conventional-changelog -p angular -i CHANGELOG.md -s')
