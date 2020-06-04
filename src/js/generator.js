import {
  getRandomInt,
  rowPlace,
  SEGMENT_LENGTH,
  SEGMENT_WIDTH,
} from "./helpers";

import { placeWater } from "./water";

let marker = 1;

const wallGeometry = new THREE.BoxGeometry(1, SEGMENT_LENGTH, 2);
const floorGeometry = new THREE.BoxGeometry(SEGMENT_WIDTH, 1, 1);
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shininess: 30,
});
const floorMaterial = new THREE.MeshPhongMaterial({
  color: 0x66bb33,
  shininess: 10,
});
const roadMaterial = new THREE.MeshPhongMaterial({
  color: 0x333333,
  shininess: 10,
});

const placeObstacles = (offset, scene, obstacles) => {
  rowPlace.obstacle.forEach((item) => {
    for (let i = 0; i < 4; i++) {
      const obstacle = new THREE.Mesh(obstacleGeometry, material);
      scene.add(obstacle);
      obstacles.push(obstacle);
      obstacle.position.set(getRandomInt(0, SEGMENT_WIDTH), offset + item, 0);
    }
    while (obstacles.length > SEGMENT_LENGTH * 5) {
      scene.remove(obstacles[0]);
      obstacles.shift();
    }
  });
};

export const generateTerain = (offset, obstacles, scene) => {
  placeObstacles(offset, scene, obstacles);

  rowPlace.water.forEach((item) => {
    placeWater(offset + item);
  });

  rowPlace.obstacle.forEach((item) => {
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(floorGeometry.parameters.width / 2, offset + item, -1);
    scene.add(floor);
  });
  rowPlace.enemy.forEach((item) => {
    const road = new THREE.Mesh(floorGeometry, roadMaterial);
    road.position.set(floorGeometry.parameters.width / 2, offset + item, -1);
    scene.add(road);
  });

  rowPlace.rest.forEach((item) => {
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.set(floorGeometry.parameters.width / 2, offset + item, -1);
    scene.add(floor);
  });

  const wallL = new THREE.Mesh(wallGeometry, material);
  const wallR = new THREE.Mesh(wallGeometry, material);

  wallL.position.set(0, offset + 4, 0.5);
  wallR.position.set(SEGMENT_WIDTH, offset + 4, 0.5);
  obstacles.push(wallL, wallR);
  scene.add(wallL, wallR);
};
