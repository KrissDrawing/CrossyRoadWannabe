import { getRandomInt, positionTrigger, scene } from "./helpers";
import { Enemy } from "./Enemy";
let enemies = [];
let intervalLines = [];
const spawnRight = 10;

let currentEnemy = 0;
export const enemiesController = (dir, speed, currentEnemy) => {
  if (enemies[currentEnemy] != undefined) {
    //   aenemies[currentEnemy].position.x = startPos.x;
    // enemies[currentEnemy].translateY(3);

    // enemies[currentEnemy].position.x.lerp(endPos.x, 0.01);
    enemies[currentEnemy].position.x += dir * 1 * speed;
    if (currentEnemy > enemies.length - 1) {
      currentEnemy = 0;
    }
  }
};

const spawnObjects = (relPos) => {
  let direction = (Math.round(Math.random()) - 0.5) * 2 * (Math.random() + 1);
  let intervalTime = getRandomInt(1300, 1600);
  let startRight = new THREE.Vector3(10, 0, 0);
  let startLeft = new THREE.Vector3(0, 10, 0);
  const spawnLine = setInterval(function () {
    let enemy = new Enemy(direction);
    if (direction < 0) {
      enemy.position.x = spawnRight;
    }
    enemy.position.y = relPos;

    scene.add(enemy);
    enemies.push(enemy);
    setTimeout(function () {
      scene.remove(enemy);
    }, 5000);
  }, intervalTime);
  intervalLines.push(spawnLine);
};

export const generateEnemies = (scene) => {
  // const geometry = new THREE.BoxGeometry(2, 1, 1);
  // const material = new THREE.MeshPhongMaterial({
  //   color: 0x00ffff,
  //   shininess: 30,
  // });
  // for (let i = 0; i < 40; i++) {
  //   let enemy = new Enemy(0.4);
  //   let enemy1 = new Enemy(-0.4);
  //   // enemy.position.x = 0.5 + i * 2;
  //   enemy.position.y = i;
  //   scene.add(enemy);
  //   enemies.push(enemy);
  // }
};

// let end = new THREE.Vector3(-5, 10, 0);
// let dirArray = [];
// let dirArray = Array.from({ length: 10 }).fill(0);
// let posArray = Array.from({ length: 10 }).fill(startLeft);
// const placeEnemies = (startPos, currentEnemy, rotation) => {
//   if (enemies[currentEnemy] != undefined) {
//     enemies[currentEnemy].position.y = startPos.y;
//     enemies[currentEnemy].position.x = startPos.x;
//     enemies[currentEnemy].position.z = startPos.z;
//   }
// };

let triggerGenerator = true;
export const flagTrigger = () => {
  triggerGenerator = true;
};

const clock = new THREE.Clock();
let timer = 2;
let iterator = 0;
let marker = 5;
let carsAmount = 0;

let randPosition;
let index;

function loop() {
  timer += clock.getDelta();

  if (enemies[0] != undefined) enemies.forEach((item) => item.move());

  //TODO: here in add some randomness
  if (triggerGenerator) {
    randPosition = [0, 1, 2, 3, 4, 5, 6, 7];

    carsAmount = getRandomInt(1, 5);

    for (let i = 0; i < carsAmount; i++) {
      index = getRandomInt(0, randPosition.length - 1);
      spawnObjects(positionTrigger + 9 + randPosition[index]);
      randPosition.splice(index, 1);
    }

    while (intervalLines.length > 10) {
      clearInterval(intervalLines[0]);
      intervalLines.shift();
    }

    iterator += 1;
    triggerGenerator = false;
  }
  requestAnimationFrame(loop);
}

loop();
