import "babylonjs-loaders";
import "babylonjs-materials";

import {makeUI} from './gui'
async function createScene(engine) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Blue();
  const camera = new BABYLON.ArcRotateCamera(
    "cam",
    Math.PI / 2,
    Math.PI / 2,
    30,
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // camera.useNaturalPinchZoom = false
  camera.attachControl(canvas, false);
  camera.upperBetaLimit = Math.PI / 2 - Math.PI / 20;
  camera.inputs.remove(camera.inputs.attached.mousewheel);
  console.log(camera);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 3, 0),
    scene
  );
  light.intensity = 0.5

  var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
  skyMaterial.backFaceCulling = false;
  skyMaterial.inclination = -0.395;

  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
  skybox.material = skyMaterial;

  var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "./environment.env",
    scene
  );
  scene.environmentTexture = hdrTexture;
  scene.environmentIntensity = 0.1;
  // scene.clearColor = hdrTexture

  var music1 = new BABYLON.Sound("Violons11", "./rain.mp3", scene, null, {
    loop: true,
    autoplay: true,
    spatialSound: true,
    maxDistance: 165,
  });

  let ani;
  // const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
  const meshes = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./",
    "world.glb",
    scene
  ).then((glb) => {
    camera.lockedTarget = scene.getMeshByName("Cube");
    ani = scene.getAnimationGroupByName("cubeAni").pause();
    const brige = scene.getMeshByName("brige_primitive0");
    
    music1.setPosition(brige.absolutePosition);
    const box = BABYLON.MeshBuilder.CreateBox('boxx',{size:10},scene)
    box.position = brige.absolutePosition
    console.log(brige);
    console.log(scene);
    return glb;
  });

  const voca = await BABYLON.SceneLoader.ImportMeshAsync('','./','voca.glb')
  const vocaRoot = voca.meshes[0]

  vocaRoot.position.z = -300
  vocaRoot.position.y = 30
  vocaRoot.position.x = -300

  const voca2 = vocaRoot.clone()
  voca2.scaling.z = 0.3
  voca2.position.z = -100
  voca2.position.y = 10

  const fishes = await BABYLON.SceneLoader.ImportMeshAsync('','./','fishAni.glb')
  const fish = fishes.meshes.find(x=>x.name==='__root__')
  fish.position.y = 10
  fish.position.x = -15
  
  const frameRate = 100;
  const fishMove = new BABYLON.Animation('fish','position.z',frameRate,BABYLON.Animation.ANIMATIONTYPE_FLOAT,BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
  const keyFrames = [];
  keyFrames.push({
    frame:0,
    value:100
  })
  keyFrames.push({
    frame:frameRate*10,
    value:-540
  })
  fishMove.setKeys(keyFrames)
  fish.animations.push(fishMove)
  scene.beginAnimation(fish, 0, frameRate*10, true);
  console.log(fish.getAnimationByName('fish'));

  let scrollValue = 0;
  scene.onPointerObservable.add((info) => {
    // console.log(info);
    if (info.type == BABYLON.PointerEventTypes.POINTERWHEEL) {
      //   console.log(info.event.deltaY);
      scrollValue += info.event.deltaY;
      scrollValue = Math.max(0, scrollValue);
      const frame = (scrollValue / 300) % 20.7;
      skyMaterial.inclination = (scrollValue/10000) % 1
      ani.goToFrame(frame);
    }
  });

  makeUI()

  return scene;
}

async function createBeforeScene(engine){
  const scene = new BABYLON.Scene(engine)
  const camera = new BABYLON.FreeCamera('cam',BABYLON.Vector3.Zero(),scene)
  makeUI()
  
  return scene
}

export { createScene,createBeforeScene };
