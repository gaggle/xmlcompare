/* global describe, it */
'use strict'
const assert = require('assert')

const xmlcompare = require('../lib/index')

describe('xmlcompare', function () {
  it('matches two simple blocks', function () {
    xmlcompare('<div/>', '<div> </div>')
  })

  it('matches matching attributes', function () {
    xmlcompare('<div data-foo="bar"/>', '<div data-foo="bar"/>')
  })

  it('asserts on mismatching attributes', function () {
    assert.throws(
      () => { xmlcompare('<div data-foo="bar"/>', '<div data-foo="spam"/>') },
      assert.AssertionError
    )
  })

  it('asserts on no content', function () {
    assert.throws(
      () => { xmlcompare('\n', '') },
      assert.AssertionError
    )
  })

  it('asserts on different number of children', function () {
    assert.throws(
      () => { xmlcompare('<div/>', '<div>\n</div>\n<div/>') },
      assert.AssertionError
    )
  })

  it('asserts on content mismatch', function () {
    assert.throws(
      () => { xmlcompare('<div/>', '<div>foo</div>') },
      assert.AssertionError
    )
  })

  it('asserts on space-difference within pre-tag', function () {
    assert.throws(
      () => { xmlcompare('<pre>foo</pre>', '<pre>  foo</pre>') },
      assert.AssertionError
    )
  })

  it('works with buffers', function () {
    xmlcompare(Buffer.from('<div/>'), Buffer.from('<div> </div>'))
  })

  it('can ignore empty children', function () {
    xmlcompare('<div/><div/>', '<div/>\n<div/>', {ignoreEmpty: true})
  })

  it('throws on content mismatch with ignore empty enabled', function () {
    assert.throws(
      () => { xmlcompare('<div/>', '<span/>', {ignoreEmpty: true}) },
      assert.AssertionError
    )
  })

  it('can ignore differences that does not alter semantics', function () {
    xmlcompare('<div/>\n<div/>', '<div/><div/>', {ignoreEmpty: true})
  })

  it('ignores warnings by default', function () {
    const unclosedTag = '<img>'
    xmlcompare(unclosedTag, unclosedTag)
  })

  it('can assert on warnings', function () {
    const unclosedTag = '<img>'
    assert.throws(
      () => { xmlcompare(unclosedTag, unclosedTag, {ignoreWarnings: false}) },
      assert.AssertionError
    )
  })

  it('understands &mdash; entity', function () {
    xmlcompare('<p>&mdash;</p>', '<p>&mdash;</p>')
  })
})
