// A custom event emitted when a modal popup produces an action (such as
// closing). The event may also include details about the triggering action.
class ModalActionEvent extends CustomEvent {
  constructor (action, details) {
    super('modal:action')
    this.name = this.constructor.name
    this.action = action
    this.details = details
  }
}

module.exports = ModalActionEvent
