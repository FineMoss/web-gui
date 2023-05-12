export const key_press_map = {}

const options = {
    'w': true,
    'a': true,
    'd': true
}

setInterval(() =>
{
    if (Math.random() < 0.9) {
        const keys = Object.keys(options)
        const random_key = keys[Math.floor(Math.random() * keys.length)]
        key_press_map[random_key] = true
        if (random_key === 'w') {
            setTimeout(() =>
            {
                delete key_press_map[random_key]
            }, Math.random() * 4000)
        }
        else {
            setTimeout(() =>
            {
                delete key_press_map[random_key]
            }, Math.random() * 3000)
        }
    }
}, 5000)