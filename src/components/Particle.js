class Particle {
  constructor(type) {
      this.type = type;
      const colorData = this.getColorData(type)
      this.r = colorData.r
      this.g = colorData.g
      this.b = colorData.b
      this.a = colorData.a
  }

  getColorData(type) {
      if (type == 'sand') {
          return {
              r: '255',
              g: '255',
              b: '0',
              a: '255',
          }
      } else if (type == 'empty') {
          return {
              r: '255',
              g: '255',
              b: '255',
              a: '255',
          }
      }
  }
}

export default Particle;