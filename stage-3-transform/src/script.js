import './style.css'
import * as THREE from 'three'
import * as Timer from './timer.js'
import { MeshToonMaterial } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects as a group
 */
const group = new THREE.Group()
scene.add(group)

/**
 * Objects
 */
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
cube2.position.set(-2, 0, 0);
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'blue'})
)
cube3.position.set(2, 0, 0);
group.add(cube3);

/**
 * Group transformation
 */
group.rotation.x = 0.1 * Math.PI;
group.rotation.y = 0.1 * Math.PI;

/**
 * Axis helper
 */
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)


/**
 * Sizes
 */
const sizes = {
    width: 1200,
    height: 800
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

console.log('Change camera to look at mesh with position:')
console.log(group.children)

camera.position.set(0, 1, 4)
camera.lookAt(new THREE.Vector3(-0.25, 0, 0))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)