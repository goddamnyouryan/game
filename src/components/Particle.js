import { WIDTH, HEIGHT } from 'components/constants'

class Particle {
  constructor(type) {
    this.type = type
  }

  getColorData() {
      if (this.type == 'sand') {
          return {
              r: '0',
              g: '0',
              b: '0',
              a: '255',
          }
      } else if (this.type == 'empty') {
          return {
              r: '255',
              g: '255',
              b: '255',
              a: '255',
          }
      }
  }

  update(x, y) {
    if (this.get('type') == 'empty') {
      return
    } else if (this.get('type') == 'sand') {
      if (x + 1 >= WIDTH - 1 || y + 1 >= HEIGHT - 1) { return }

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