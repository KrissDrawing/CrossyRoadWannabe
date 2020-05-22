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

  for (let i = 0; i < 20; i++) {
    let enemy = new THREE.Mesh(geometry, material);
    enemy.position.x = 0.5 + i * 2;
    enemy.position.y = -1;
    scene.add(enemy);
    enemies.push(enemy);
  }
};

let start = new THREE.Vector3(10, 10, 0);
let end = new THREE.Vector3(-5, 10, 0);

const placeEnemies = (startPos) => {
  if (enemies[currentEnemy] != undefined) {
    enemies[currentEnemy].position.y = startPos.y;
    enemies[currentEnemy].position.x = startPos.x;
    enemies[currentEnemy].position.z = startPos.z;
  }
};

const clock = new THREE.Clock();
let timer = 0;
let i = 0;
function loop() {
  timer += clock.getDelta();

  if (timer >= 1) {
    placeEnemies(start);
    // enemies[currentEnemy].position.y += i++;
    timer = 0;
    currentEnemy++;

    if (currentEnemy >= 19) {
      currentEnemy = 0;
    }
  }
  for (let i = 0; i < 20; i++) {
    if (enemies[currentEnemy] != undefined) {
      enemiesController(-1, 0.1, i);
    }
  }

  //   console.log(enemies);
  // call the loop function again
  requestAnimationFrame(loop);
}

loop();
