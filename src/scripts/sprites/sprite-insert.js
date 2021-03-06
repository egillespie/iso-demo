const state = require('../state')

// Places nodes (sprites) in the rendering window. The node argument
// must be either a single node element or an array of elements.
module.exports = function (node) {
  if (node) {
    if (Array.isArray(node)) {
      node.forEach(sprite => state.dom.renderWindow.appendChild(sprite))
    } else {
      state.dom.renderWindow.appendChild(node)
    }
  }
}
