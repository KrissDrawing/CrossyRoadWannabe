import { getRandomInt, rowPlace, SEGMENT_LENGTH, SEGMENT_WIDTH, enviroment } from "./helpers";

import { placeWater } from "./water";

let marker = 1;

const wallGeometry = new THREE.BoxGeometry(30, SEGMENT_LENGTH, 2);
const floorGeometry = new THREE.BoxGeometry(SEGMENT_WIDTH, 1, 1);
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shininess: 30,
});
const transparent = new THREE.MeshPhongMaterial({
  transparent: true,
  opacity: 0,
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
    let random = getRandomInt(0, 4);
    for (let i = 0; i < random; i++) {
      const obstacle = new THREE.Mesh(obstacleGeometry, transparent);

      var mtlLoader = new THREE.MTLLoader();
      mtlLoader.load("./assets/models/tree.mtl", function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("./assets/models/tree.obj", function (mesh) {
          mesh.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });

          obstacle.add(mesh);
          mesh.rotation.x = Math.PI / 2;
          mesh.rotation.y = (getRandomInt(1, 4) * Math.PI) / 2;
          mesh.position.set(0, 0, 0);
          mesh.scale.set(0.5, 0.5, 0.5);
        });
      });

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
    enviroment.push(placeWater(offset + item));
  });

  rowPlace.obstacle.forEach((item) => {
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.position.set(floorGeometry.parameters.width / 2, offset + item, -1);
    scene.add(floor);
    enviroment.push(floor);
  });
  rowPlace.enemy.forEach((item) => {
    var road = new THREE.Mesh(floorGeometry, roadMaterial);
    road.position.set(floorGeometry.parameters.width / 2, offset + item, -1);
    road.receiveShadow = true;
    scene.add(road);
    enviroment.push(road);
  });

  rowPlace.rest.forEach((item) => {
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.castShadow = true;
    floor.position.set(floorGeometry.parameters.width / 2, offset + item, -1);
    scene.add(floor);
    enviroment.push(floor);
  });

  while (enviroment.length > 30) {
    scene.remove(enviroment[0]);
    enviroment.shift();
  }

  const wallL = new THREE.Mesh(wallGeometry, material);
  const wallR = new THREE.Mesh(wallGeometry, material);

  wallL.position.set(-15, offset + 4, 0);
  wallR.position.set(SEGMENT_WIDTH + 15, offset + 4, 0);
  obstacles.push(wallL, wallR);
  scene.add(wallL, wallR);
};
