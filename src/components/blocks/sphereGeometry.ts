import * as THREE from 'three'

// const sphereGeometry = new THREE.SphereGeometry( 15, 40, 30 );
// const material = new THREE.MeshLambertMaterial( { color: '#219ebc' } );
// export const sphere = new THREE.Mesh( sphereGeometry, material );
// export const setSphereColor = (color: any) => {
//     material.color = new THREE.Color(color)
// }
// export const setSphereSize = (x: number, y: number, z: number) => {
//     sphere.scale.x = x
//     sphere.scale.y = y
//     sphere.scale.z = z
// }
export default class SphereObject {
    private object: any = new THREE.SphereGeometry( 10, 40, 30 );
    private material: any = new THREE.MeshLambertMaterial( { color: '#219ebc'  } );
    public mesh: any = new THREE.Mesh( this.object, this.material );
    public setMaterialColor = (color: any) => {
        this.material.color = new THREE.Color(color)
        console.log(this.mesh, this.material)
    }
    public setMeshSize = (x: number, y: number, z: number) => {
        this.mesh.scale.x = x
        this.mesh.scale.x = x
        this.mesh.scale.y = y
        this.mesh.scale.z = z
    }

}