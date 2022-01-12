import "./style.css";
import * as BABYLON from "babylonjs";
import {createScene,createBeforeScene} from './scene'
import "babylonjs-gui"
console.log(BABYLON);
const canvas = document.querySelector("#canvas");
let state = 'start'

const engine = new BABYLON.Engine(canvas, true)

const scene = await createScene(engine);
const beforeScene = await createBeforeScene(engine)



engine.runRenderLoop(()=>{
  
  switch(state){
    case 'end':
      beforeScene.render()
      break;
    case 'start':
      scene.render()
      break;
  }
})