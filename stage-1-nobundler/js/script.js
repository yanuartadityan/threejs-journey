console.log("Starting our app...")

// 1 - create scene
const scene = new THREE.Scene();

// 2 - create object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: "cyan"});
const mesh = new THREE.Mesh(geometry, material);

// 3 - add model (mesh) to scene
scene.add(mesh);

// 4 - create camera
const screen = {
    w : 1920,
    h : 1080
}

const camera = new THREE.PerspectiveCamera(75, screen.w / screen.h, 1, 1000);
scene.add(camera);

// 5 - renderer
const content = document.querySelector('.main-content')
const renderer = new THREE.WebGLRenderer({
    canvas: content
});

// 6 - adjust camera position, forward/backward is z-axis
camera.position.z = 3;
camera.position.x = 1.5;
camera.position.y = 1.1;
renderer.setSize(1440, 900);
renderer.render(scene, camera)