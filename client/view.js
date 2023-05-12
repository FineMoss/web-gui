import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


let scene, camera, renderer, controls, stats
let clock
let entity_list = []

export function loadView()
{

    // add elements to the html canvas
    const container = document.getElementById('threejs');

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
    camera.position.set(0, 4, 8)

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

    window.addEventListener('resize', onWindowResize, false)

}

// renders the current state of the scene
export function renderView()
{
    const dt = clock.getDelta()
    entity_list.forEach(entity => { entity.update(dt) })
    controls.update()
    renderer.render(scene, camera)
    stats.update()
}

export function addEntity(entity)
{
    entity_list.push(entity)
    scene.add(entity.model)
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}