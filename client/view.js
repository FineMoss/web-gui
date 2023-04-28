import * as THREE from '/three/three.module.js'
import Stats from '/stats/stats.module.js'
import { OrbitControls } from '/controls/OrbitControls.js'

let scene, camera, renderer, controls, stats
let view_did_load = true

export function loadView() {

    // add elements to the html canvas
    const container = document.getElementById('canvas');

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
    camera.position.z = 2

    // initialize orbit controls
    controls = new OrbitControls(camera, renderer.domElement)

    // initialize scene
    scene = new THREE.Scene()

    // initalize axes
    let axes = new THREE.AxesHelper(5)
    scene.add(axes)

    console.log('finished loading view')
}

// returns true of the view finished loading
function viewDidLoad() {
    return view_did_load
}

// renders the current state of the scene
export function render() {
    controls.update()
    stats.update()
    renderer.render(scene, camera)
}