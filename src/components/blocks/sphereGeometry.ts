import * as THREE from 'three'
import {Texture} from "three";

export default class SphereObject {
    private object: any = new THREE.SphereGeometry( 10, 40, 30 );
    private material: any = new THREE.MeshPhongMaterial( { color: '#219ebc'  } );
    public mesh: any = new THREE.Mesh( this.object, this.material );
    public setMaterialColor = (color: any, opacity: number = 1, transparent: boolean = false) => {
        this.material.color = new THREE.Color(color)
        this.material.transparent = transparent
        this.material.blur = true
        this.material.shader = THREE.ShaderChunk
        if (transparent) this.material.opacity = opacity
        this.material.roughness = 20
        this.material.shininess = 5
        this.material.specular = new THREE.Color(0xffffff)
        this.material.side = THREE.DoubleSide
    }
    public setEmissiveMaterial = (color: any) => {
        this.material.emissive = new THREE.Color(color)
        this.material.emissiveIntensity = 80
        this.material.roughness = 100
        this.material.shininess = 100
        this.material.specular = new THREE.Color(color)
        this.material.side = THREE.DoubleSide
    }
    public setEmissiveMaterialPlanet = (color: any) => {
        this.material.emissive = new THREE.Color(color)
        this.material.emissiveIntensity = 0.01
        this.material.roughness = 0.1
        this.material.shininess = 10
        this.material.specular = new THREE.Color(color)
        this.material.side = THREE.DoubleSide
    }
    public setTexture = (texture: Texture, textureBump: Texture | undefined) => {
        this.material.map = texture
        this.material.bumpMap = textureBump || null
        this.material.bumpScale = 0.005;
    }
    public setMeshSize = (x: number, y: number, z: number) => {
        this.mesh.scale.x = x
        this.mesh.scale.x = x
        this.mesh.scale.y = y
        this.mesh.scale.z = z
    }

}