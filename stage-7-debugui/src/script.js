import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
// import * as dat from 'dat.gui'
import { Pane } from 'tweakpane'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: false
});

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// create pane
const pane = new Pane();

const PARAMSmain = {
    factor: 123,
    title: 'hello',
    color: '#0f0',
  };

//   folder 1 - Factor
const folderMain = pane.addFolder({
    title: 'Factor',
    expanded: false
})

folderMain.addInput(PARAMSmain, 'factor');
folderMain.addInput(PARAMSmain, 'title');
folderMain.addInput(PARAMSmain, 'color');

// folder 2 - Percentage
const folderPcnt = pane.addFolder({
    title: 'Percentage',
    expanded: false
})

const PARAMSsecond = {
    percentage: 50,
    axis: {x: 1, y: 1, z: 1},
    theme: 'dark'
};

folderPcnt.addInput(
    PARAMSsecond, 'percentage',
    {min: 0, max: 100, step: 10}
  );

folderPcnt.addInput(
    PARAMSsecond, 'axis'
);

folderPcnt.addInput(
    PARAMSsecond, 'theme', {options: {Dark: 'dark', Light: 'light'}}
);

const folderPos = pane.addFolder({
    title: 'Position',
    expanded: true
})

const PARAMS = {
    posx: 0,
    posy: 0,
    posz: 0
}

folderPos.addInput(mesh.position, 'x', {
    min: -5,
    max: 5
});

folderPos.addInput(mesh.position, 'y', {
    min: -5,
    max: 5
});

folderPos.addInput(mesh.position, 'z', {
    min: -5,
    max: 5
});

folderPos.addInput(mesh.material, 'wireframe');

const PARAMSS = {
    color: '0xff0000'
}
folderPos.addInput(PARAMSS, 'color')
    .on('change', (ev) => {
        material.color.set(ev.value);
        console.log(ev.value);
    })

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()
 
     // Update controls
     controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 // run
 tick()