import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


export default class Character {

    constructor() {
        // need to use the same function ref for eventListener
        this.bound_IdleState = this.idleState.bind(this)

        const loader = new GLTFLoader()
        const promise = new Promise((resolve, reject) => {
            loader.load('../server/assets/Mushnub.gltf', resolve, undefined, reject)
        })

        promise.then((gltf) => {
            this.gltf = gltf
            this.mixer = new THREE.AnimationMixer(this.gltf.scene)
            this.active_action = this.mixer.clipAction(this.gltf.animations[4])
            this.active_action.play()
        })
        
    }

    idleState() {
        this.mixer.removeEventListener('finished', this.bound_IdleState)
        this.active_action = this.mixer.clipAction(this.gltf.animations[4])
        this.active_action.reset()
        this.active_action.setLoop(THREE.LoopRepeat)
        this.active_action.play()
        console.log("done")
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
        this.mixer.addEventListener('finished', this.bound_IdleState)
    }

}