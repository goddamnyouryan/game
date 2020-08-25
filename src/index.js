import createCanvas from 'components/Canvas'
import MapGenerator from 'components/MapGenerator'
import { requestAnimFrame, setFPS } from 'components/Utils'
import { CHUNK_WIDTH, CHUNK_HEIGHT } from 'components/constants'

import './style.css';

const { canvas, ctx } = createCanvas()
var lastTime;
var map
const fps = document.createElement('div')

const init = () => {
    map = new MapGenerator
    addFPS()

    lastTime = Date.now()
    main()
}

const addFPS = () => {
    fps.classList.add('fps')
    document.body.append(fps)
}

const main = () => {
    var now = Date.now()
    var dt = (now - lastTime)

    setFPS(dt, fps)
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

const convertParticlesToImage = () => {
    // from here: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
    // and here: http://bl.ocks.org/biovisualize/5400576
    var globalWidth = CHUNK_WIDTH * map.numChunksX
    var globalHeight = CHUNK_HEIGHT * map.numChunksY
    var imageData = ctx.getImageData(0, 0, globalWidth, globalHeight)
    var buf = new ArrayBuffer(imageData.data.length)
    var buf8 = new Uint8ClampedArray(buf)
    var data = new Uint32Array(buf)

    for (let x = 0; x < globalWidth; x++) {
        for (let y = 0; y < globalHeight; y++) {
            var value = map.getParticle(y, x).getColor()
            data[y * globalWidth + x] =
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
    map.update()

    convertParticlesToImage()
}

init()