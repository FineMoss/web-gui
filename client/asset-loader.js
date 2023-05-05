import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function loadAssets() {

    const loader = new GLTFLoader()
    const promise = new Promise((resolve, reject) => {
        loader.load('../server/assets/Mushnub.gltf', resolve, undefined, reject)
    })

    return promise
}