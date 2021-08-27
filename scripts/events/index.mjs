import ActionRequestEventHandler from './action-request-event-handler'
import KeyDownEventHandler from './key-down-event-handler'

export default function () {
  window.addEventListener('actionrequest', ActionRequestEventHandler.instance())
  window.addEventListener('keydown', KeyDownEventHandler.instance())
}
