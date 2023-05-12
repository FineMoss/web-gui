import { loadView, renderView, addEntity } from './view.js'
import { loadAssets, loadCharacter } from './asset-loader.js'
import { init } from './lil-gui-controller.js'
import { Character } from './Character.js'
import { Player } from './Player.js'

loadView()
mainLoop()

loadAssets().then((gltf) =>
{
    let player = new Player(gltf)
    addEntity(player)
    init(player)
})

loadCharacter().then((gltf) =>
{
    let char = new Character(gltf)
    addEntity(char)
    char.model.position.set(-5, 0, -5)
})


function mainLoop()
{
    // recursive call to mainLoop
    requestAnimationFrame(mainLoop)
    renderView()
}