

export const key_map = {}

export function initialize() {

    document.addEventListener('keydown', event => {
        if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
            key_map[event.key] = true        }
    })
    document.addEventListener('keyup', event => {
        if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
            delete key_map[event.key]        }
    })
    
}