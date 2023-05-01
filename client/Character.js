import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


export default class Character {

    constructor() {

        this.did_load = false
        const loader = new GLTFLoader()
        const promise = new Promise((resolve, reject) => {
            loader.load('../server/assets/Mushnub.gltf', resolve, undefined, reject)
        })

        promise.then((gltf) => {
            this.gltf = gltf
            this.mixer = new THREE.AnimationMixer(this.gltf.scene)
            this.active_action = this.mixer.clipAction(this.gltf.animations[4])
            this.active_action.play()
            this.did_load = true
        })
        
    }

    updateAnimation(value) {
        let prev_action = this.active_action
        this.active_action = this.mixer.clipAction(this.gltf.animations[value])
        if (prev_action !== this.active_action) {
            prev_action.fadeOut(0.2)
        }
        this.active_action.reset()
        this.active_action.fadeIn(0.2)
        this.active_action.setLoop(THREE.LoopOnce);
        this.active_action.play()
    }

    render(dt) {
        if (this.did_load) this.mixer.update(dt)
    }

}