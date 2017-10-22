/* global describe, it */
'use strict'
const assert = require('assert')

const xmlutil = require('../lib/xmldom-util')

describe('nodeListToArr', function () {
  it('converts to Array', function () {
    const xml = xmlutil.strToXML('<div></div>')
    assert(
      xmlutil.nodeListToArr(xml.childNodes) instanceof Array,
      `Type expected to be Array`
    )
  })

  it('preserves order', function () {
    const xml = xmlutil.strToXML('<div></div><span></span>')
    assert.deepEqual(
      xmlutil.nodeListToArr(xml.childNodes).map(e => e.nodeName),
      ['div', 'span']
    )
  })
})

describe('strToXML', function () {
  it('converts to Document', function () {
    const result = xmlutil.strToXML('foo')
    assert.equal(result.nodeName, '#document')
  })

  it('throws error on empty str', function () {
    assert.throws(
      () => xmlutil.strToXML(''),
      Error
    )
  })

  it('throws error on attribute warnings', function () {
    assert.throws(
      () => xmlutil.strToXML('<img>'),
      Error
    )
  })
})
