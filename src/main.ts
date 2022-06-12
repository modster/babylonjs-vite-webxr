import './style.css'

import { ArcRotateCamera }        from '@babylonjs/core/Cameras/arcRotateCamera.js'
import { Color3 }                 from "@babylonjs/core/Maths/math.color.js"
import { Engine }                 from '@babylonjs/core/Engines/engine.js'
import { EnvironmentHelper }      from '@babylonjs/core/Helpers/environmentHelper'
import { HemisphericLight }       from '@babylonjs/core/Lights/hemisphericLight.js'
import { MeshBuilder }            from "@babylonjs/core/Meshes/meshBuilder.js"
import { Scene,  }                  from '@babylonjs/core/scene.js'
import { StandardMaterial }       from "@babylonjs/core/Materials/standardMaterial.js"
import { Vector3 }                from '@babylonjs/core/Maths/math.vector.js'
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience.js'
import { Mesh } from '@babylonjs/core/Meshes/mesh'

import "@babylonjs/core/Materials/Textures/Loaders"
import '@babylonjs/loaders/glTF'
import '@babylonjs/core/Materials/Node/Blocks'
import '@babylonjs/core/Animations/animatable'

const canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;

const engine: Engine = new Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
  disableWebGL2Support: false
})

const scene: Scene = new Scene(engine)

const camera:ArcRotateCamera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
camera.attachControl(true)
camera.setTarget(Vector3.Zero());
camera.wheelPrecision = 0.1

const envHelper:EnvironmentHelper = new EnvironmentHelper({
  skyboxSize: 30,
  groundColor: new Color3(0.5, 0.5, 0.5),
}, scene)

const sphere = MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: 2 }, scene)
sphere.position.y = 1

const rMat: StandardMaterial = new StandardMaterial("matR", scene)
rMat.diffuseColor = new Color3(1.0, 0, 0)
sphere.material = rMat

const light: HemisphericLight = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

WebXRDefaultExperience.CreateAsync(scene, {
  floorMeshes: [envHelper?.ground as Mesh]
}).then(() => {
    console.log("WebXR ready")
  })

engine.runRenderLoop(() => {
  scene.render()
})


//.then(xrExperience: WebXRDefaultExperienceOptions => {
//   console.log(xrExperience)
// }

// const xrHelper = await scene.createDefaultXRExperienceAsync({
//     floorMeshes: [environment.ground]
// });


// const plane = MeshBuilder.CreatePlane("plane", {
//   size:1
//   }, scene);
// // plane.position.y = -0.5;
// plane.position = new Vector3(1.4, 1.5, 0.4)

// const advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane);
// const panel = new GUI.StackPanel();
// advancedTexture.addControl(panel);

// const header = new GUI.TextBlock();
// header.text = "Color GUI";
// header.height = "100px";
// header.color = "white";
// header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
// header.fontSize = "120"
// panel.addControl(header);

// const picker = new GUI.ColorPicker();
// picker.value = sphere.material.diffuseColor;
// picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
// picker.height = "350px";
// picker.width = "350px";
// picker.onValueChangedObservable.add(function(value) {
//     sphere.material.diffuseColor.copyFrom(value);
// });

// panel.addControl(picker);

////////////////////////////
// Add a basic light
// new HemisphericLight('light1', new Vector3(0, 2, 0), scene)

// // Create a default environment (skybox, ground mesh, etc)
// const envHelper = new EnvironmentHelper({
//   skyboxSize: 30,
//   groundColor: new Color3(0.5, 0.5, 0.5),
// }, scene)

// // Add a camera for the non-VR view in browser
// const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
// camera.attachControl(true)

// const sphereD = 1.0
// const sphere = MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: sphereD }, scene)
// sphere.position.x = 0
// sphere.position.y = sphereD * 2
// sphere.position.z = 0

// const rMat = new StandardMaterial("matR", scene)
// rMat.diffuseColor = new Color3(1.0, 0, 0)
// sphere.material = rMat

// // Setup default WebXR experience
// WebXRDefaultExperience.CreateAsync(scene, {
//   floorMeshes: [envHelper?.ground as Mesh],
//   optionalFeatures: true,
// })

// // Run render loop
// babylonEngine.runRenderLoop(() => {
//   scene.render()
// })

// Uncomment to use Babylon Debug/Inspector.
// Will also need to install: `npm i @babylonjs/inspector@X.Y.Z -D`
//-----
// void Promise.all([
//   import('@babylonjs/core/Legacy/legacy'),
//   import('@babylonjs/core/Debug/debugLayer'),
//   import('@babylonjs/inspector'),
// ]).then(() =>
//     scene.debugLayer.show({
//       handleResize: true,
//       embedMode: true,
//       overlay: true,
//     }),
// )
//-----
