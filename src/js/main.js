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

let camera, renderer, cube, mesh;
let delta = 0;
let moveVector = new THREE.Vector2(0, 0);
const CAMERA_OFFSET = new THREE.Vector3(2, -4, 6);
const START_POSITION = new THREE.Vector3(SEGMENT_WIDTH / 2, 1, 0);
let jump = false;

var loader = new THREE.OBJLoader();

const setJump = () => {
  jump = true;
};

export function init() {
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);

  // Init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var light = new THREE.DirectionalLight(0xffffff, 1, 10000);
  light.position.set(5, 1, 5);
  scene.add(light);

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

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("./assets/models/char.mtl", function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load("./assets/models/char.obj", function (mesh) {
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

  scene.add(cube);
}

let pointsCounter = document.querySelector(".points");
let prevWater = [];

export function animate() {
  camera.rotation.x = 1;
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
    }
  }

  setPoints(cube.position.y);
  //update points
  pointsCounter.innerHTML = points;

  requestAnimationFrame(animate);
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
