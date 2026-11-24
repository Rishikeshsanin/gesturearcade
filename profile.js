const DEFAULT={favorites:[],recent:[],records:{},plays:{},achievements:[]};
export class LocalProfile{
 constructor(storage,key='gesturearcade.profile.v1'){this.storage=storage;this.key=key;try{const data=JSON.parse(storage?.getItem(key)||'null');this.data={...DEFAULT,...(data&&typeof data==='object'?data:{})};if(!Array.isArray(this.data.favorites)||!Array.isArray(this.data.recent)||!Array.isArray(this.data.achievements)||typeof this.data.records!=='object'||!this.data.records||typeof this.data.plays!=='object'||!this.data.plays)throw Error('Invalid profile')}catch{this.data=JSON.parse(JSON.stringify(DEFAULT))}}
 persist(){try{this.storage?.setItem(this.key,JSON.stringify(this.data))}catch{}}
 favorite(id){const set=new Set(this.data.favorites);set.has(id)?set.delete(id):set.add(id);this.data.favorites=[...set];this.persist();return set.has(id)}
 play(id){this.data.recent=[id,...this.data.recent.filter(x=>x!==id)].slice(0,8);this.data.plays={...this.data.plays,[id]:(Number(this.data.plays[id])||0)+1};this.unlock();this.persist()}
 record(id,score){if(!Number.isFinite(score)||score<0)return;this.data.records={...this.data.records,[id]:Math.max(score,Number(this.data.records[id])||0)};this.unlock();this.persist()}
 unlock(){const a=new Set(this.data.achievements);const played=Object.keys(this.data.plays).length;if(played>=1)a.add('First game');if(played>=5)a.add('Arcade explorer');if(played>=20)a.add('Full collection');if(Object.values(this.data.records).some(x=>x>=100))a.add('Century');this.data.achievements=[...a]}
}