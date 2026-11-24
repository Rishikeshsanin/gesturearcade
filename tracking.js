function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}

function clamp(v,min,max){return Math.max(min,Math.min(max,v))}

function sweptHit(a,b,c,d,r){const x=a.x-c.x,y=a.y-c.y,vx=b.x-a.x-(d.x-c.x),vy=b.y-a.y-(d.y-c.y);const q=vx*vx+vy*vy;const t=q?clamp(-(x*vx+y*vy)/q,0,1):0;return Math.hypot(x+t*vx,y+t*vy)<=r}

function palmOf(l){return {x:(l[0].x+l[5].x+l[9].x+l[13].x+l[17].x)/5,y:(l[0].y+l[5].y+l[9].y+l[13].y+l[17].y)/5}}

function readHand(l,side="",sideScore=0){if(l.length!==21||l.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))return null;const palm=palmOf(l),scale=Math.max(.025,dist(l[0],l[9]),dist(l[5],l[17]));const extended=[8,12,16,20].map(i=>dist(l[i],palm)>dist(l[i-2],palm)+scale*.15);return {landmarks:l,palm,scale,tip:l[8],side,sideScore,pinch:dist(l[4],l[8])/scale,extended}}

class Tracker {
 constructor(){this.tracks=[];this.seq=0;this.loss=0;this.rejected=0;this.sensitivity=1}
 reset(){this.loss+=this.tracks.length;this.tracks=[]}
 update(hands,t){const prev=this.tracks;const candidates=[];for(let i=0;i<hands.length;i++)for(let j=0;j<prev.length;j++){const a=hands[i],b=prev[j],dt=t-b.t;if(dt<=0||dt>120)continue;const pd=dist(a.palm,b.palm),shape=dist({x:a.tip.x-a.palm.x,y:a.tip.y-a.palm.y},{x:b.tip.x-b.palm.x,y:b.tip.y-b.palm.y});const ratio=a.scale/b.scale;const limit=Math.min(.67,.045+dt*.0065*this.sensitivity);if(pd>limit||shape>Math.max(a.scale,b.scale)*1.7||ratio<.45||ratio>2.2)continue;const sidePenalty=a.side&&b.side&&a.side!==b.side&&a.sideScore>.8&&b.sideScore>.8?.12:0;candidates.push({i,j,cost:pd+shape*.35+sidePenalty})}
 candidates.sort((a,b)=>a.cost-b.cost);const usedI=new Set(),usedJ=new Set(),next=[];for(const c of candidates){if(usedI.has(c.i)||usedJ.has(c.j))continue;const ambiguous=candidates.some(k=>k!==c&&(k.i===c.i||k.j===c.j)&&Math.abs(k.cost-c.cost)<.045&&!usedI.has(k.i)&&!usedJ.has(k.j));if(ambiguous)continue;usedI.add(c.i);usedJ.add(c.j);const a=hands[c.i],b=prev[c.j],dt=t-b.t,raw=a.tip;const vx=(raw.x-b.tip.x)/dt,vy=(raw.y-b.tip.y)/dt,speed=Math.hypot(vx,vy)*1000;const alpha=clamp(.28+speed*.18,.28,1);const filtered={x:b.filtered.x+(raw.x-b.filtered.x)*alpha,y:b.filtered.y+(raw.y-b.filtered.y)*alpha};const pinched=b.pinched?a.pinch<.48:a.pinch<.32;const gesture=pinched?"pinch":a.extended.every(Boolean)?"open palm":a.extended.every(x=>!x)?"fist":a.extended[0]&&!a.extended.slice(1).some(Boolean)?"point":"neutral";next.push({...a,id:b.id,t,filtered,vx,vy,speed,pinched,gesture,segment:{a:b.tip,b:raw,t0:b.t,t1:t},age:b.age+1})}
 for(let i=0;i<hands.length;i++)if(!usedI.has(i)){const a=hands[i];next.push({...a,id:++this.seq,t,filtered:{...a.tip},vx:0,vy:0,speed:0,pinched:false,gesture:"acquiring",segment:null,age:1});if(prev.length)this.rejected++}
 this.loss+=prev.length-usedJ.size;this.tracks=next;return next}
 predict(track,now){const dt=clamp(now-track.t,0,24);const dx=track.vx*dt,dy=track.vy*dt;const factor=Math.min(1,.045/(Math.hypot(dx,dy)||1));return {x:clamp(track.filtered.x+dx*factor,0,1),y:clamp(track.filtered.y+dy*factor,0,1)}}
}

function syntheticHand(x,y){return {palm:{x,y},tip:{x,y:y-.1},scale:.12,side:"Right",sideScore:.95,pinch:1,extended:[true,false,false,false],landmarks:[]}}

function benchmark(){let oldHits=0,newHits=0,total=0,falseHits=0;for(const delta of [.06,.15,.28,.34,.4])for(const dt of [33,50,66]){const a=syntheticHand(.1,.5),b=syntheticHand(.1+delta,.5),target={x:.1+delta/2,y:.4};const tr=new Tracker();tr.update([a],0);const out=tr.update([b],dt)[0];const legacy=dt<=200&&delta*960<=230&&sweptHit(a.tip,b.tip,target,target,.025);oldHits+=Number(legacy);newHits+=Number(!!out.segment&&sweptHit(out.segment.a,out.segment.b,target,target,.025));total++}for(const gap of [121,200,500]){const tr=new Tracker();tr.update([syntheticHand(.1,.5)],0);const out=tr.update([syntheticHand(.8,.5)],gap)[0];falseHits+=Number(!!out.segment)}return {total,oldHits,newHits,falseHits,lossCases:3,scope:"Synthetic normalized landmark paths; legacy proxy models only distance and time gates; no physical camera or model inference."}}
export {dist,clamp,sweptHit,readHand,Tracker,syntheticHand,benchmark};
