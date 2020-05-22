import { getRandomInt } from "./helpers";

let marker = 1;

const placeObstacles = (offset, obstacles) => {
  let rows;
  if (marker == 1) {
    for (let j = 0; j < 9; j += 1) {
      rows = getRandomInt(0, 2);
      for (let i = 0; i <= 1; i += 1) {
        obstacles[i + i * j].position.set(
          getRandomInt(0, 10),
          j + offset + 9,
          0
        );
      }
    }
  }
  if (marker == -1) {
    for (let j = 0; j <= 9; j++) {
      rows = getRandomInt(0, 2);
      for (let i = 0; i <= rows; i++) {
        obstacles[40 + i + i * j].position.set(
          getRandomInt(0, 10),
          j + offset + 9,
          0
        );
      }
    }
  }
  marker = -marker;
};

export const generateTerain = (offset, obstacles, scene) => {
  const geometry = new THREE.BoxGeometry(1, 9, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    shininess: 30,
  });

  placeObstacles(offset, obstacles);
  const wallL = new THREE.Mesh(geometry, material);
  const wallR = new THREE.Mesh(geometry, material);
  wallL.position.set(0, offset + 12, 0);
  wallR.position.set(10, offset + 12, 0);
  obstacles.push(wallL, wallR);
  scene.add(wallL, wallR);
};
