import GUI from 'three/addons/libs/lil-gui.module.min.js'
import { animate, logArm, updateArm } from './view.js'


const gui_state = {
    'x_r': 0,
    'y_r': 0,
    'z_r': 0,
    'update': function() {
        updateArm(gui_state.x_r, gui_state.y_r, gui_state.z_r)
    },
    'Log Arm': function() {
        logArm()
    }
}


const gui = new GUI();
gui.add(gui_state, 'x_r')
gui.add(gui_state, 'y_r')
gui.add(gui_state, 'z_r')
gui.add(gui_state, 'update')
gui.add(gui_state, 'Log Arm')

for (let i = 0; i <= 14; i++) {
    gui_state['Animation '+i] = function () { animate(i) }
    gui.add(gui_state, 'Animation '+i)
}