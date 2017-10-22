'use strict'
const xmldom = require('xmldom')

const parser = new xmldom.DOMParser({
  errorHandler: function (w) { throw new Error(w) }
})

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
 * @returns {Document}
 */
exports.strToXML = function (str) {
  return parser.parseFromString(str, 'text/xml')
}
