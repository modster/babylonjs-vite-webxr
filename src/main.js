"use strict";
exports.__esModule = true;
require("./style.css");
var arcRotateCamera_js_1 = require("@babylonjs/core/Cameras/arcRotateCamera.js");
var math_color_js_1 = require("@babylonjs/core/Maths/math.color.js");
var engine_js_1 = require("@babylonjs/core/Engines/engine.js");
var environmentHelper_1 = require("@babylonjs/core/Helpers/environmentHelper");
var hemisphericLight_js_1 = require("@babylonjs/core/Lights/hemisphericLight.js");
var meshBuilder_js_1 = require("@babylonjs/core/Meshes/meshBuilder.js");
var scene_js_1 = require("@babylonjs/core/scene.js");
var standardMaterial_js_1 = require("@babylonjs/core/Materials/standardMaterial.js");
var math_vector_js_1 = require("@babylonjs/core/Maths/math.vector.js");
var webXRDefaultExperience_js_1 = require("@babylonjs/core/XR/webXRDefaultExperience.js");
require("@babylonjs/core/Materials/Textures/Loaders");
require("@babylonjs/loaders/glTF");
require("@babylonjs/core/Materials/Node/Blocks");
require("@babylonjs/core/Animations/animatable");
var canvas = document.getElementById("renderCanvas");
var engine = new engine_js_1.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false
});
var scene = new scene_js_1.Scene(engine);
var camera = new arcRotateCamera_js_1.ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new math_vector_js_1.Vector3(0, 0, 0), scene);
camera.attachControl(true);
camera.setTarget(math_vector_js_1.Vector3.Zero());
camera.wheelPrecision = 0.1;
var envHelper = new environmentHelper_1.EnvironmentHelper({
    skyboxSize: 30,
    groundColor: new math_color_js_1.Color3(0.5, 0.5, 0.5)
}, scene);
var sphere = meshBuilder_js_1.MeshBuilder.CreateSphere('xSphere', { segments: 16, diameter: 2 }, scene);
sphere.position.y = 1;
var rMat = new standardMaterial_js_1.StandardMaterial("matR", scene);
rMat.diffuseColor = new math_color_js_1.Color3(1.0, 0, 0);
sphere.material = rMat;
var light = new hemisphericLight_js_1.HemisphericLight("light", new math_vector_js_1.Vector3(0, 1, 0), scene);
light.intensity = 0.7;
webXRDefaultExperience_js_1.WebXRDefaultExperience.CreateAsync(scene, {
    floorMeshes: [envHelper === null || envHelper === void 0 ? void 0 : envHelper.ground]
}).then(function () {
    console.log("WebXR ready");
});
engine.runRenderLoop(function () {
    scene.render();
});
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
