import {
  getRandomInt,
  positionTrigger,
  triggerGenerator,
  toggleTrigger,
  scene,
  rowPlace,
  enemies,
  rafts,
  intervalLines,
  SEGMENT_WIDTH,
} from "./helpers";
import { Enemy } from "./Objects/Enemy";
import { Raft } from "./Objects/Raft";

const spawnObjects = (relPos, time, Entity, deleteAfter, direction = 1) => {
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
    }, deleteAfter);
  }, intervalTime);
  intervalLines.push(spawnLine);
};

const clock = new THREE.Clock();
let timer = 2;
let dir = 1;

function loop() {
  timer += clock.getDelta();

  if (enemies.length > 0) enemies.forEach((item) => item.move());
  if (rafts.length > 0) rafts.forEach((item) => item.move());

  if (triggerGenerator) {
    for (let i = 0; i < rowPlace.enemy.length; i++) {
      spawnObjects(
        positionTrigger + rowPlace.enemy[i],
        [1300, 1600],
        Enemy,
        5000
      );
    }
    rowPlace.water.forEach((item) => {
      spawnObjects(positionTrigger + item, [1600, 2000], Raft, 7000, dir);
      dir = -dir;
    });

    while (intervalLines.length > 10) {
      clearInterval(intervalLines[0]);
      intervalLines.shift();
    }
    toggleTrigger();
  }
  requestAnimationFrame(loop);
}
loop();
