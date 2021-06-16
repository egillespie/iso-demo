const ActionRequestEvent = require('./action-request-event')

// Sources:
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
const W = { key: 'w', code: 'KeyW' }
const A = { key: 'a', code: 'KeyA' }
const S = { key: 's', code: 'KeyS' }
const D = { key: 'd', code: 'KeyD' }
const O = { key: 'o', code: 'KeyO' }
const P = { key: 'p', code: 'KeyP' }

class KeyDownEventHandler {
  constructor () {
    this.keyBindings = {}
    this.resetAll()
  }

  handleEvent (event) {
    if (document.activeElement === document.body) {
      const action = this.keyBindings[event.code]
      if (action) {
        event.preventDefault()
        action()
      }
    }
  }

  broadcast (action) {
    return function () {
      window.dispatchEvent(new ActionRequestEvent(action))
    }
  }

  assignKeyBinding (keyboardEvent, callback) {
    const oldCode = Object.keys(this.keyBindings).find(
      code => this.keyBindings[code] === callback
    )
    delete this.keyBindings[oldCode]
    this.keyBindings[keyboardEvent.code] = callback
  }

  assignMoveNorth (keyboardEvent) {
    this.assignKeyBinding(keyboardEvent, this.broadcast('movePlayerNorth'))
  }

  assignMoveEast (keyboardEvent) {
    this.assignKeyBinding(keyboardEvent, this.broadcast('movePlayerEast'))
  }

  assignMoveSouth (keyboardEvent) {
    this.assignKeyBinding(keyboardEvent, this.broadcast('movePlayerSouth'))
  }

  assignMoveWest (keyboardEvent) {
    this.assignKeyBinding(keyboardEvent, this.broadcast('movePlayerWest'))
  }

  assignToggleOpacity (keyboardEvent) {
    this.assignKeyBinding(keyboardEvent, this.broadcast('toggleOpacity'))
  }

  assignTogglePlayerSprite (keyboardEvent) {
    this.assignKeyBinding(keyboardEvent, this.broadcast('togglePlayerSprite'))
  }

  resetMoveNorth () {
    this.assignMoveNorth(W)
  }

  resetMoveEast () {
    this.assignMoveEast(D)
  }

  resetMoveSouth () {
    this.assignMoveSouth(S)
  }

  resetMoveWest () {
    this.assignMoveWest(A)
  }

  resetToggleOpacity () {
    this.assignToggleOpacity(O)
  }

  resetTogglePlayerSprite () {
    this.assignTogglePlayerSprite(P)
  }

  resetAll () {
    this.resetMoveNorth()
    this.resetMoveEast()
    this.resetMoveSouth()
    this.resetMoveWest()
    this.resetToggleOpacity()
    this.resetTogglePlayerSprite()
  }
}

module.exports = KeyDownEventHandler
