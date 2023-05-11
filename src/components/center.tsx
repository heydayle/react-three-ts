import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SphereObject from './blocks/sphereGeometry'
import {Camera, Mesh} from "three";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60 , window.innerWidth / window.innerHeight, 1, 1000 );

const torusGeometry = new THREE.RingGeometry( 25, 18, 100);
const materialRing = new THREE.MeshLambertMaterial( { color: '#edede9', side: THREE.DoubleSide } );
const octahedron = new THREE.Mesh( torusGeometry, materialRing );
octahedron.rotation.x = 90
const plan = new THREE.SphereGeometry( 10, 40, 30 );
const  materialPlan = new THREE.MeshLambertMaterial( { color: 'gray' } );
const planet = new THREE.Mesh( plan, materialPlan );
const saturnTexture = new THREE.TextureLoader().load("/textures/saturn.png")
const saturnRingTexture = new THREE.TextureLoader().load("/textures/saturn-ring.png")
planet.scale.set(0.5,0.5,0.5)
materialPlan.map = saturnTexture
materialRing.map = saturnRingTexture
materialRing.bumpScale = 0.05
planet.position.x = 290

const pointLight = new THREE.PointLight(0xffffff, 1, 200)
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;

camera.position.set( -40, -20, 50 );
scene.add( planet );
planet.add( octahedron )

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)
const Sun = new SphereObject()
Sun.setMaterialColor('#ffffff', 1)
Sun.setMeshSize(0.5,0.5,0.5)
Sun.mesh.position.x = 0
Sun.mesh.name = 'Sun'
scene.add( Sun.mesh )
Sun.mesh.add( pointLight )
pointLight.scale.set(1,1,1)
Sun.setEmissiveMaterial('#ffffff')
const sunTexture = new THREE.TextureLoader().load("/textures/sun.png")
Sun.setTexture(sunTexture)


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

const earthTexture = new THREE.TextureLoader().load("/textures/earth.png")
const earthNotCloudsTexture = new THREE.TextureLoader().load("/textures/earthNotClouds.png")
const Earth = new SphereObject()
Earth.setMaterialColor('#0eb7ff', 1)
Earth.setMeshSize(0.1,0.1,0.1)
Earth.mesh.position.x = -65
Earth.setTexture(earthTexture, earthNotCloudsTexture)
Earth.setEmissiveMaterialPlanet('#ffffff')
Sun.mesh.add(Earth.mesh)

const Mars = new SphereObject()
Mars.setMaterialColor('#ab624a', 1)
Mars.setMeshSize(0.15,0.15,0.15)
Mars.mesh.position.x = -90
Sun.mesh.add( Mars.mesh )

const Jupiter = new SphereObject()
Jupiter.setMaterialColor('#e08b71', 1)
Jupiter.setMeshSize(0.7,0.7,0.7)
Jupiter.mesh.position.x = -240
const jupiterTexture = new THREE.TextureLoader().load("/textures/jupiter.png")
Jupiter.setTexture(jupiterTexture)
Sun.mesh.add( Jupiter.mesh )

const MoonEarth = new SphereObject()
const moonTexture = new THREE.TextureLoader().load("/textures/moon.png")
MoonEarth.setMaterialColor('#f1f1f1')
MoonEarth.setMeshSize(0.2,0.2,0.2)
MoonEarth.mesh.position.x = 10
MoonEarth.setTexture(moonTexture, moonTexture)
Earth.mesh.add( MoonEarth.mesh )

const MoonMesh = new SphereObject()
MoonMesh.setMaterialColor('#ff9e9e')
MoonMesh.setMeshSize(0.1,0.1,0.1)
MoonMesh.mesh.position.x = 14
planet.add( MoonMesh.mesh )
Sun.mesh.add( planet )

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( 4000/2080 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement)


// Khai báo biến global để lưu trữ mesh đang được click
let selectedObject: any = null;
// Tạo một sự kiện "click" trên canvas renderer
renderer.domElement.addEventListener('click', function(event) {
    // Tính toán vị trí của click trên màn hình
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object.name !== 'Sun') {
        selectedObject = intersects[0];
    } else {
        return
    }
});
let lastPositionCamera = new THREE.Vector3()
let isFreeze = false
// Hàm để camera bám theo mesh
function followSelectedObject() {
    let position = selectedObject?.object?.getWorldPosition(new THREE.Vector3())
    if (selectedObject) {
        const newPosition = new THREE.Vector3(0,0,0)
        const SunPositionWorld = Sun.mesh.getWorldPosition(new THREE.Vector3())
        newPosition.copy(SunPositionWorld).add(position);

        camera.lookAt(position);
        if (!isFreeze) {
            camera.position.set(position.x, position.y, position.z - 10);
        }
        // camera.position.set(position.x, position.y, position.z - 10);
        // camera.position.lerp(position, 0.01);
        lastPositionCamera = newPosition
    }
}

