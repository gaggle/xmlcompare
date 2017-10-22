/* global describe, it */
'use strict'
const assert = require('assert')

const xmlcompare = require('../lib/index')

describe('xmlcompare', function () {
  it('matches two simple blocks', function () {
    xmlcompare('<div></div>', '<div> </div>')
  })

  it('matches multiple blocks', function () {
    xmlcompare(`<div></div>\n<div></div>`, `<div></div> <div></div>`)
  })

  it('throws on no content', function () {
    assert.throws(
      () => { xmlcompare('\n', '') },
      assert.AssertionError
    )
  })

  it('throws on different number of children', function () {
    assert.throws(
      () => { xmlcompare('<div></div>', '<div>\n</div>\n<div></div>') },
      assert.AssertionError
    )
  })

  it('throws on content mismatch', function () {
    assert.throws(
      () => { xmlcompare('<div></div>', '<div>foo</div>') },
      assert.AssertionError
    )
  })

  it('works with buffers', function () {
    xmlcompare(Buffer.from('<div></div>'), Buffer.from('<div> </div>'))
  })
})
