# xmlcompare
Assert xml equality

## Install
```bash
npm install gaggle/xmlcompare
```

## Use

Assert two strings:
```js
xmlcompare('<p>foo</p>', '<p>foo</>')
```

Options can be passed in as 2nd argument:
```js
xmlcompare('<p>foo</p>', '<p>foo</>', {ignoreEmpty: true})
```

Options:
```
 * @param {Boolean} [opts.ignoreEmpty] If true empty elements are ignored,
 *                                     otherwise they are included in equality check (default false)
 * @param {Boolean} [opts.ignoreWarnings] If true warnings are ignored,
 *                                        otherwise they throw Error (default true)
```
