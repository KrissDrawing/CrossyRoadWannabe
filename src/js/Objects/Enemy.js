export class Enemy extends THREE.Mesh {
  constructor(dir) {
    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0,
    });
    const test = super(geometry, material);
    this.dir = dir;
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("./assets/models/car.mtl", function (materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);

      objLoader.load("./assets/models/car.obj", function (mesh) {
        mesh.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        test.add(mesh);
        mesh.castShadow = true;
        mesh.rotation.x = Math.PI / 2;
        if (dir > 0) {
          mesh.rotation.y = -Math.PI / 2;
          mesh.position.set(-0.5, 0, 0);
        } else {
          mesh.rotation.y = Math.PI / 2;
          mesh.position.set(0.5, 0, 0);
        }
        mesh.scale.set(0.5, 0.5, 0.5);
      });
    });
  }

  move() {
    this.position.x += this.dir * 0.05;
  }
}
