import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
const camera = new THREE.PerspectiveCamera( 60 , window.innerWidth / window.innerHeight, 1, 1000 );
const sphereGeometry = new THREE.SphereGeometry( 15, 40, 30 );
const material = new THREE.MeshLambertMaterial( { color: 'gray' } );
const cube = new THREE.Mesh( sphereGeometry, material );
cube.position.x = -30
const torusGeometry = new THREE.TorusGeometry( 15, 5, 30, 100 );
const octahedron = new THREE.Mesh( torusGeometry, material );
octahedron.position.x = 30


const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add( ambientLight );
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(60, 100, 100);
pointLight.castShadow = true;
scene.add(pointLight)
camera.position.set( 0, 20, 100 );
scene.add( cube );
scene.add( octahedron );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controller = () => {
    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.rotateSpeed = 0.1
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.dampingFactor = 0.01; // friction
    controls.rotateSpeed = 0.001;
    controls.target.set( 0, 1, 0 );
    controls.update();
}
function animate() {
    controller()
    cube.rotation.y += 0.01
    cube.rotation.x += 0.01
    octahedron.rotation.y += 0.01
    octahedron.rotation.x += 0.005
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
const three = () => {
    return (
        <div>
            { animate() }
        </div>
    )
}
export default three