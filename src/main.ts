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
