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

  update(x, y, particles) {
    if (this.get('type') == 'empty') {
      return
    } else if (this.get('type') == 'sand') {
      if (x + 1 >= CHUNK_WIDTH || y > CHUNK_HEIGHT) { return }

      if (particles[x + 1][y].get('type') == 'empty') {
        particles[x + 1][y].set('type', 'sand')
        this.set('type', 'empty')
      }
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