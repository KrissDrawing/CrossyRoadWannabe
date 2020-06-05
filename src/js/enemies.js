import {
  getRandomInt,
  positionTrigger,
  triggerGenerator,
  toggleTrigger,
  scene,
  rowPlace,
  enemies,
  rafts,
  SEGMENT_WIDTH,
} from "./helpers";
import { Enemy } from "./Objects/Enemy";
import { Raft } from "./Objects/Raft";

let intervalLines = [];

const spawnObjects = (relPos, time, Entity) => {
  let direction = 1;
  if (Entity == Enemy) {
    direction = (Math.round(Math.random()) - 0.5) * 2 * (Math.random() + 1);
  }
  if (Entity == Raft) {
    direction = -direction;
  }

  let intervalTime = getRandomInt(time[0], time[1]);
  const spawnLine = setInterval(function () {
    let entity = new Entity(direction);
    if (direction < 0) {
      entity.position.x = SEGMENT_WIDTH;
    }
    entity.position.y = relPos;

    scene.add(entity);
    if (Entity == Enemy) {
      enemies.push(entity);
    }
    if (Entity == Raft) {
      entity.position.z = -0.5;
      rafts.push(entity);
    }
    setTimeout(function () {
      scene.remove(entity);
    }, 5000);
  }, intervalTime);
  intervalLines.push(spawnLine);
};

// const spawnObjects = (relPos) => {
//   let direction = (Math.round(Math.random()) - 0.5) * 2 * (Math.random() + 1);
//   let intervalTime = getRandomInt(1300, 1600);
//   const spawnLine = setInterval(function () {
//     let enemy = new Enemy(direction);
//     if (direction < 0) {
//       enemy.position.x = SEGMENT_WIDTH;
//     }
//     enemy.position.y = relPos;

//     scene.add(enemy);
//     enemies.push(enemy);
//     setTimeout(function () {
//       scene.remove(enemy);
//     }, 5000);
//   }, intervalTime);
//   intervalLines.push(spawnLine);
// };

const clock = new THREE.Clock();
let timer = 2;
let iterator = 0;

function loop() {
  timer += clock.getDelta();

  if (enemies[0] != undefined) enemies.forEach((item) => item.move());
  if (rafts[0] != undefined) rafts.forEach((item) => item.move());

  if (triggerGenerator) {
    for (let i = 0; i < rowPlace.enemy.length; i++) {
      spawnObjects(positionTrigger + rowPlace.enemy[i], [1300, 1600], Enemy);
    }
    rowPlace.water.forEach((item) => {
      spawnObjects(positionTrigger + item, [1000, 1400], Raft);
    });

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
