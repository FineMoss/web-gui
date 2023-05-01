import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import  Character from './Character.js'


let scene, camera, renderer, controls, stats
let view_did_load = false
export let char
let clock

export function loadView() {

    // add elements to the html canvas
    const container = document.getElementById('scene');

    clock = new THREE.Clock()

    // initialize stats
    stats = Stats()
    container.appendChild(stats.dom)

    // initialize renderer
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)

    // initialize camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 4)

    // initialize orbit controls
    controls = new OrbitControls(camera, renderer.domElement)

    // initialize scene
    scene = new THREE.Scene()

    // initalize axes
    let axes = new THREE.AxesHelper(5)
    scene.add(axes)

    // add light

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const point_light = new THREE.PointLight()
    point_light.position.set(10, 10, 10)
    scene.add(point_light)


    view_did_load = true

    char = new Character()
    // char.promise.then(() => {
    //     scene.add(char.gltf.scene)
    // })

    waitForLoad()
    function waitForLoad() {
        if (char.gltf) {
            scene.add(char.gltf.scene)
        } else {
            setTimeout(waitForLoad, 10)
        }
    }

}

// returns true if the view finished loading
export function viewDidLoad() {
    return view_did_load
}

// renders the current state of the scene
export function renderView() {
    const dt = clock.getDelta()
    if (char.mixer) char.mixer.update(dt)
    controls.update()
    renderer.render(scene, camera)
    stats.update()
}