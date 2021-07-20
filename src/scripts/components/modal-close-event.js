// A custom event emitted when a modal popup closes. The event will include
// details about the action that triggered the close. For example, whether
// Confirm or Cancel was clicked.
class ModalCloseEvent extends CustomEvent {
  constructor (button, details) {
    super('modalclose')
    this.name = this.constructor.name
    this.button = button
    this.details = details
  }
}

module.exports = ModalCloseEvent
