(function(root){
 'use strict';
 function rankArticles(items,options){
  const current=options.current||'',history=Array.isArray(options.history)?options.history:[],topic=options.topic||'all';
  const here=items.find(a=>a.slug===current);const weights=new Map();
  (here?.tags||[]).forEach(t=>weights.set(t,(weights.get(t)||0)+4));
  history.slice(-12).reverse().forEach((entry,i)=>{const a=items.find(a=>a.slug===entry.slug);(a?.tags||[]).forEach(t=>weights.set(t,(weights.get(t)||0)+Math.max(.25,2-i*.15)))});
  return items.filter(a=>a.slug!==current).map((a,i)=>({a,i,score:(a.tags||[]).reduce((s,t)=>s+(weights.get(t)||0),0)+(topic!=='all'&&(a.tags||[]).includes(topic)?100:0)+(history.some(e=>e.slug===a.slug)?0:3)})).sort((a,b)=>b.score-a.score||a.i-b.i).map(x=>x.a);
 }
 root.CareerRecommendations={rankArticles};if(typeof module!=='undefined'&&module.exports)module.exports={rankArticles};
})(typeof window!=='undefined'?window:globalThis);
