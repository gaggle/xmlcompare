'use strict'
const assert = require('assert')
const domCompare = require('dom-compare')
const merge = require('lodash.merge')
const zip = require('lodash.zip')

const xmlutil = require('./xmldom-util')

const compare = domCompare.compare
const reporter = domCompare.GroupingReporter

module.exports = function (actual, expected, opts) {
  opts = merge({ignoreEmpty: false}, opts)

  const actualEl = wrappedStrToXML(actual.toString())
  const expectedEl = wrappedStrToXML(expected.toString())

  let actuals = xmlutil.nodeListToArr(actualEl.childNodes)
  let expecteds = xmlutil.nodeListToArr(expectedEl.childNodes)

  if (opts.ignoreEmpty) {
    actuals = expecteds.filter(e => e.toString() !== '\n')
    expecteds = expecteds.filter(e => e.toString() !== '\n')
  }

  assertNumberOfChildNodes(actuals, expecteds)
  zip(actuals, expecteds).forEach(e => assertXml(...e))
}

const assertNumberOfChildNodes = function (actual, expected) {
  const message = `Number of child nodes mismatch
Expected:
${strToLinesCounted(expected)}
Got:
${strToLinesCounted(actual)}`
  assert.equal(actual.length, expected.length, message)
}

const assertXml = function (actual, expected) {
  const comp = compare(expected, actual, {stripSpaces: true})

  const message = `Documents are not equal
${reporter.report(comp)}

Expected document:
${expected.toString()}

Actual document:
${actual.toString()}`

  assert(comp.getResult(), message)
}

const strToLinesCounted = function (arr) {
  const indentBy = function (str, amount) {
    const lines = str.split('\n')
    const spacer = new Array(amount).join(' ')
    return lines.join('\n' + spacer)
  }

  let str = ''
  for (let i = 0; i < arr.length; i++) {
    const num = i + 1
    const element = arr[i]
    const prefix = `${num}:`
    str += prefix + indentBy(element.toString(), prefix.length + 1)
    str += '\n'
  }
  return str
}

const wrappedStrToXML = function (str) {
  try {
    return xmlutil.strToXML(str)
  } catch (err) {
    assert.fail(err)
  }
}