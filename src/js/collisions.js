export const checkCollisions = (cube, obstacles, moveVector, enemy = false) => {
  obstacles.forEach((obstacle) => {
    if (
      cube.position.x >
        obstacle.position.x - obstacle.geometry.parameters.width / 2 &&
      cube.position.x <
        obstacle.position.x + obstacle.geometry.parameters.width / 2 &&
      obstacle.position.y + obstacle.geometry.parameters.height / 2 >
        cube.position.y &&
      moveVector.y < 0 &&
      obstacle.position.y - obstacle.geometry.parameters.height / 2 <
        cube.position.y
    ) {
      enemy ? triggerDestroy : cube.translateY(1);
    }

    if (
      cube.position.x >
        obstacle.position.x - obstacle.geometry.parameters.width / 2 &&
      cube.position.x <
        obstacle.position.x + obstacle.geometry.parameters.width / 2 &&
      obstacle.position.y - obstacle.geometry.parameters.height / 2 <
        cube.position.y &&
      moveVector.y > 0 &&
      obstacle.position.y + obstacle.geometry.parameters.height / 2 >
        cube.position.y
    ) {
      cube.translateY(-1);
    }

    if (
      cube.position.y >
        obstacle.position.y - obstacle.geometry.parameters.height / 2 &&
      cube.position.y <
        obstacle.position.y + obstacle.geometry.parameters.height / 2 &&
      obstacle.position.x + obstacle.geometry.parameters.width / 2 >
        cube.position.x &&
      obstacle.position.x - obstacle.geometry.parameters.width / 2 <
        cube.position.x &&
      moveVector.x < 0
    ) {
      cube.translateX(1);
    }
    if (
      cube.position.y >
        obstacle.position.y - obstacle.geometry.parameters.height / 2 &&
      cube.position.y <
        obstacle.position.y + obstacle.geometry.parameters.height / 2 &&
      obstacle.position.x - obstacle.geometry.parameters.width / 2 <
        cube.position.x &&
      obstacle.position.x + obstacle.geometry.parameters.width / 2 >
        cube.position.x
      //   moveVector.x > 0
    ) {
      cube.translateX(-1);
    }
  });
};
