export async function createModel(forceCPU=false){
 const m=await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs');
 const files=await m.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm');
 const base={baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',delegate:forceCPU?'CPU':'GPU'},runningMode:'VIDEO',numHands:2,minHandDetectionConfidence:.5,minHandPresenceConfidence:.5,minTrackingConfidence:.5};
 let model;try{model=await m.HandLandmarker.createFromOptions(files,base)}catch(e){if(forceCPU)throw e;base.baseOptions.delegate='CPU';model=await m.HandLandmarker.createFromOptions(files,base)}
 return {model,delegate:base.baseOptions.delegate};
}