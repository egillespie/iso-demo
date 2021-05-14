const toggleOpacity = require('../walls/walls-opacity-toggle')
const togglePlayerSprite = require('../player/player-sprite-toggle')
const movePlayerNorth = require('../player/player-move-north')
const movePlayerEast = require('../player/player-move-east')
const movePlayerSouth = require('../player/player-move-south')
const movePlayerWest = require('../player/player-move-west')

// Sources:
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
const W = { key: 'w', code: 'KeyW' }
const A = { key: 'a', code: 'KeyA' }
const S = { key: 's', code: 'KeyS' }
const D = { key: 'd', code: 'KeyD' }
const O = { key: 'o', code: 'KeyO' }
const P = { key: 'p', code: 'KeyP' }

// Maps `KeyboardEvent.code` values to actions that the player may perform.
// Also provides functions to customize the key bindings.
const keyBindings = {
  assignMoveNorth (keyboardEvent) {
    assignKeyBinding(keyboardEvent, movePlayerNorth)
  },
  assignMoveEast (keyboardEvent) {
    assignKeyBinding(keyboardEvent, movePlayerEast)
  },
  assignMoveSouth (keyboardEvent) {
    assignKeyBinding(keyboardEvent, movePlayerSouth)
  },
  assignMoveWest (keyboardEvent) {
    assignKeyBinding(keyboardEvent, movePlayerWest)
  },
  assignToggleOpacity (keyboardEvent) {
    assignKeyBinding(keyboardEvent, toggleOpacity)
  },
  assignTogglePlayerSprite (keyboardEvent) {
    assignKeyBinding(keyboardEvent, togglePlayerSprite)
  },
  resetMoveNorth () {
    this.assignMoveNorth(W)
  },
  resetMoveEast () {
    this.assignMoveEast(D)
  },
  resetMoveSouth () {
    this.assignMoveSouth(S)
  },
  resetMoveWest () {
    this.assignMoveWest(A)
  },
  resetToggleOpacity () {
    this.assignToggleOpacity(O)
  },
  resetTogglePlayerSprite () {
    this.assignTogglePlayerSprite(P)
  },
  resetAll () {
    this.resetMoveNorth()
    this.resetMoveEast()
    this.resetMoveSouth()
    this.resetMoveWest()
    this.resetToggleOpacity()
    this.resetTogglePlayerSprite()
  }
}

function assignKeyBinding (keyboardEvent, callback) {
  const oldCode = Object.keys(keyBindings).find(
    code => keyBindings[code] === callback
  )
  delete keyBindings[oldCode]
  keyBindings[keyboardEvent.code] = callback
}

keyBindings.resetAll()
module.exports = keyBindings
