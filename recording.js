export class GameplayRecorder{
 constructor(canvas,status){this.canvas=canvas;this.status=status;this.recorder=null;this.chunks=[];this.bytes=0;this.frame=0;this.stream=null;this.output=null;this.failure=null}
 get supported(){return typeof MediaRecorder!=='undefined'&&typeof this.canvas.captureStream==='function'}
 get active(){return this.recorder?.state==='recording'}
 cleanup(){cancelAnimationFrame(this.frame);clearTimeout(this.limit);this.stream?.getTracks().forEach(t=>t.stop());this.stream=null;this.output?.remove();this.output=null;this.recorder=null}
 start({portrait=false,audioTrack=null}={}){
  if(!this.supported||this.recorder)throw Error('Recording unavailable or already active');
  const output=this.output=document.createElement('canvas');output.width=portrait?540:960;output.height=portrait?960:540;output.className='recording-surface';output.setAttribute('aria-hidden','true');document.body.append(output);
  const c=output.getContext('2d',{alpha:false});let last=0;const draw=()=>{c.fillStyle='#101219';c.fillRect(0,0,output.width,output.height);const scale=Math.min(output.width/this.canvas.width,output.height/this.canvas.height),w=this.canvas.width*scale,h=this.canvas.height*scale;c.drawImage(this.canvas,(output.width-w)/2,(output.height-h)/2,w,h);if(portrait){c.fillStyle='#c1ff58';c.font='bold 32px system-ui';c.textAlign='center';c.fillText('GESTUREARCADE',270,160);c.fillStyle='#fff';c.font='18px system-ui';c.fillText('PLAY BEYOND THE CONTROLLER',270,810)}};
  try{draw();this.stream=output.captureStream(30);const videoTrack=this.stream.getVideoTracks()[0];if(!videoTrack)throw Error('Canvas capture did not create a video track');if(audioTrack&&audioTrack.readyState==='live')this.stream.addTrack(audioTrack.clone());const hasAudio=this.stream.getAudioTracks().length>0;const candidates=hasAudio?['video/webm;codecs=vp8,opus','video/webm','video/mp4']:['video/webm;codecs=vp8','video/webm','video/mp4'];const mime=candidates.find(t=>MediaRecorder.isTypeSupported(t));this.recorder=new MediaRecorder(this.stream,{...(mime?{mimeType:mime}:{}),videoBitsPerSecond:1800000,...(hasAudio?{audioBitsPerSecond:96000}:{})});this.chunks=[];this.bytes=0;this.failure=null;const recorder=this.recorder;
  recorder.ondataavailable=e=>{if(e.data.size){this.chunks.push(e.data);this.bytes+=e.data.size;if(this.bytes>24*1024*1024)this.stop()}};
  recorder.onerror=e=>{this.failure=e.error?.message||'Browser encoder error';if(this.active)this.stop()};
  recorder.onstop=()=>{const blob=new Blob(this.chunks,{type:recorder.mimeType||'video/webm'}),failure=this.failure;this.chunks=[];this.cleanup();if(failure||!blob.size){this.status('Recording failed: '+(failure||'no encoded frames. Try without game audio or use another browser.'),null);return}this.status('Clip ready · '+Math.max(.01,blob.size/1024/1024).toFixed(2)+' MB',blob)};
  const tick=now=>{if(this.recorder!==recorder||recorder.state==='inactive')return;if(now-last>=1000/30-2){last=now;draw();videoTrack.requestFrame?.()}this.frame=requestAnimationFrame(tick)};
  recorder.start(250);draw();videoTrack.requestFrame?.();this.frame=requestAnimationFrame(tick);this.limit=setTimeout(()=>this.stop(),60000);this.status('RECORDING · game canvas + selected game audio · 60s maximum',null);
  }catch(e){this.cleanup();throw e}
 }
 stop(){if(this.active)this.recorder.stop()}
}
