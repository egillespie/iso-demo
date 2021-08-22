// A custom event emitted when an action has been requested, for example,
// by pressing a key or clicking a button. This allows key presses, clicks,
// game controllers, and other input events to be mapped to app-specific
// events instead of the app needing to know about the specifics of what
// triggered the action.
export default class ActionRequestEvent extends CustomEvent {
  constructor (action) {
    super('actionrequest')
    this.name = this.constructor.name
    this.action = action
  }
}
