import { floorHeight, floorWidth, floorLift } from '../floors/floor-const'

// The width of a wall sprite in pixels
export const wallWidth = 30

// The height of a wall sprite in pixels
export const wallHeight = 60

// The amount in pixels that a wall sprite must be moved vertically
// to appear centered on a floor tile
export const wallLift = 2

// The amount a wall must be moved to the left to appear centered
// on a floor tile.
export const wallAdjustLeft = (floorWidth - wallWidth) / 2

// The amount a wall's top position must be adjusted so it appears
// isometrically centered on a floor tile
export const wallAdjustTop = wallHeight - floorHeight + floorLift + wallLift
