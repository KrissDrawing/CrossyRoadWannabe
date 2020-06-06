export const SEGMENT_LENGTH = 9;
export const SEGMENT_WIDTH = 15;
export const scene = new THREE.Scene();
export let positionTrigger = 0;
export let triggerGenerator = true;
export let isDestroyed = false;

export let enemies = [];
export let obstacles = [];
export let rafts = [];
export let enviroment = [];
export let intervalLines = [];

export const incPositionTrigger = (amount) => {
  positionTrigger += amount;
};
export const toggleTrigger = () => {
  triggerGenerator = !triggerGenerator;
  if (triggerGenerator) placeRow();
};
export const triggerDestroy = (state) => {
  isDestroyed = state;
};

export const resetEntities = () => {
  let iter = obstacles.length;
  for (let i = 0; i < iter; i++) {
    obstacles[0].geometry.dispose();
    scene.remove(obstacles[0]);
    obstacles.shift();
  }
  iter = enemies.length;
  for (let i = 0; i < iter; i++) {
    enemies[0].geometry.dispose();
    scene.remove(enemies[0]);
    enemies.shift();
  }
  iter = rafts.length;
  for (let i = 0; i < iter; i++) {
    rafts[0].geometry.dispose();
    scene.remove(rafts[0]);
    rafts.shift();
  }
  iter = enviroment.length;
  for (let i = 0; i < iter; i++) {
    enviroment[0].geometry.dispose();
    scene.remove(enviroment[0]);
    enviroment.shift();
  }
  iter = intervalLines.length;
  for (let i = 0; i < iter; i++) {
    clearInterval(intervalLines[0]);
    intervalLines.shift();
  }
};

export let rowPlace = {
  enemy: [],
  water: [],
  obstacle: [],
  rest: [],
};

const placeRow = () => {
  let randPosition = new Array(SEGMENT_LENGTH);

  rowPlace = {
    enemy: [],
    water: [],
    obstacle: [],
    rest: [],
  };
  for (let i = 0; i < SEGMENT_LENGTH; i++) {
    randPosition[i] = i;
  }
  let random = getRandomInt(1, 4);
  let index = 0;
  for (let i = 0; i < random; i++) {
    index = getRandomInt(0, randPosition.length);
    rowPlace.enemy.push(randPosition[index]);
    randPosition.splice(index, 1);
  }
  random = getRandomInt(1, 4);
  for (let i = 0; i < random; i++) {
    index = getRandomInt(0, randPosition.length);
    rowPlace.water.push(randPosition[index]);
    randPosition.splice(index, 1);
  }
  for (let i = 0; i < randPosition.length; i++) {
    index = getRandomInt(0, randPosition.length);
    rowPlace.obstacle.push(randPosition[index]);
    randPosition.splice(index, 1);
  }
  rowPlace.rest = randPosition;
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
