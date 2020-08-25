import { CHUNK_WIDTH, CHUNK_HEIGHT } from 'components/constants'

class Particle {
  constructor(type) {
    this.type = type
  }

  getColor() {
    if (this.type == 'sand') {
        return 16776960
    } else if (this.type == 'empty') {
        return 16777215
    }
  }

  update(x, y, particles, chunk) {
    if (this.get('type') == 'empty') {
      return
    } else if (this.get('type') == 'sand') {
      this.updateSand(x, y, particles, chunk)
    }
  }

  updateSand(x, y, particles, chunk) {
    if (x + 1 >= CHUNK_WIDTH) {
      const nextYChunk = chunk.neighbor(0, 1)
      if (nextYChunk) {
        if (nextYChunk.particles[0][y].get('type') == 'empty') {
          nextYChunk.particles[0][y].set('type', 'sand')
          this.set('type', 'empty')
        }
        return
      } else {
        return
      }
    }

    if (particles[x + 1][y].get('type') == 'empty') {
      particles[x + 1][y].set('type', 'sand')
      this.set('type', 'empty')
      return
    }
  }

  set(attr, val) {
    this[attr] = val
  }

  get(attr) {
    return this[attr]
  }
}

export default Particle;