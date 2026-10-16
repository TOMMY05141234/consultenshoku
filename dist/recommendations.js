(function(){
 'use strict';
 const boxes=[...document.querySelectorAll('[data-recommendations]')];if(!boxes.length)return;
 const key='consultant-reading-v1';const validTopics=['all','beginner','interview','salary','ai','consultation'];let state={history:[],topic:'all'};
 try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved&&Array.isArray(saved.history)){state.history=saved.history.filter(e=>e&&typeof e.slug==='string').slice(-20);state.topic=validTopics.includes(saved.topic)?saved.topic:'all'}}catch{}
 const current=boxes[0].dataset.current;
 const write=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{}};
 fetch('/article-map.json').then(r=>{if(!r.ok)throw Error('metadata');return r.json()}).then(items=>{
  if(items.some(a=>a.slug===current)){state.history=state.history.filter(e=>e.slug!==current);state.history.push({slug:current,at:Date.now()});state.history=state.history.slice(-20);write()}
  function render(){boxes.forEach(box=>{
   const grid=box.querySelector('.related-grid');const ranked=window.CareerRecommendations.rankArticles(items,{current:box.dataset.current,history:state.history,topic:state.topic}).slice(0,3);
   grid.replaceChildren(...ranked.map(a=>{const link=document.createElement('a');link.href='/'+a.slug+'/';const img=document.createElement('img');img.src='/assets/'+a.image+'.webp';img.alt='';img.width=320;img.height=210;img.loading='lazy';const topic=document.createElement('span');topic.textContent=a.short;const title=document.createElement('b');title.textContent=a.title;const more=document.createElement('em');more.textContent='記事を読む →';link.append(img,topic,title,more);return link}));
   box.querySelectorAll('[data-topic]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.topic===state.topic)));
  })}
  boxes.forEach(box=>{
   box.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{state.topic=b.dataset.topic;write();render()}));
   box.querySelector('[data-reset-reading]')?.addEventListener('click',()=>{state={history:[],topic:'all'};try{localStorage.removeItem(key)}catch{}render();const note=box.querySelector('.reading-note');note.textContent='閲覧履歴をリセットしました。閲覧した記事と選んだテーマに合わせて表示します。履歴はこのブラウザ内だけに保存します。';});
  });render();
 }).catch(()=>{boxes.forEach(box=>{const filter=box.querySelector('.reading-topics');if(filter)filter.hidden=true;const reset=box.querySelector('[data-reset-reading]');if(reset)reset.hidden=true;box.querySelector('.reading-note').textContent='関連する記事を紹介しています。';})});
})();
