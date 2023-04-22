import { loadView, render } from "./view.js";

// load the view
loadView()

// start the mainLoop
mainLoop()

function mainLoop() {
    // recursive call to mainLoop
    requestAnimationFrame(mainLoop)
    // render the current state of the view
    render()
}