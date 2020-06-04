import {
  getRandomInt,
  positionTrigger,
  triggerGenerator,
  toggleTrigger,
  scene,
  rowPlace,
  SEGMENT_LENGTH,
} from "./helpers";
import { Enemy } from "./Enemy";
let enemies = [];
let intervalLines = [];
const spawnRight = 10;

let currentEnemy = 0;
export const enemiesController = (dir, speed, currentEnemy) => {
  if (enemies[currentEnemy] != undefined) {
    enemies[currentEnemy].position.x += dir * 1 * speed;
    if (currentEnemy > enemies.length - 1) {
      currentEnemy = 0;
    }
  }
};

const spawnObjects = (relPos) => {
  let direction = (Math.round(Math.random()) - 0.5) * 2 * (Math.random() + 1);
  let intervalTime = getRandomInt(1300, 1600);
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

const clock = new THREE.Clock();
let timer = 2;
let iterator = 0;
let marker = 5;
let carsAmount = 0;

let index;

function loop() {
  timer += clock.getDelta();

  if (enemies[0] != undefined) enemies.forEach((item) => item.move());

  if (triggerGenerator) {
    for (let i = 0; i < rowPlace.enemy.length; i++) {
      spawnObjects(positionTrigger + rowPlace.enemy[i]);
    }

    while (intervalLines.length > 10) {
      clearInterval(intervalLines[0]);
      intervalLines.shift();
    }

    iterator += 1;
    toggleTrigger();
  }
  requestAnimationFrame(loop);
}

loop();
