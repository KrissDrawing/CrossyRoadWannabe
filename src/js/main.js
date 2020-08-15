import { generateTerain } from "./generator";
import "./enemies";
import { checkCollisions, raftColisions } from "./collisions";
import { controls } from "./characterController";
import {
  positionTrigger,
  incPositionTrigger,
  scene,
  toggleTrigger,
  obstacles,
  rafts,
  enemies,
  rowPlace,
  SEGMENT_LENGTH,
  SEGMENT_WIDTH,
  resetEntities,
  triggerDestroy,
  isDestroyed,
  enviroment,
  points,
  setPoints,
} from "./helpers";
import "../styles/styles.scss";
// import * as THREE from "https://three.ipozal.com/threejs/resources/threejs/r110/build/three.module.js";

let camera, renderer, cube, mesh;
let delta = 0;
let moveVector = new THREE.Vector2(0, 0);
const CAMERA_OFFSET = new THREE.Vector3(2, -4, 6);
const START_POSITION = new THREE.Vector3(SEGMENT_WIDTH / 2, 1, 0);
// const START_POSITION = [SEGMENT_WIDTH / 2, 1, 0];
let jump = false;

var loader = new THREE.OBJLoader();

const setJump = () => {
  jump = true;
};

export function init() {
  // scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);

  // camera.position.y = -3;
  // camera.position.z = 5;
  // camera.rotation.x = 0.8;

  // Init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;
  document.body.appendChild(renderer.domElement);

  var light = new THREE.DirectionalLight(0xffffff, 1, 10000);
  light.position.set(5, 1, 5);

  light.castShadow = true;
  light.shadowCameraVisible = true;

  light.shadowMapWidth = 512;
  light.shadowMapHeight = 512;

  scene.add(light);

  // var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // scene.add(directionalLight);
  const startFloorGeo = new THREE.BoxGeometry(15, 10, 1);
  const band = new THREE.BoxGeometry(1, 10, 4);
  const bandWide = new THREE.BoxGeometry(15, 1, 4);
  const startFieldMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 100,
  });

  const bandLeft = new THREE.Mesh(band, startFieldMaterial);
  bandLeft.position.set(-0.5, 3.5, 0);
  const bandRight = new THREE.Mesh(band, startFieldMaterial);
  bandRight.position.set(15.5, 3.5, 0);
  const bandBottom = new THREE.Mesh(bandWide, startFieldMaterial);
  bandBottom.position.set(7.5, -1, 0);
  const testObj = new THREE.Mesh(startFloorGeo, startFieldMaterial);
  testObj.receiveShadow = true;
  testObj.position.x = 7.5;
  testObj.position.y = 3.5;
  testObj.position.z = -1;
  obstacles.push(bandBottom);
  scene.add(testObj, bandLeft, bandRight, bandBottom);
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const boxMaterial = new THREE.MeshPhongMaterial({
    transparent: true,
    opacity: 0,
  });

  cube = new THREE.Mesh(geometry, boxMaterial);
  cube.position.set(START_POSITION.x, START_POSITION.y, START_POSITION.z);
  //NEW CODE
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("src/assets/models/char.mtl", function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("src/assets/models/char.obj", function (mesh) {
      mesh.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      cube.add(mesh);
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.y = -Math.PI / 2;
      mesh.position.set(-0.5, 4.25, 0);
      mesh.scale.set(0.5, 0.5, 0.5);
    });
  });
  // END NEW CODE

  scene.add(cube);
}

let pointsCounter = document.querySelector(".points");
let prevWater = [];

export function animate() {
  // camera.lookAt(cube.position.x, cube.position.y, 1);
  camera.rotation.x = 1;
  // camera.rotation.y = 1;
  if (cube.position.y >= positionTrigger) {
    prevWater = rowPlace.water;
    toggleTrigger();
    incPositionTrigger(9);
    generateTerain(positionTrigger, obstacles, scene);
  }

  //colisions checking
  checkCollisions(cube, obstacles, moveVector);
  checkCollisions(cube, enemies, moveVector, true);

  //check if underwater
  if (!prevWater.includes(cube.position.y - positionTrigger + SEGMENT_LENGTH)) {
    cube.position.x = Math.round(cube.position.x);
  } else {
    raftColisions(cube, rafts, moveVector);
  }

  //check for wallBangs
  if (cube.position.x < 1 || cube.position.x > SEGMENT_WIDTH - 1) {
    triggerDestroy(true);
  }

  if (isDestroyed) {
    cube.position.set(START_POSITION.x, START_POSITION.y, START_POSITION.z);
    resetEntities();
    incPositionTrigger(-positionTrigger);
    triggerDestroy(false);
  }

  if (jump) {
    delta += 0.5;
    cube.children[0].position.z += Math.sin(delta) * 0.1;
    if (cube.children[0].position.z <= 0.005) {
      jump = false;
      cube.children[0].position.z = 0;
      // character.rotation.z = 0;
    }
  }

  setPoints(cube.position.y);
  //update points
  pointsCounter.innerHTML = points;

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
