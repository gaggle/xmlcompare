'use strict'
const assert = require('assert')
const domCompare = require('dom-compare')
const xmldom = require('xmldom')
const zip = require('lodash.zip')

const compare = domCompare.compare
const reporter = domCompare.GroupingReporter
const parser = new xmldom.DOMParser()

module.exports = function (actual, expected) {
  const actualEl = strToXML(actual.toString())
  const expectedEl = strToXML(expected.toString())

  const actuals = actualEl.childNodes
  const expecteds = expectedEl.childNodes

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
${safeStr(expected.toString())}

Actual document:
${safeStr(actual.toString())}`

  assert(comp.getResult(), message)
}

const safeStr = function (str) {
  return str === '\n' ? '\\n' : str
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
    str += prefix + indentBy(safeStr(element.toString()), prefix.length + 1)
    str += '\n'
  }
  return str
}

const strToXML = function (str) {
  assert(str, `Invalid XML:\n${str}`)
  const xml = parser.parseFromString(str, 'text/xml')
  assert(xml.childNodes.length > 0, `No elements found:\n${str}`)
  return xml
}
