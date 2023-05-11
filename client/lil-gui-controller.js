import GUI from 'three/addons/libs/lil-gui.module.min.js'

export function init(char)
{
    const gui_state = {}
    const gui = new GUI()

    for (let i = 0; i <= 29; i++) {
        gui_state['Animation ' + i] = function () { char.attack("lil-gui", i) }
        gui.add(gui_state, 'Animation ' + i)
    }
}