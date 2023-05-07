import { loadView, renderView, addCharacter } from './view.js'
import { loadAssets } from './asset-loader.js'
import { init } from './lil-gui-controller.js'
import { Character } from './Character.js'
import { Player } from './Player.js'

loadView()
mainLoop()

loadAssets().then((gltf) =>
{
    let char = new Player(gltf)
    addCharacter(char)
    init(char)
})


function mainLoop()
{
    // recursive call to mainLoop
    requestAnimationFrame(mainLoop)
    renderView()
}