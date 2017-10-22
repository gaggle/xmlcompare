'use strict'
const xmldom = require('xmldom')

/**
 * @param {NodeList|Array} nodeList
 * @returns {Element[]}
 */
exports.nodeListToArr = function (nodeList) {
  let array = []
  for (let i = nodeList.length >>> 0; i--;) {
    array[i] = nodeList[i]
  }
  return array
}

/**
 * @param str
 * @param {{}} [opts]
 * @param {Function} [opts.warning]
 * @param {Function} [opts.error]
 * @param {Function} [opts.fatalError]
 * @returns {Document}
 */
exports.strToXML = function (str, opts) {
  opts = opts || {}

  const domOptions = {
    locator: {},
    errorHandler: {
      warning: opts.warning || function (w) {},
      error: opts.error || function (w) { throw new Error(w) },
      fatalError: opts.fatalError || function (w) { throw new Error(w) }
    }
  }

  const parser = new xmldom.DOMParser(domOptions)
  return parser.parseFromString(str, 'text/xml')
}
