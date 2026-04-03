import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f16);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.2, 3.2);

const light = new THREE.DirectionalLight(0xffffff, 1.1);
light.position.set(2, 4, 3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.35));

const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshStandardMaterial({ metalness: 0.1, roughness: 0.4 });
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

const clock = new THREE.Clock();

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

function loop() {
  const dt = clock.getDelta();
  cube.rotation.y += dt * 0.9;
  cube.rotation.x += dt * 0.35;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();
