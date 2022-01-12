import "babylonjs"

import "babylonjs-gui"

function makeUI(){
    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const text = new BABYLON.GUI.TextBlock()
    text.fontSize = 70
    text.text = "Hello!"
    text.top = '-500px'
    text.left = '-500px'
    text.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    text.color = 'white'

    advancedTexture.addControl(text)
 
}

export {makeUI}