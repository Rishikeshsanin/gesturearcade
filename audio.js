export class ArcadeAudio{
 constructor(){this.context=null;this.master=null;this.recordBus=null;this.volume=.6}
 async resume(){if(!this.context){const C=globalThis.AudioContext||globalThis.webkitAudioContext;if(!C)return;this.context=new C();this.master=this.context.createGain();this.master.gain.value=this.volume;this.master.connect(this.context.destination);this.recordBus=this.context.createMediaStreamDestination();this.master.connect(this.recordBus)}if(this.context.state!=='running')await this.context.resume()}
 setVolume(v){this.volume=Math.max(0,Math.min(1,Number(v)||0));if(this.master)this.master.gain.setTargetAtTime(this.volume,this.context.currentTime,.02)}
 tone(hz=530,type='triangle',duration=.13,level=.1){const c=this.context;if(!c||c.state!=='running'||this.volume===0)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.type=type;o.frequency.setValueAtTime(Math.max(30,hz),t);o.frequency.exponentialRampToValueAtTime(Math.max(30,hz*.45),t+duration*.8);g.gain.setValueAtTime(level,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(this.master);o.start();o.stop(t+duration+.01);o.onended=()=>{o.disconnect();g.disconnect()}}
 beat(index){this.tone(index%4===0?100:440,index%4===0?'sine':'triangle',.07,.06)}
 get recordTrack(){return this.recordBus?.stream.getAudioTracks()[0]||null}
}