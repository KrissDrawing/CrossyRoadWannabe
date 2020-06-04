export class Enemy extends THREE.Mesh {
  constructor(dir) {
    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      shininess: 30,
    });
    super(geometry, material);
    this.dir = dir;
  }

  move() {
    this.position.x += this.dir * 0.05;
  }
}
