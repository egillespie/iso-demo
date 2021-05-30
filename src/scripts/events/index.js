const KeyDownEventTranslator = require('./key-down-event-translator')

module.exports = function () {
  window.addEventListener('keydown', new KeyDownEventTranslator())
}
