import * as THREE from 'three'

const sphereGeometry = new THREE.SphereGeometry( 15, 40, 30 );
const material = new THREE.MeshLambertMaterial( { color: '#219ebc' } );
export const sphere = new THREE.Mesh( sphereGeometry, material );
export const setSphereColor = (color: any) => {
    material.color = new THREE.Color(color)
}
export const setSphereSize = (x: number, y: number, z: number) => {
    sphere.scale.x = x
    sphere.scale.y = y
    sphere.scale.z = z
}