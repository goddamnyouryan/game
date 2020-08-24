import createCanvas from 'components/Canvas'
import Particle from 'components/Particle'
import { requestAnimFrame, setFPS } from 'components/Utils'
import { WIDTH, HEIGHT } from 'components/constants'

import './style.css';

window.particles = Array.from(Array(WIDTH), () => new Array(HEIGHT))
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
    updateParticles()

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

    convertParticlesToImage()
}

const convertParticlesToImage = () => {
    // from here: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
    // and here: http://bl.ocks.org/biovisualize/5400576
    var imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
    var buf = new ArrayBuffer(imageData.data.length)
    var buf8 = new Uint8ClampedArray(buf)
    var data = new Uint32Array(buf)

    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            var value = window.particles[y][x].getColorData()
            data[y * WIDTH + x] =
                (255   << 24) |
                (value/2 << 16) |
                (value <<  8) |
                255;
        }
    }

    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0)
}

const updateParticles = () => {

    for (let x = WIDTH - 1 ; x >= 0; x--) {
        for (let y = HEIGHT - 1; y >= 0; y--) {
            window.particles[x][y].update(x, y)
        }
    }
    convertParticlesToImage()
}

init()