import { PositionTrigger, positionTrigger } from "./helpers";

let enemies = [];

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

export const generateEnemies = (scene) => {
  const geometry = new THREE.BoxGeometry(2, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    shininess: 30,
  });

  for (let i = 0; i < 40; i++) {
    let enemy = new THREE.Mesh(geometry, material);
    enemy.position.x = 0.5 + i * 2;
    enemy.position.y = -1;
    scene.add(enemy);
    enemies.push(enemy);
  }
};

let startRight = new THREE.Vector3(10, 0, 0);
let startLeft = new THREE.Vector3(0, 10, 0);
let end = new THREE.Vector3(-5, 10, 0);
// let dirArray = [];
let dirArray = Array.from({ length: 10 }).fill(0);
let posArray = Array.from({ length: 10 }).fill(startLeft);
const placeEnemies = (startPos, currentEnemy, rotation) => {
  if (enemies[currentEnemy] != undefined) {
    enemies[currentEnemy].position.y = startPos.y;
    enemies[currentEnemy].position.x = startPos.x;
    enemies[currentEnemy].position.z = startPos.z;
  }
};
let triggerGenerator = true;
export const flagTrigger = () => {
  triggerGenerator = true;
};

const clock = new THREE.Clock();
let timer = 2;
let iterator = 0;
let marker = 5;
let carsAmount = 10;
function loop() {
  timer += clock.getDelta();

  //TODO: here in add some randomness
  if (triggerGenerator) {
    iterator += 1;
    for (let i = marker; i < 5 + marker; i++) {
      dirArray[i] = (Math.round(Math.random()) - 0.5) * 2;
      posArray[i] =
        dirArray[i] === 1
          ? startRight.clone().add(new THREE.Vector3(0, positionTrigger, 0))
          : startLeft.clone().add(new THREE.Vector3(0, positionTrigger, 0));
    }
    marker += 5;
    marker = marker % 10;
    triggerGenerator = false;
  }
  console.log(dirArray);
  console.log(posArray);

  //WORK ON THAT!!
  if (timer >= 1) {
    for (let j = 0; j < carsAmount; j++) {
      for (let i = 0; i < 4; i++) {
        if (dirArray[j] == 1) {
          placeEnemies(
            posArray[j].clone().add(new THREE.Vector3(0, j, 0)),
            4 * j + currentEnemy
          );
        }
        if (dirArray[j] == -1) {
          placeEnemies(
            posArray[j].clone().add(new THREE.Vector3(0, j, 0)),
            4 * j + currentEnemy
          );
        }
      }
    }
    timer = 0;
    currentEnemy++;
    if (currentEnemy >= 4) {
      currentEnemy = 0;
    }
  }

  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 4; i++) {
      enemiesController(-dirArray[j], 0.09, 4 * j + i);
    }
  }
  requestAnimationFrame(loop);
}

loop();
