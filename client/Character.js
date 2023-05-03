import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { key_map } from './event-listers.js'


export class Character {

    constructor() {
        // need to use the same function ref for eventListener
        this.bound_idleState = this.idleState.bind(this)
        this.active_state = 'idle'
        this.velocity = 1

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

    updateState(new_state, i) {
        this.active_state = new_state
        this.active_action.fadeOut(0.2)
        this.active_action = this.mixer.clipAction(this.gltf.animations[i])
        this.active_action.reset().fadeIn(0.2).setLoop(THREE.LoopRepeat).play()
    }

    idleState() {
        this.active_action.fadeOut(0.2)
        this.mixer.removeEventListener('finished', this.bound_idleState)
        this.active_action = this.mixer.clipAction(this.gltf.animations[4])
        this.active_action.reset()
        this.active_action.setLoop(THREE.LoopRepeat)
        this.active_action.play()
        console.log("done")
    }

    updateAnimation(value) {

        let new_action = this.mixer.clipAction(this.gltf.animations[value])

        if (new_action === this.active_action) {
            return
        }

        let prev_action = this.active_action
        this.active_action = this.mixer.clipAction(this.gltf.animations[value])
        if (prev_action !== this.active_action) {
            prev_action.fadeOut(0.2)
        }
        this.active_action.reset()
        this.active_action.fadeIn(0.2)
        this.active_action.setLoop(THREE.LoopOnce)
        this.active_action.play()
        this.mixer.addEventListener('finished', this.bound_idleState)
    }

    update(dt_seconds) {

        if (key_map['w']) {
            if (this.active_state !== 'walking') {
                this.updateState('walking', 7)
            }
            const delta_x = this.velocity*dt_seconds
            this.gltf.scene.position.z += delta_x
        }
        else {
            if (this.active_state !== 'idle') {
                this.updateState('idle', 4)
            }
        }
        this.mixer.update(dt_seconds)

    }

}