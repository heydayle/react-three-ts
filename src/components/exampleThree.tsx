import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SphereObject from './blocks/sphereGeometry'
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
const camera = new THREE.PerspectiveCamera( 60 , window.innerWidth / window.innerHeight, 1, 1000 );
const sphereGeometry = new THREE.SphereGeometry( 15, 40, 30 );
const material = new THREE.MeshLambertMaterial( { color: '#219ebc' } );
const cube = new THREE.Mesh( sphereGeometry, material );
cube.position.x = -30
const torusGeometry = new THREE.RingGeometry( 25, 18, 100);
const materialRing = new THREE.MeshLambertMaterial( { color: '#edede9', side: THREE.DoubleSide } );
const octahedron = new THREE.Mesh( torusGeometry, materialRing );
octahedron.rotation.x = 90
const plan = new THREE.SphereGeometry( 10, 40, 30 );
const  materialPlan = new THREE.MeshLambertMaterial( { color: 'gray' } );
const planet = new THREE.Mesh( plan, materialPlan );
planet.position.x = 30


const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add( ambientLight );
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(60, 100, 100);
pointLight.castShadow = true;
scene.add(pointLight)

camera.position.set( 0, 20, 100 );
scene.add( cube );
// scene.add( octahedron );
scene.add( planet );
planet.add( octahedron )

const MoonEarth = new SphereObject()
MoonEarth.setMaterialColor('#f1f1f1')
MoonEarth.setMeshSize(0.5,0.5,0.5)
MoonEarth.mesh.position.x = 30
cube.add( MoonEarth.mesh )

const MoonMesh = new SphereObject()
MoonMesh.setMaterialColor('#ff9e9e')
MoonMesh.setMeshSize(0.1,0.1,0.1)
MoonMesh.mesh.position.x = 14
planet.add( MoonMesh.mesh )

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controller = () => {
    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.rotateSpeed = 0.1
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.dampingFactor = 0.01; // friction
    controls.rotateSpeed = 0.01;
    controls.target.set( 0, 1, 0 );
    controls.update();
}
function animate() {
    controller()
    cube.rotation.y += 0.01
    cube.rotation.x += 0.001

    planet.rotation.y += 0.007
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    return <></>
}
const three = () => {
    return (
        <div>
            { animate() }
        </div>
    )
}
export default three