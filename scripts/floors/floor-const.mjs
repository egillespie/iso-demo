// The rendered height of a floor sprite in pixels
export const floorHeight = 30

// The rendered width of a floor sprite in pixels
export const floorWidth = 40

// The number of pixels from the bottom of a floor image
// where other sprites are to be drawn so they appear
// "lifted" by the floor.
export const floorLift = 10

// The amount to adjust the left position of the floor to center it
// in an isometric grid.
export const floorAdjustLeft = floorWidth / 2

// The amount to adjust the top of floor sprite so it can be
// tiled in an isometric grid.
export const floorAdjustTop = (floorHeight - floorLift) / 2
