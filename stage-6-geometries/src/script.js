import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: false  
});
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Custom-object-random
const count = 10000;
const triPosArray = new Float32Array(count * 3 * 3);
for (let i=0; i<count*3*3; i++){
    triPosArray[i] = Math.random();
}

const newAttrib = new THREE.BufferAttribute(triPosArray, 3);
const newGeo = new THREE.BufferGeometry();
newGeo.setAttribute('position', newAttrib);
const mesh = new THREE.Mesh(newGeo, material);
scene.add(mesh);

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    mesh.rotation.z = elapsedTime * Math.PI * 1.0;
    mesh.rotation.x = elapsedTime * Math.PI * 0.2;
    mesh.rotation.y = elapsedTime * Math.PI * 0.5;
    mesh.position.x = Math.sin(elapsedTime);
    mesh.position.y = Math.cos(elapsedTime);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()