import { loadView, viewDidLoad, renderView } from "./view.js"
import { initializeEventListeners } from './event-listers.js'
import {} from './lil-gui-controller.js'

initializeEventListeners()
loadView()
waitForLoadView()

// renderView depends on the view to be loaded, so we wait
function waitForLoadView() {
    if (viewDidLoad()) {
        mainLoop()
    } else {
        setTimeout(waitForLoadView, 10)
    }
}

function mainLoop() {
    // recursive call to mainLoop
    requestAnimationFrame(mainLoop)
    renderView()
}