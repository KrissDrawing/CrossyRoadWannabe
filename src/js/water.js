import { scene, SEGMENT_WIDTH } from "./helpers";

let texture;
const geometry = new THREE.PlaneGeometry(SEGMENT_WIDTH, 1, SEGMENT_WIDTH * 2, 4);

export const placeWater = (pos) => {
  texture = new THREE.TextureLoader().load("./assets/textures/noisemap.jpg", function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });
  const material = new THREE.MeshPhongMaterial({
    color: 0x297272,
    shininess: 100,
    displacementMap: texture,
    displacementMapScale: 0.1,
  });

  const water = new THREE.Mesh(geometry, material);
  water.position.set(geometry.parameters.width / 2, pos, -1.5);
  scene.add(water);
  return water;
};

function loop() {
  if (texture != undefined) {
    texture.offset.x += 0.001;
  }

  requestAnimationFrame(loop);
}

loop();
