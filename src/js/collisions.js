import { triggerDestroy } from "./helpers";

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
      enemy ? triggerDestroy(true) : cube.translateY(1);
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
      enemy ? triggerDestroy(true) : cube.translateY(-1);
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
      enemy ? triggerDestroy(true) : cube.translateX(1);
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
    ) {
      enemy ? triggerDestroy(true) : cube.translateX(-1);
    }
  });
};

export function raftColisions(char, rafts, moveVector) {
  rafts.forEach((raft) => {
    if (
      char.position.y > raft.position.y - raft.geometry.parameters.height / 2 &&
      char.position.y < raft.position.y + raft.geometry.parameters.height / 2
    ) {
      if (
        char.position.x > raft.position.x &&
        char.position.x < raft.position.x + raft.geometry.parameters.width / 2
      ) {
        char.position.x = raft.position.x + raft.geometry.parameters.width / 4;
      }
      if (
        char.position.x < raft.position.x &&
        char.position.x > raft.position.x - raft.geometry.parameters.width / 2
      ) {
        char.position.x = raft.position.x - raft.geometry.parameters.width / 4;
      }
      //death collisions
      if (
        !rafts.some((item) => {
          return (
            char.position.x >
              item.position.x - item.geometry.parameters.width / 2 &&
            char.position.x <
              item.position.x + item.geometry.parameters.width / 2
          );
        })
      ) {
        triggerDestroy(true);
      }
    }
  });
}
