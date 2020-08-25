import createCanvas from 'components/Canvas'
import MapGenerator from 'components/MapGenerator'
import { requestAnimFrame, setFPS } from 'components/Utils'
import { CHUNK_WIDTH, CHUNK_HEIGHT } from 'components/constants'

import './style.css';

const { canvas, ctx } = createCanvas()
var lastTime;
var map
const fps = document.createElement('div')

const init = () => {
  map = new MapGenerator
  console.log(map)
  addFPS()

  lastTime = Date.now()
  main()
}

const addFPS = () => {
  fps.classList.add('fps')
  document.body.append(fps)
}

const main = () => {
  var now = Date.now()
  var dt = (now - lastTime)

  setFPS(dt, fps)
  update(dt)
  render()
  updateParticles()

  lastTime = now
  requestAnimFrame(main)
}

const update = (dt) => {
  handleInput(dt)
  updateEntities(dt)
}

const handleInput = (dt) => {
  //console.log('handle input')
}

const updateEntities = (dt) => {
  //console.log('update entities')
}

const render = () => {
  //console.log('render')
}

const convertChunkToImage = (chunkX, chunkY) => {
  // from here: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  // and here: http://bl.ocks.org/biovisualize/5400576
  const chunk = map.chunks[chunkX][chunkY]
  const originX = chunkX * CHUNK_WIDTH
  const originY = chunkY * CHUNK_HEIGHT

  var imageData = ctx.getImageData(originX, originY, CHUNK_WIDTH, CHUNK_HEIGHT)
  var buf = new ArrayBuffer(imageData.data.length)
  var buf8 = new Uint8ClampedArray(buf)
  var data = new Uint32Array(buf)

  for (let x = 0; x < CHUNK_WIDTH; x++) {
    for (let y = 0; y < CHUNK_HEIGHT; y++) {
      var value = chunk.particles[y][x].getColor()
      data[y * CHUNK_WIDTH + x] =
          (255   << 24) |
          (value/2 << 16) |
          (value <<  8) |
          255;
    }
  }

  imageData.data.set(buf8);
  ctx.putImageData(imageData, originX, originY)
}

const updateParticles = () => {
  for (let y = map.numChunksY - 1; y >= 0; y--) {
    for (let x = map.numChunksX - 1; x >= 0; x--) {
      map.chunks[x][y].update(x, y, map.chunks)
      convertChunkToImage(x, y)
    }
  }
}

init()