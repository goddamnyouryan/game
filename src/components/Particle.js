import { WIDTH, HEIGHT } from 'components/constants'

class Particle {
  constructor(type) {
    this.type = type
  }

  getColorData() {
      if (this.type == 'sand') {
          return 16776960
      } else if (this.type == 'empty') {
          return 16777215
      }
  }

  update(x, y) {
    if (this.get('type') == 'empty') {
      return
    } else if (this.get('type') == 'sand') {
      if (x + 1 >= WIDTH || y > HEIGHT) { return }

      if (window.particles[x + 1][y].get('type') == 'empty') {
        window.particles[x + 1][y].set('type', 'sand')
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