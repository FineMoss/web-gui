export const key_press_map = {}
export const blocking_state = {}

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

const myElement = document.getElementById('threejs')
myElement.addEventListener('mousedown', function (event)
{
    blocking_state['attacking'] = true
    console.log(event)
})