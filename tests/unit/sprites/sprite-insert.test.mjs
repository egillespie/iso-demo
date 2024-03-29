const SPRITE_INSERT_MODULE = '../../../scripts/sprites/sprite-insert'

test('ignores undefined nodes', async () => {
  document.body.innerHTML = '<div id="render-window"></div>'
  const insertSprite = (await import(SPRITE_INSERT_MODULE)).default
  insertSprite(undefined)
  const renderWindow = document.getElementById('render-window')
  expect(renderWindow.children.length).toBe(0)
})

test('appends single node to render window', async () => {
  document.body.innerHTML = '<div id="render-window"></div>'
  const insertSprite = (await import(SPRITE_INSERT_MODULE)).default

  const sprite = document.createElement('div')
  sprite.id = 'i-am-unique'

  insertSprite(sprite)
  expect(document.getElementById('i-am-unique')).toBeDefined()
})

test('appends array of nodes to render window', async () => {
  document.body.innerHTML = '<div id="render-window"></div>'
  const insertSprite = (await import(SPRITE_INSERT_MODULE)).default

  const aSprite = document.createElement('div')
  aSprite.id = 'i-am-a-sprite'
  const bSprite = document.createElement('div')
  bSprite.id = 'i-am-b-sprite'
  const cSprite = document.createElement('div')
  cSprite.id = 'i-am-c-sprite'
  const allSprites = [aSprite, bSprite, cSprite]

  insertSprite(allSprites)
  expect(document.getElementById('i-am-a-sprite')).toBeDefined()
  expect(document.getElementById('i-am-b-sprite')).toBeDefined()
  expect(document.getElementById('i-am-c-sprite')).toBeDefined()
})
