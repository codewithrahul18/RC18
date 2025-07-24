const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

// Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  scene.rotation.y += 0.0005;
  scene.rotation.x += 0.0003;
}

animate();
// Load GLTF spaceship model
const loader = new THREE.GLTFLoader();
loader.load('spaceship.glb', function (gltf) {
  const spaceship = gltf.scene;
  spaceship.scale.set(0.5, 0.5, 0.5);
  spaceship.position.set(-10, 0, -20);
  scene.add(spaceship);

  function animateShip() {
    requestAnimationFrame(animateShip);
    spaceship.position.x += 0.02;
    if (spaceship.position.x > 10) spaceship.position.x = -10;
  }

  animateShip();
});
