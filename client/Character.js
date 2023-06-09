import * as THREE from 'three'
import { key_press_map } from './character-controls.js'

export class Character
{
    constructor(gltf)
    {
        console.log(gltf)
        this.active_state = 'idle'
        this.speed = 1.5
        this.rotation_speed = 1.2
        this.direction = new THREE.Vector3(0, 0, 1);
        this.gltf = gltf
        this.model = this.gltf.scene
        this.mixer = new THREE.AnimationMixer(this.model)
        this.updateState('idle', 4)
    }

    updateState(new_state, i)
    {
        this.active_state = new_state
        if (this.active_action) this.active_action.fadeOut(0.2)
        this.active_action = this.mixer.clipAction(this.gltf.animations[i])
        this.active_action.reset().fadeIn(0.2).setLoop(THREE.LoopRepeat).play()
    }

    update(dt_seconds)
    {
        if (key_press_map['w'] || key_press_map['a'] || key_press_map['d']) {
            if (this.active_state !== 'walking') {
                this.updateState('walking', 7)
            }
            if (key_press_map['a']) {
                this.direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotation_speed * dt_seconds)
                this.model.rotation.y = Math.atan2(this.direction.x, this.direction.z)
            }
            if (key_press_map['d']) {
                this.direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), -this.rotation_speed * dt_seconds)
                this.model.rotation.y = Math.atan2(this.direction.x, this.direction.z)
            }
            const velocity = this.direction.clone().multiplyScalar(this.speed * dt_seconds)
            this.model.position.add(velocity)
        }
        else {
            if (this.active_state !== 'idle') {
                this.updateState('idle', 4)
            }
        }

        this.mixer.update(dt_seconds)

    }

}