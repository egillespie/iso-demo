const actionMap = {
  toggleOpacity: require('../walls/walls-opacity-toggle'),
  togglePlayerSprite: require('../player/player-sprite-toggle'),
  movePlayerNorth: require('../player/player-move-north'),
  movePlayerEast: require('../player/player-move-east'),
  movePlayerSouth: require('../player/player-move-south'),
  movePlayerWest: require('../player/player-move-west')
}

class ActionRequestEventHandler {
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

module.exports = ActionRequestEventHandler
