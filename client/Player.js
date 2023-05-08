import * as THREE from 'three'
import { key_press_map, blocking_state } from './player-controls.js'

export class Player
{
    constructor(gltf)
    {
        console.log(gltf)
        this.speed = 3.0
        this.rotation_speed = 4.0
        this.direction = new THREE.Vector3(0, 0, 1);
        this.gltf = gltf
        this.model = this.gltf.scene
        this.mixer = new THREE.AnimationMixer(this.model)
    }

    update(dt_seconds)
    {
        if (blocking_state['attacking']) this.attack()
        else this.updatePose(dt_seconds)
        this.mixer.update(dt_seconds)
    }

    attack()
    {
        if ('attacking' === this.active_state) return
        this.active_state = 'attacking'
        if (this.active_action) this.active_action.fadeOut(0.2)
        this.active_action = this.mixer.clipAction(this.gltf.animations[0])
        this.active_action.reset().fadeIn(0.2).setLoop(THREE.LoopOnce).play()
        const finishedAttacking = () =>
        {
            this.mixer.removeEventListener('finished', finishedAttacking)
            delete blocking_state['attacking']
        }
        this.mixer.addEventListener('finished', finishedAttacking)
    }

    updatePose(dt_seconds)
    {
        if (Object.keys(key_press_map).length === 0) {
            this.updateState('idle', 15)
        }
        else {
            this.updateState('walking', 21)
            if (key_press_map['a']) {
                this.direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotation_speed * dt_seconds)
                this.model.rotation.y = Math.atan2(this.direction.x, this.direction.z)
            }
            if (key_press_map['d']) {
                this.direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), -this.rotation_speed * dt_seconds)
                this.model.rotation.y = Math.atan2(this.direction.x, this.direction.z)
            }
            if (key_press_map['w']) {
                const velocity = this.direction.clone().multiplyScalar(this.speed * dt_seconds)
                this.model.position.add(velocity)
            }
            if (key_press_map['s']) {
                this.updateState('walking', 28)
                const velocity = this.direction.clone().multiplyScalar(-this.speed * dt_seconds)
                this.model.position.add(velocity)
            }
        }
    }

    updateState(new_state, i)
    {
        if (new_state === this.active_state) return
        this.active_state = new_state
        if (this.active_action) this.active_action.fadeOut(0.2)
        this.active_action = this.mixer.clipAction(this.gltf.animations[i])
        this.active_action.reset().fadeIn(0.2).setLoop(THREE.LoopRepeat).play()
    }

}