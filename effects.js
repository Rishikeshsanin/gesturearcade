export class EffectsPool{
 constructor(cap=160){this.cap=cap;this.items=Array.from({length:cap},()=>({life:0}));this.cursor=0}
 clear(){for(const p of this.items)p.life=0}
 burst(x,y,color,count=15){for(let i=0;i<Math.min(count,this.cap);i++){const p=this.items[this.cursor++%this.cap],angle=Math.random()*Math.PI*2,speed=60+Math.random()*260;Object.assign(p,{x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:.25+Math.random()*.4,r:2+Math.random()*5,color})}}
 update(dt){for(const p of this.items){if(p.life<=0)continue;p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=350*dt}}
 draw(c){c.save();for(const p of this.items){if(p.life<=0)continue;c.globalAlpha=Math.min(1,p.life*3);c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,p.r,0,Math.PI*2);c.fill()}c.restore()}
}