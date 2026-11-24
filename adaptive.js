export class AdaptiveQuality{
 constructor(mode='auto'){this.mode=mode;this.level=1;this.ema=0;this.count=0;this.slow=0;this.fast=0}
 get profile(){const i=this.mode==='speed'?0:this.mode==='detail'?2:this.level;return [{width:384,interval:33},{width:640,interval:20},{width:960,interval:0}][i]}
 observe(ms){if(!Number.isFinite(ms)||ms<0)return;this.ema=this.count?this.ema*.9+ms*.1:ms;this.count++;if(this.mode!=='auto')return;if(this.ema>38){this.slow++;this.fast=0}else if(this.ema<17){this.fast++;this.slow=0}else{this.slow=0;this.fast=0}if(this.slow>=20){this.level=Math.max(0,this.level-1);this.slow=0}if(this.fast>=90){this.level=Math.min(2,this.level+1);this.fast=0}}
}
export class AutoCalibration{
 constructor(){this.reset()}
 reset(){this.samples=[];this.previous=null;this.id=null;this.jitter=null;this.scale=null}
 observe(h){if(!h||h.id!==this.id){this.previous=null;this.id=h?.id??null;this.samples=[];this.jitter=null;this.scale=null}if(!h)return;if(this.previous&&h.speed<.2){this.samples.push({d:Math.hypot(h.tip.x-this.previous.x,h.tip.y-this.previous.y),scale:h.scale});if(this.samples.length>90)this.samples.shift();if(this.samples.length>=20){const a=this.samples.map(s=>s.d).sort((a,b)=>a-b),b=this.samples.map(s=>s.scale).sort((a,b)=>a-b);this.jitter=a[Math.floor(a.length/2)];this.scale=b[Math.floor(b.length/2)]}}this.previous=h.tip}
 get alphaFloor(){return this.jitter===null?.28:Math.max(.17,Math.min(.42,.36-this.jitter*35))}
 summary(){return {samples:this.samples.length,stationaryJitter:this.jitter,medianHandScale:this.scale,displayAlphaFloor:this.alphaFloor,scope:'Stationary observation calibration only; does not change collision gates.'}}
}