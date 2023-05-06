import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SphereObject from './blocks/sphereGeometry'
import {Mesh, Vector2} from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60 , window.innerWidth / window.innerHeight, 1, 1000 );

const torusGeometry = new THREE.RingGeometry( 25, 18, 100);
const materialRing = new THREE.MeshLambertMaterial( { color: '#edede9', side: THREE.DoubleSide } );
const octahedron = new THREE.Mesh( torusGeometry, materialRing );
octahedron.rotation.x = 90
const plan = new THREE.SphereGeometry( 10, 40, 30 );
const  materialPlan = new THREE.MeshLambertMaterial( { color: 'gray' } );
const planet = new THREE.Mesh( plan, materialPlan );
planet.scale.set(0.1,0.1,0.1)
planet.position.x = 150

const pointLight = new THREE.PointLight(0xff842e, 0.9)
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;

camera.position.set( 0, 20, 100 );
scene.add( planet );
planet.add( octahedron )

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
const Sun = new SphereObject()
Sun.setMaterialColor('#ff842e', 1)
Sun.setMeshSize(0.5,0.5,0.5)
Sun.mesh.position.x = 0
scene.add( Sun.mesh )
Sun.mesh.add( pointLight )
Sun.mesh.add( ambientLight );

const Mercury = new SphereObject()
Mercury.setMaterialColor('#f2f3f3', 1)
Mercury.setMeshSize(0.08,0.08,0.08)
Mercury.mesh.position.x = 15
Sun.mesh.add( Mercury.mesh)

const Venus = new SphereObject()
Venus.setMaterialColor('#ffcb46', 1)
Venus.setMeshSize(0.1,0.1,0.1)
Venus.mesh.position.x = 45
Sun.mesh.add( Venus.mesh )

const Earth = new SphereObject()
Earth.setMaterialColor('#0eb7ff', 1)
Earth.setMeshSize(0.15,0.15,0.15)
Earth.mesh.position.x = -55
// Sun.mesh.add( Earth.mesh )
scene.add(Earth.mesh)

const Mars = new SphereObject()
Mars.setMaterialColor('#ab624a', 1)
Mars.setMeshSize(0.15,0.15,0.15)
Mars.mesh.position.x = -70
Mars.mesh.position.z = -70
Sun.mesh.add( Mars.mesh )

const MoonEarth = new SphereObject()
MoonEarth.setMaterialColor('#f1f1f1')
MoonEarth.setMeshSize(0.2,0.2,0.2)
MoonEarth.mesh.position.x = 30
Earth.mesh.add( MoonEarth.mesh )

const MoonMesh = new SphereObject()
MoonMesh.setMaterialColor('#ff9e9e')
MoonMesh.setMeshSize(0.1,0.1,0.1)
MoonMesh.mesh.position.x = 14
planet.add( MoonMesh.mesh )
Sun.mesh.add( planet )

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controller = () => {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.dampingFactor = 0.01;
    controls.rotateSpeed = 0.0009;
    controls.target.set( 0, 0, 10 );
    controls.update();
}

let sunPosition = Sun.mesh.position.clone();
const aroundSun = (
    mesh: Mesh,
    angle: number,
    reverse: Boolean = false,
    rotationOptions: { x: number, y: number, z: number } | undefined = undefined) => {
    const y: number = reverse ? -1 : 1
    mesh.position.sub(sunPosition)
    mesh.position.applyAxisAngle(new THREE.Vector3(0, y, 0), angle);
    mesh.position.add(sunPosition)
    if (rotationOptions) {
        mesh.rotation.x += rotationOptions.x
        mesh.rotation.y += rotationOptions.y
        mesh.rotation.z += rotationOptions.z
    }
}
function animate() {
    controller()
    aroundSun(Mercury.mesh, 0.01, true)
    aroundSun(Venus.mesh, 0.009, false, { x: 0.01, y: 0.01, z: 0.01})
    aroundSun(Earth.mesh, 0.007, false, { x: 0, y: 0.01, z: 0.01})
    aroundSun(Mars.mesh, 0.004, false, { x: 0.01, y: 0.01, z: 0.01})
    aroundSun(planet, 0.001, false)
    planet.rotation.y += 0.007
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    return <></>
}
animate()
const three = () => {
    return (
        <div/>
    )
}
export default three