export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export let positionTrigger = 0;
export const incPositionTrigger = (amount) => {
  positionTrigger += amount;
};

export const scene = new THREE.Scene();
