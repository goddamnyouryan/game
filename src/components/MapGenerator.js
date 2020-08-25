import { CHUNK_WIDTH, CHUNK_HEIGHT } from './constants'
import Chunk from './Chunk'

class MapGenerator {
  constructor() {
    //this.numChunksX = Math.ceil(window.innerWidth / CHUNK_WIDTH)
    //this.numChunksY = Math.ceil(window.innerHeight / CHUNK_HEIGHT)
    this.numChunksX = 2
    this.numChunksY = 2
    this.chunks = Array.from(Array(this.numChunksX), () => new Array(this.numChunksY))

    for (let x = 0; x < this.numChunksX; x++) {
      for(let y = 0; y < this.numChunksY; y++) {
        const chunk = new Chunk(x, y, this)
        this.chunks[x][y] = chunk
      }
    }

    return this
  }

  update() {
    for (let x = this.numChunksX - 1 ; x >= 0; x--) {
        for (let y = this.numChunksY - 1; y >= 0; y--) {
            this.chunks[x][y].update(x, y, this.chunks)
        }
      }
  }

  getParticle(x, y) {
    const chunkX = Math.floor(x / CHUNK_WIDTH)
    const chunkY = Math.floor(y / CHUNK_HEIGHT)
    const relativeX = x - (chunkX * CHUNK_WIDTH)
    const relativeY = y - (chunkY * CHUNK_HEIGHT)

    return this.chunks[chunkX][chunkY].particles[relativeX][relativeY]
  }

  getChunk(x, y) {
    const row = this.chunks[x]

    if (row) { return row[y] }
  }
}

export default MapGenerator