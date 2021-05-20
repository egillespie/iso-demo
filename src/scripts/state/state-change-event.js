// A custom event to be emitted whenever the application state changes. The
// `field` parameter is the full, dot-separated field name of the state property
// (e.g. `seeThroughWalls` or `player.col`) and `detail` is a value or object
// passed in the `detail` property of the `CustomEvent`.
class StateChangeEvent extends CustomEvent {
  constructor (field, detail) {
    super(`statechange:${field.toLowerCase()}`, { detail })
    this.name = this.constructor.name
  }
}

module.exports = StateChangeEvent
