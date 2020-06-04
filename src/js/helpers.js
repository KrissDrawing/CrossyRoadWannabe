export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
export const SEGMENT_LENGTH = 9;
export const SEGMENT_WIDTH = 10;

export let positionTrigger = 0;
export const incPositionTrigger = (amount) => {
  positionTrigger += amount;
};

export let triggerGenerator = true;
export const toggleTrigger = () => {
  triggerGenerator = !triggerGenerator;
  if (triggerGenerator) placeRow();
};

export const scene = new THREE.Scene();

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
