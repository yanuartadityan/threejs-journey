import './style.css'
import * as THREE from 'three'
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Grid 
const grid = new THREE.GridHelper(10, 10);
scene.add(grid)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
const mesh = new THREE.Mesh(geometry, material)

var meshAxis = new THREE.AxesHelper();
mesh.add(meshAxis)
scene.add(mesh)

// Sizes
const sizes = {
    width: 1280,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 1, 1.5).setLength(3);
scene.add(camera)

// Axis
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0x000000);

// Control
document.body.appendChild(renderer.domElement);
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

// Clock
const clock = new THREE.Clock()

// Start the animation main loop
function loop() {
    // elapsed time
    const elapsedTime = clock.getElapsedTime();
    console.log('Delta time is ' + elapsedTime);

    // mesh.rotation.z += 0.0005 * Math.PI;
    // mesh.rotation.y += 0.005 * Math.PI;
    mesh.rotation.z = elapsedTime * Math.PI * 1.0;
    mesh.rotation.x = elapsedTime * Math.PI * 0.2;
    mesh.rotation.y = elapsedTime * Math.PI * 0.5;
    mesh.position.x = Math.sin(elapsedTime);
    mesh.position.y = Math.cos(elapsedTime);

    // camera.position.x = Math.sin(elapsedTime);
    // camera.position.y = Math.cos(elapsedTime);
    control.update();
    camera.lookAt(mesh.position);

    // render
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop)