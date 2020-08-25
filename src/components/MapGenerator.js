import { CHUNK_WIDTH, CHUNK_HEIGHT } from './constants'
import Chunk from './Chunk'

class MapGenerator {
  constructor() {
    //this.numChunksX = Math.ceil(window.innerWidth / CHUNK_WIDTH)
    //this.numChunksY = Math.ceil(window.innerHeight / CHUNK_HEIGHT)
    this.numChunksX = 2
    this.numChunksY = 3
    this.chunks = Array.from(Array(this.numChunksX), () => new Array(this.numChunksY))

    for (let x = 0; x < this.numChunksX; x++) {
      for(let y = 0; y < this.numChunksY; y++) {
        const chunk = new Chunk(x, y, this)
        this.chunks[x][y] = chunk
      }
    }

    return this
  }

  getChunk(x, y) {
    const row = this.chunks[x]

    if (row) { return row[y] }
  }
}

export default MapGenerator