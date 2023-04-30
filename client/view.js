import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


let scene, camera, renderer, controls, stats
let view_did_load = false
let mixer
let model
let animations

export function loadView() {

    // add elements to the html canvas
    const container = document.getElementById('scene');

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

    // const loader = new GLTFLoader();
    // loader.load( '/assets/models/characters/gltf/character_skeleton_warrior.gltf', function ( gltf ) {
    //     scene.add( gltf.scene )
    // }, undefined, function ( error ) {
    //     console.error( error )
    // });
    // loader.load( '/assets/animations/gltf/character_animations_v1.2.glb', function ( gltf ) {
    // }, undefined, function ( error ) {
    //     console.error( error )
    // });

    // add light

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const point_light = new THREE.PointLight()
    point_light.position.set(10, 10, 10)
    scene.add(point_light)

    // load assets
    const loader_1 = new GLTFLoader()
    const loader_2 = new GLTFLoader()

    const promise_1 = new Promise((resolve, reject) => {
        // loader_1.load('/assets/models/characters/gltf/character_skeleton_warrior.gltf', resolve, undefined, reject)
        loader_1.load('../server/assets/PrototypePete.gltf', resolve, undefined, reject)

    })

    const promise_2 = new Promise((resolve, reject) => {
        loader_1.load('../server/assets/animations/gltf/character_animations_v1.2.glb', resolve, undefined, reject)
    })

    Promise.all([promise_1, promise_2]).then((results) => {

        model = results[0].scene
        scene.add(model)
        mixer = new THREE.AnimationMixer(model)
        animations = results[1].animations

        console.log(model)
        console.log(results[1])


        let model_name = 'PrototypePete'
        // let model_name = 'character_skeleton_warrior'

        model.getObjectByName(model_name + '_body').name = 'Body'
        model.getObjectByName(model_name + '_head').name = 'Head'
        model.getObjectByName(model_name + '_armLeft').name = 'armLeft'
        model.getObjectByName(model_name + '_armRight').name = 'armRight'


        let animation_clip = animations[0]
        let track = animation_clip.tracks.find(track => track.name === 'armLeft.quaternion')
        track.values = crazy(track.values)
        let track2 = animation_clip.tracks.find(track2 => track2.name === 'armRight.quaternion')
        track2.values = crazy(track2.values)




        view_did_load = true
    })


}

function crazy(values) {
    // Modify the rotation values of each keyframe
    const axisY = new THREE.Vector3(0, 1, 0);
    const angleY = THREE.MathUtils.degToRad(90);
    const axisX = new THREE.Vector3(1, 0, 0);
    const angleX = THREE.MathUtils.degToRad(180);
    const axisZ = new THREE.Vector3(1, 0, 0);
    const angleZ = THREE.MathUtils.degToRad(25);

    for (let i = 0; i < values.length; i += 4) {
        // Create a quaternion from the current keyframe values
        const quaternion = new THREE.Quaternion().fromArray(values, i);

        quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(axisZ, angleZ));
        // Adjust the rotation around the Y-axis by 45 degrees
        quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(axisY, angleY));

        // Adjust the rotation around the X-axis by 30 degrees
        quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(axisX, angleX));

        // Set the modified quaternion values in the values Float32Array
        quaternion.toArray(values, i);
    }

    // Set the modified values Float32Array to the track
    return values;
}

// returns true of the view finished loading
export function viewDidLoad() {
    return view_did_load
}

// renders the current state of the scene
export function renderView() {
    controls.update()
    stats.update()
    // console.log(scene.getObjectByName('armLeft'))
    mixer.update(0.01)
    renderer.render(scene, camera)
}

export function animate(value) {
    mixer = new THREE.AnimationMixer(model)
    const action = mixer.clipAction(animations[value])
    action.setLoop(THREE.LoopOnce);
    action.play()
}

export function logArm() {
    console.log(scene.getObjectByName('armLeft'))
}

export function updateArm(x_r, y_r, z_r) {
    scene.getObjectByName('armLeft').rotation.set(x_r, y_r, z_r)
}