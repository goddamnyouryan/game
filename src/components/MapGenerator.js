import { WIDTH, HEIGHT } from './constants'
import Chunk from './Chunk'
import Particle from './Particle'

class MapGenerator {
  constructor() {
    this.particles = []

    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        const type = (Math.random() >= 0.5) ? 'sand' : 'empty';
        const particle = new Particle(type)
        this.particles[y * WIDTH + x] = particle
      }
    }
  }

  generateChunks() {
    // not currently generating chunks, maybe a premature optimization
    //this.numChunksX = Math.ceil(window.innerWidth / CHUNK_WIDTH)
    //this.numChunksY = Math.ceil(window.innerHeight / CHUNK_HEIGHT)
    this.numChunksX = 3
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

  getChunk(x, y) {
    const row = this.chunks[x]

    if (row) { return row[y] }
  }
}

export default MapGenerator