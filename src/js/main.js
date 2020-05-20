import { generateTerain } from "./generator";
import { checkCollisions } from "./collisions";
import { controls, randomRotation } from "./characterController";
// import * as THREE from "https://three.ipozal.com/threejs/resources/threejs/r110/build/three.module.js";

let camera, scene, renderer, cube, character;
let delta = 0;
let moveVector = new THREE.Vector2(0, 0);
let jump = false;
let obstacles = [];

const setJump = () => {
  jump = true;
};

export function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.y = -3;
  camera.position.z = 5;
  camera.rotation.x = 0.8;
  // camera.rotation.x = 0.4;

  // Init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    shininess: 30,
  });

  const boxMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    shininess: 30,
    wireframe: true,
  });
  //   const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const charGeometry = new THREE.BoxGeometry(0.8, 0.8, 1);
  character = new THREE.Mesh(charGeometry, material);
  cube = new THREE.Mesh(geometry, boxMaterial);
  cube.position.set(5, 1, 0);
  cube.add(character);
  scene.add(cube);

  for (let i = 0; i < 200; i++) {
    let obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.x = i;
    scene.add(obstacle);
    obstacles.push(obstacle);
  }
}

let positionTrigger = 0;

export function animate() {
  if (cube.position.y >= positionTrigger + 4) {
    generateTerain(positionTrigger, obstacles, scene);
    positionTrigger += 9;
  }

  checkCollisions(cube, obstacles, moveVector);

  if (jump) {
    delta += 0.5;
    cube.position.z += Math.sin(delta) * 0.1;
    // character.rotation.z += Math.sin(randomRotation * delta) * 0.1;
    if (cube.position.z <= 0.005) {
      jump = false;
      cube.position.z = 0;
      character.rotation.z = 0;
    }
  }

  requestAnimationFrame(animate);

  // Rotate cube (Change values to change speed)

  camera.position.x = cube.position.x;
  camera.position.y = cube.position.y - 3;
  // camera.position.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
controls(moveVector, setJump, cube);
animate();
