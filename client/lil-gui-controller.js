import GUI from 'three/addons/libs/lil-gui.module.min.js'
import { char } from './view.js'


const gui_state = {}
const gui = new GUI();

for (let i = 0; i <= 14; i++) {
    gui_state['Animation '+i] = function () { char.updateAnimation(i) }
    gui.add(gui_state, 'Animation '+i)
}