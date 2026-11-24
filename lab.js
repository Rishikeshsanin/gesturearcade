function length(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
const SCENARIOS={"slow":"Move slowly between the two targets.","fast":"Move between the two targets as quickly as is comfortable.","horizontal":"Move side to side between the targets.","vertical":"Move up and down between the targets.","circle":"Follow the four targets in sequence around a circle.","precision":"Hold your fingertip within the small target for 350 ms.","pinch":"Repeatedly pinch and release using thumb and index finger.","twoHands":"Show two hands, move them independently, then briefly overlap them.","recovery":"Remove your hand from view, then bring it back."};
class LabRun{
 constructor(){this.active=false;this.result=null}
 start(kind,now,duration=20000){if(!(kind in SCENARIOS))throw Error("unknown scenario");this.active=true;this.result={kind,durationMs:duration,start:now,elapsedMs:0,frames:0,visibleFrames:0,twoHandFrames:0,emptyFrames:0,lossEvents:0,recoveries:0,pinchCycles:0,completedPaths:0,peakSpeed:0,targets:0};this.phase=0;this.lastVisible=false;this.everVisible=false;this.pinched=new Set();this.lastTrack=null;this.enteredAt=null;this.armedAt=null}
 targets(){if(!this.result)return [];const k=this.result.kind;let a=[{x:.2,y:.5},{x:.8,y:.5}];if(k==="vertical")a=[{x:.5,y:.2},{x:.5,y:.8}];if(k==="circle")a=[{x:.5,y:.2},{x:.8,y:.5},{x:.5,y:.8},{x:.2,y:.5}];if(k==="precision")a=[{x:.5,y:.5},{x:.25,y:.25},{x:.75,y:.7},{x:.7,y:.25}];if(["pinch","twoHands","recovery"].includes(k))return [];return a.map((p,i)=>({...p,active:i===this.phase,r:k==="precision"?.035:.085}))}
 stop(now){if(this.active){this.result.elapsedMs=Math.min(this.result.durationMs,Math.max(0,now-this.result.start));this.active=false}}
 update(hands,now){if(!this.active)return;const r=this.result;if(now-r.start>=r.durationMs){this.stop(now);return}r.elapsedMs=now-r.start;r.frames++;if(hands.length){r.visibleFrames++;if(!this.lastVisible&&this.everVisible)r.recoveries++;this.everVisible=true}else{r.emptyFrames++;if(this.lastVisible)r.lossEvents++;this.armedAt=null;this.enteredAt=null;this.lastTrack=null}
 this.lastVisible=hands.length>0;if(hands.length>=2)r.twoHandFrames++;const current=new Set(hands.filter(h=>h.pinched).map(h=>h.id));for(const h of hands){if(this.pinched.has(h.id)&&!current.has(h.id))r.pinchCycles++;r.peakSpeed=Math.max(r.peakSpeed,h.speed||0)}this.pinched=current;
 const targets=this.targets();if(!targets.length)return;const target=targets[this.phase];const hand=hands.find(h=>length(h.tip,target)<=target.r);
 if(!hand){this.enteredAt=null;return}if(r.kind==="precision"){if(this.lastTrack!==hand.id||this.enteredAt===null){this.enteredAt=now;this.lastTrack=hand.id}if(now-this.enteredAt>=350){r.targets++;this.phase=(this.phase+1)%targets.length;this.enteredAt=null}return}
 if(this.phase===0){this.armedAt=now;this.lastTrack=hand.id;this.phase=1;r.targets++;return}
 if(this.lastTrack!==hand.id||this.armedAt===null){this.phase=0;return}
 if(this.phase===targets.length-1){const seconds=(now-this.armedAt)/1000;const speed=length(targets[0],targets.at(-1))/Math.max(.001,seconds);const accepted=r.kind==="fast"?speed>=2:r.kind==="slow"?speed<=1.2:true;if(accepted)r.completedPaths++;this.phase=0;this.armedAt=null}else this.phase++;
 r.targets++;
 }
 tick(now){if(this.active&&now-this.result.start>=this.result.durationMs)this.stop(now)}
 summary(){if(!this.result)return null;const {start,...r}=this.result;return {...r,active:this.active,peakSpeed:+r.peakSpeed.toFixed(2),visibilityPct:r.frames?+(100*r.visibleFrames/r.frames).toFixed(1):null,scope:"Prompted camera diagnostic, not ground-truth gesture accuracy. Timing is browser callback time. No camera images or landmarks exported."}}
}
export {LabRun,SCENARIOS};
