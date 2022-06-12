"use strict";
// import './style.css'
exports.__esModule = true;
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
