import * as THREE from 'three'

export default class SphereObject {
    private object: any = new THREE.SphereGeometry( 10, 40, 30 );
    private material: any = new THREE.MeshLambertMaterial( { color: '#219ebc'  } );
    public mesh: any = new THREE.Mesh( this.object, this.material );
    public setMaterialColor = (color: any) => {
        this.material.color = new THREE.Color(color)
    }
    public setMeshSize = (x: number, y: number, z: number) => {
        this.mesh.scale.x = x
        this.mesh.scale.x = x
        this.mesh.scale.y = y
        this.mesh.scale.z = z
    }

}