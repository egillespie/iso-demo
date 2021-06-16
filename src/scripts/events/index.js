const ActionRequestEventHandler = require('./action-request-event-handler')
const KeyDownEventHandler = require('./key-down-event-handler')

module.exports = function () {
  window.addEventListener('actionrequest', new ActionRequestEventHandler())
  window.addEventListener('keydown', new KeyDownEventHandler())
}
