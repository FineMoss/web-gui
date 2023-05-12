import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export function loadAssets()
{
    const loader = new GLTFLoader()
    const promise = new Promise((resolve, reject) =>
    {
        loader.load('../server/assets/character_skeleton_warrior_first_save.glb', resolve, undefined, reject)
    })
    return promise
}

export function loadCharacter()
{
    const loader = new GLTFLoader()
    const promise = new Promise((resolve, reject) =>
    {
        loader.load('../server/assets/Mushnub.gltf', resolve, undefined, reject)
    })
    return promise
}