import { WIDTH, HEIGHT } from 'components/constants'

class Particle {
  constructor(type) {
    this.type = type
  }

  getColor() {
    if (this.isType('sand')) {
        return 16776960
    } else if (this.isType('empty')) {
        return 16777215
    }
  }

  update(x, y, particles) {
    if (this.isType('empty')) {
      return
    } else if (this.isType('sand')) {
      this.updateSand(x, y, particles)
    }
  }

  updateSand(x, y, particles) {
    const below = particles[y * HEIGHT + x + WIDTH]

    if (below) {
      if (below.isType('empty')) {
        below.setType(this.type)
        this.setType('empty')
      } else {
        const diff = Math.random() < 0.5 ? -1 : 1
        const adjacent = particles[y * HEIGHT + x + WIDTH + diff]
        if (adjacent && adjacent.isType('empty')) {
          adjacent.setType(this.type)
          this.setType('empty')
        } else {
          const other = particles[y * HEIGHT + x + WIDTH - diff]
          if (other && other.isType('empty')) {
            other.setType(this.type)
            this.setType('empty')
          }
        }
      }
      return
    }
  }

  isType(type) {
    return this.type === type
  }

  setType(type) {
    this.type = type
  }
}

export default Particle;