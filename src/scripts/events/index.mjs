import ActionRequestEventHandler from './action-request-event-handler.mjs'
import KeyDownEventHandler from './key-down-event-handler.mjs'

export default function () {
  window.addEventListener('actionrequest', ActionRequestEventHandler.instance())
  window.addEventListener('keydown', KeyDownEventHandler.instance())
}
