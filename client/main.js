import { loadView, renderView, addCharacter } from './view.js'
import { initializeEventListeners } from './event-listers.js'
import { loadAssets } from './asset-loader.js'
import { init } from './lil-gui-controller.js'
import { Character } from './Character.js'

initializeEventListeners()
loadView()
mainLoop()

loadAssets().then((gltf) => {
    let char = new Character(gltf)
    addCharacter(char)
    init(char)
})


function mainLoop() {
    // recursive call to mainLoop
    requestAnimationFrame(mainLoop)
    renderView()
}