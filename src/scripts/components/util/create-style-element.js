const createElement = require('./create-element')

module.exports = function (css) {
  const style = createElement('style')
  style.textContent = css
  return style
}
