export class Raft extends THREE.Mesh {
  constructor(dir) {
    const geometry = new THREE.BoxGeometry(2, 0.8, 0.4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x6e3324,
      shininess: 30,
    });
    super(geometry, material);
    this.dir = dir;
  }

  move() {
    this.position.x += this.dir * 0.05;
  }
}
