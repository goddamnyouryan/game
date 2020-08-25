import { CHUNK_WIDTH, CHUNK_HEIGHT } from './constants'
import Particle from './Particle'

class Chunk {
  constructor(x, y, map) {
    this.x = x
    this.y = y
    this.map = map
    this.particles = Array.from(Array(CHUNK_WIDTH), () => new Array(CHUNK_HEIGHT))

    this.setupParticles()
  }

  setupParticles() {
    for (var x = 0; x < CHUNK_WIDTH; x++) {
      for (var y = 0; y < CHUNK_HEIGHT; y++) {
        const type = (Math.random() >= 0.5) ? 'sand' : 'empty';
        this.particles[x][y] = new Particle(type)
      }
    }
  }

  update() {
    for (let x = CHUNK_WIDTH - 1 ; x > -1; x--) {
      for (let y = CHUNK_HEIGHT - 1; y > -1; y--) {
          this.particles[x][y].update(x, y, this.particles, this)
      }
    }
  }

  neighbor(dx = 0, dy = 0) {
    return this.map.getChunk(this.x + dx, this.y + dy)
  }
}

export default Chunk