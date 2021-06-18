const ActionRequestEventHandler = require('./action-request-event-handler')
const KeyDownEventHandler = require('./key-down-event-handler')

module.exports = function () {
  window.addEventListener('actionrequest', ActionRequestEventHandler.instance())
  window.addEventListener('keydown', KeyDownEventHandler.instance())
}
