import toggleOpacity from '../walls/walls-opacity-toggle.mjs'
import togglePlayerSprite from '../player/player-sprite-toggle.mjs'
import movePlayerNorth from '../player/player-move-north.mjs'
import movePlayerEast from '../player/player-move-east.mjs'
import movePlayerSouth from '../player/player-move-south.mjs'
import movePlayerWest from '../player/player-move-west.mjs'

const actionMap = {
  toggleOpacity,
  togglePlayerSprite,
  movePlayerNorth,
  movePlayerEast,
  movePlayerSouth,
  movePlayerWest
}

export default class ActionRequestEventHandler {
  handleEvent (event) {
    const action = actionMap[event.action]
    if (action) {
      action()
    }
  }

  static instance () {
    if (!ActionRequestEventHandler._instance) {
      ActionRequestEventHandler._instance = new ActionRequestEventHandler()
    }
    return ActionRequestEventHandler._instance
  }
}