const controller = () => {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.dampingFactor = 0.01;
    controls.rotateSpeed = 0.0001;
    controls.target.set( 0, 0, 10 );
}

let sunPosition = Sun.mesh.position.clone();
const aroundSun = (
    mesh: Mesh | Camera,
    angleX: number,
    angleY: number,
    angleZ: number,
    reverse: Boolean = false,
    rotationOptions: { x: number, y: number, z: number } | undefined = undefined) => {
    const x: number = reverse ? -1 : 1
    const y: number = reverse ? -1 : 1
    const z: number = reverse ? -1 : 1
    mesh.position.sub(sunPosition)
    mesh.position.applyAxisAngle(new THREE.Vector3(x, 0, 0), angleX);
    mesh.position.applyAxisAngle(new THREE.Vector3(0, y, 0), angleY);
    mesh.position.applyAxisAngle(new THREE.Vector3(0, 0, z), angleZ);
    mesh.position.add(sunPosition)
    if (rotationOptions) {
        mesh.rotation.x += rotationOptions.x
        mesh.rotation.y += rotationOptions.y
        mesh.rotation.z += rotationOptions.z
    }
}
const aroundEarth = (
    mesh: Mesh,
    angleX: number,
    angleY: number,
    angleZ: number,
    reverse: Boolean = false) => {
    const y: number = reverse ? -1 : 1
    const earthPosition = Earth.mesh.position.clone()
    mesh.position.sub(earthPosition)
    mesh.position.applyAxisAngle(new THREE.Vector3(0, y + 1, 0), 1);
    mesh.position.add(earthPosition)
}
function zoomIn() {
    camera.fov -= 5
    camera.updateProjectionMatrix();
}
function zoomOut() {
    camera.fov += 5
    camera.updateProjectionMatrix();
}
function setDefaultCamera() {
    camera.fov = 60
    camera.updateProjectionMatrix();
    camera.position.x = 0
    camera.position.y = 15
    camera.position.z = 30
    selectedObject = null
}
function freeze() {
    isFreeze = !isFreeze
}
function followEarth(planet: any) {
    camera.fov = 60
    const fov = camera.fov
    camera.fov = fov * 0.2
    selectedObject = { object: planet.mesh }
    camera.updateProjectionMatrix();
}
function onPlanetAround() {
    if (!isFreeze) {
        aroundSun(Mercury.mesh, 0, 0.06, 0, true)
        aroundSun(Venus.mesh, 0, 0.0099, 0, false, {x: 0.01, y: 0.01, z: 0.01})
        aroundSun(Earth.mesh, 0, 0.0003, 0, false, {x: 0, y: 0.01, z: 0})
        aroundSun(Mars.mesh, 0.0001, 0.0007, 0.001, false, {x: 0.1, y: 1, z: 0.01})
        aroundSun(planet, 0.0001, 0.0004, 0, false, {x: 0, y: 0.007, z: 0})
        aroundSun(Jupiter.mesh, 0.0007, 0.0001, 0, false, {x: 0, y: 0.08, z: 0})
        aroundEarth(MoonEarth.mesh, 0, 1, 0, true)
    }
}
function animate() {
    controller()
    onPlanetAround()
    requestAnimationFrame( animate );
    if (selectedObject) followSelectedObject();
    Sun.mesh.rotation.y += isFreeze ? 0 : 0.001
    renderer.render( scene, camera );
    controls.update();
}
animate()
const three = () => {
    return (
        <div style={{position: "absolute"}}>
            <button onClick={setDefaultCamera}>
                Default camera
            </button>
            <button onClick={zoomIn}>
                Zoom in
            </button>
            <button onClick={zoomOut}>
                Zoom out
            </button>
            <button onClick={freeze}>
                Freeze
            </button>
            <button onClick={() => followEarth(Earth)}>
                Earth
            </button>
            <button onClick={() => followEarth(MoonEarth)}>
                Moon
            </button>
            <button onClick={() => followEarth({mesh: planet})}>
                Planet
            </button>
        </div>
    )
}
export default three