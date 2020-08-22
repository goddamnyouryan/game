import createCanvas from 'components/Canvas'
import Particle from 'components/Particle'
import { requestAnimFrame, setFPS } from 'components/Utils'

const WIDTH = 100
const HEIGHT = 100
const particles = Array.from(Array(WIDTH), () => new Array(HEIGHT))
const { canvas, ctx } = createCanvas()
var lastTime;

const init = () => {
    generateRandomImage()

    lastTime = Date.now()
    main()
}


const main = () => {
    var now = Date.now()
    var dt = (now - lastTime)

    setFPS(dt)
    update(dt)
    render()
    generateRandomImage()

    lastTime = now
    requestAnimFrame(main)
}

const update = (dt) => {
    handleInput(dt)
    updateEntities(dt)
}

const handleInput = (dt) => {
    //console.log('handle input')
}

const updateEntities = (dt) => {
    //console.log('update entities')
}

const render = () => {
    //console.log('render')
}

const generateRandomImage = () => {
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            const type = (Math.random() >= 0.5) ? 'sand' : 'empty';
            particles[x][y] = new Particle(type)
        }
    }

    const imageDataArray = new Uint8ClampedArray(WIDTH * HEIGHT * 4)

    for (let x = 0, i = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++, i += 4) {
            const particle = particles[x][y]
            imageDataArray[i] = particle.r
            imageDataArray[i + 1] = particle.b
            imageDataArray[i + 2] = particle.g
            imageDataArray[i + 3] = particle.a
        }
    }

    const imageData = new ImageData(imageDataArray, WIDTH, HEIGHT)
    ctx.putImageData(imageData, 0, 0)
}

init()