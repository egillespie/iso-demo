import activateEventManager from './events/index'
import createBoard from './boards/board-create'
import createPlayer from './player/player-create'
import movePlayerTo from './player/player-move-to-position'
import registerComponents from './components/index'

registerComponents()

createBoard()
createPlayer('girl')
movePlayerTo(4, 5)

activateEventManager()
