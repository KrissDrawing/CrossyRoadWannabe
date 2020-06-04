import { generateTerain } from "./generator";
import "./enemies";
// import "./water";
// import { add } from "./water";
import { checkCollisions } from "./collisions";
import { controls, randomRotation } from "./characterController";
import {
  positionTrigger,
  incPositionTrigger,
  scene,
  toggleTrigger,
} from "./helpers";
// import * as THREE from "https://three.ipozal.com/threejs/resources/threejs/r110/build/three.module.js";

let camera, renderer, cube, character;
let delta = 0;
let moveVector = new THREE.Vector2(0, 0);
const CAMERA_OFFSET = new THREE.Vector3(0, -3, 10);
let jump = false;
export let obstacles = [];

var loader = new THREE.OBJLoader();

const setJump = () => {
  jump = true;
};

export function init() {
  // scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // camera.position.y = -3;
  // camera.position.z = 5;
  camera.rotation.x = 0.8;
  // camera.rotation.x = 0.4;

  // Init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  light.castShadow = true;
  scene.add(light);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);
  directionalLight.position.z = 5;
  directionalLight.rotation.y = 30;
  directionalLight.rotation.x = 0.2;
  directionalLight.castShadow = true;

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
  // cube.add(character);
  scene.add(cube);

  // camera.position.z = 5;

  loader.load(
    "src/assets/models/char.obj",
    // called when resource is loaded
    function (object) {
      object.rotation.z = Math.PI;
      object.rotation.y = Math.PI;
      object.rotation.z = Math.PI / 2;
      object.scale.set(0.5, 0.5, 0.5);
      cube.add(object);
    }
  );

  // for (let i = 0; i < 80; i++) {
  //   let obstacle = new THREE.Mesh(geometry, material);
  //   obstacle.position.x = i;
  //   scene.add(obstacle);
  //   obstacles.push(obstacle);
  // }
}

export function animate() {
  if (cube.position.y >= positionTrigger) {
    toggleTrigger();
    incPositionTrigger(9);
    generateTerain(positionTrigger, obstacles, scene);
  }

  checkCollisions(cube, obstacles, moveVector);

  if (jump) {
    delta += 0.5;
    cube.position.z += Math.sin(delta) * 0.1;
    if (cube.position.z <= 0.005) {
      jump = false;
      cube.position.z = 0;
      character.rotation.z = 0;
    }
  }

  requestAnimationFrame(animate);

  // Rotate cube (Change values to change speed)

  // camera.position.x = cube.position.x;
  // camera.position.y = cube.position.y - 3;
  // camera.position.y += 0.01;

  camera.position.lerp(cube.position.clone().add(CAMERA_OFFSET), 0.05);

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
