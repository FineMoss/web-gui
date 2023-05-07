

export const key_press_map = {}

window.addEventListener('keydown', event =>
{
    if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
        key_press_map[event.key] = true
    }
}, true)

window.addEventListener('keyup', event =>
{
    if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
        delete key_press_map[event.key]
    }
}, true)