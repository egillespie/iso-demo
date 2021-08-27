import toggleOpacity from '../walls/walls-opacity-toggle'
import togglePlayerSprite from '../player/player-sprite-toggle'
import movePlayerNorth from '../player/player-move-north'
import movePlayerEast from '../player/player-move-east'
import movePlayerSouth from '../player/player-move-south'
import movePlayerWest from '../player/player-move-west'

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
