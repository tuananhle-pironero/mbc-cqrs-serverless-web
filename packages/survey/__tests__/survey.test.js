'use strict'

const survey = require('..')
const assert = require('assert').strict

assert.strictEqual(survey(), 'Hello from survey')
console.info('survey tests passed')
