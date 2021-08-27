import { floorWidth, floorHeight, floorLift } from '../floors/floor-const'

// The width of the player sprite in pixels
export const playerWidth = 30

// The height of the player sprite in pixels
export const playerHeight = 52

// The number of pixels to "lift" the player sprite vertically for it
// to appear centered in an isometric floor tile at the same position.
export const playerLift = 6

// The amounts required to move a player's position west
// one space in a grid.
export const playerCardinalWest = { colAdjust: -1, rowAdjust: 0 }

// The amounts required to move a player's position south
// one space in a grid.
export const playerCardinalSouth = { colAdjust: 0, rowAdjust: 1 }

// The amounts required to move a player's position east
// one space in a grid.
export const playerCardinalEast = { colAdjust: 1, rowAdjust: 0 }

// The amounts required to move a player's position north
// one space in a grid.
export const playerCardinalNorth = { colAdjust: 0, rowAdjust: -1 }

// The vertical amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export const playerAdjustTop = playerHeight - floorHeight + floorLift + playerLift

// The horizontal amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export const playerAdjustLeft = (floorWidth - playerWidth) / 2
