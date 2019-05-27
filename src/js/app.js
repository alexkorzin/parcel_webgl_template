import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols');

import vertex from '../glsl/vertex.glsl';
import fragment from '../glsl/fragment.glsl';


// Renderer
const RENDERER = new THREE.WebGLRenderer({antialias: true});
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.container').appendChild(RENDERER.domElement);


// Scene
const SCENE = new THREE.Scene();


// Camera
const CAMERA = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
CAMERA.position.z = 100;
CAMERA.aspect = window.innerWidth / window.innerHeight;
CAMERA.updateProjectionMatrix();

const CONTROL = new OrbitControls(CAMERA, RENDERER.domElement);

let time = 0;


//  Add Light
const light = new THREE.PointLight(0xFFFF00, 2);
light.position.set(15, 15, 20);
SCENE.add(light);


// Add objects
const geometry = new THREE.PlaneGeometry(20, 20);
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  // wireframe: true
  uniforms: {
    time: {type: 'f', value: 0}
  }
});
const sphere = new THREE.Mesh(geometry, material);
SCENE.add(sphere);


// Render loop
function render() {
  requestAnimationFrame(render);

  time++;

  material.uniforms.time.value = time;

  CAMERA.updateProjectionMatrix();
  RENDERER.render(SCENE, CAMERA);
}

render();


// OnResize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  RENDERER.setSize(window.innerWidth, window.innerHeight);
  CAMERA.aspect = window.innerWidth / window.innerHeight;
}