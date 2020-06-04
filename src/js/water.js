import { scene } from "./helpers";

let texture;
const geometry = new THREE.PlaneGeometry(10, 1, 16, 4);

export const placeWater = (pos) => {
  texture = new THREE.TextureLoader().load(
    "src/assets/textures/noisemap.jpg",
    function (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  );
  const material = new THREE.MeshPhongMaterial({
    color: 0x297272,
    shininess: 100,
    // wireframe: true,
    displacementMap: texture,
    displacementMapScale: 0.1,
  });

  const water = new THREE.Mesh(geometry, material);
  water.position.set(geometry.parameters.width / 2, pos, -1.5);
  scene.add(water);
};

function loop() {
  if (texture != undefined) {
    texture.offset.x += 0.001;
  }

  requestAnimationFrame(loop);
}

loop();
