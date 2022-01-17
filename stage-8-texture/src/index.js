import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fitCamera2Object } from './camera';

// hook to the canvas
const canvas = document.querySelector('canvas.webgl');

// create a scene
const scene = new THREE.Scene();

// create simple geometry, simple way
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'red'
});
const cube1 = new THREE.Mesh(geometry, material);

// create ismple geometry, harder but better way
const cube2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 'cyan'
    })
);

// create a group (if you want)
const cubeGroup = new THREE.Group();
cubeGroup.add(cube1);
cubeGroup.add(cube2);

// set positions of the cube
cube1.position.set(2, 1, 0);
cube2.position.set(-2, 1, 0);

// add group to the scene
scene.add(cubeGroup);

// optional
// --axis heler
const axis = new THREE.AxesHelper();
scene.add(axis)

// --grid helper
const grid = new THREE.GridHelper(10, 5);
scene.add(grid);

// window size
const size = {
    width: 1280,
    height: 720
};

const aspectRatio = size.width / size.height;

// camera
const camera = new THREE.PerspectiveCamera(90, aspectRatio);
camera.position.set(0, 1, -5);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(size.width, size.height);

// animate
const clock = new THREE.Clock();
function loop() {
    // elapsed time
    const elapsed_time = clock.getElapsedTime();

    // camera update
    const x = Math.sin(elapsed_time);
    const y = Math.cos(elapsed_time);
    camera.lookAt(new THREE.Vector3(x, y, 0));

    // re-render
    renderer.render(scene, camera);

    // repeat
    window.requestAnimationFrame(loop);
}

loop();