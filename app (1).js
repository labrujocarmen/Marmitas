/* app.js — controlador principal */
'use strict';

/* ===================== ESTADO ===================== */
let APP = null;
let S = null;
let saveTimer = null;

function defaultState(app) {
  return {
    settings: { people: 3, marmitaDays: 5, proteinPerPerson: 150, dinnersPerWeek: 7 },
    currentWeek: 1,
    weeks: {},
    recipes: app.recipes.lunches.map(r => ({ ...r })),
    dinners: app.recipes.dinners.map(d => ({ ...d })),
    ingredients: app.ingredients.ingredients.map(i => ({ ...i })),
    pantry: app.ingredients.pantry.map(p => ({ ...p })),
    freezer: [
      { id:'f1', name:'Frango desfiado', qty:8, unit:'porções' },
      { id:'f2', name:'Carne moída',     qty:5, unit:'porções' },
      { id:'f3', name:'Peixe',           qty:3, unit:'porções' },
      { id:'f4', name:'Carne de panela', qty:4, unit:'porções' }
    ],
    checklist: ['Comprar mercado','Temperar carnes','Cozinhar arroz',
      'Cozinhar batata','Assar legumes','Fazer sopa','Montar marmitas','Congelar'
    ].map((t,i) => ({ id:'c'+i, text:t, done:false })),
    shoppingDone: {},
    invoices: [],
    inspirations: [],
    priceHistory: {},
    tab: 'dashboard',
    recipesTab: 'lunch',
    recipesFilter: 'all',
    dinnersFilter: 'all',
    moreTab: 'freezer',
    shoppingTab: 'cardapio',
    _priceQ: ''
  };
}

function mergeState(saved, fresh) {
  const s = Object.assign({}, fresh, saved);
  const merge = (seed, stored) => {
    if (!stored) return seed;
    const m = {};
    seed.forEach(r => m[r.id] = r);
    stored.forEach(r => m[r.id] = r);
    return Object.values(m);
  };
  s.recipes     = merge(fresh.recipes,     saved.recipes);
  s.dinners     = merge(fresh.dinners,     saved.dinners);
  s.ingredients = merge(fresh.ingredients, saved.ingredients);
  s.pantry      = merge(fresh.pantry,      saved.pantry);
  if (!s.inspirations) s.inspirations = [];
  if (!s.invoices)     s.invoices = [];
  if (!s.priceHistory) s.priceHistory = {};
  if (!s._priceQ)      s._priceQ = '';
  return s;
}

function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => Storage.save(S), 300);
}

function curWeek() {
  if (!S.weeks[S.currentWeek]) S.weeks[S.currentWeek] = { lunches:[], dinners:[] };
  return S.weeks[S.currentWeek];
}

function findRecipe(id) { return S.recipes.find(r => r.id === id); }
function findDinner(id) { return S.dinners.find(d => d.id === id); }

/* ===================== CUSTO ===================== */
function neededMarmitas()    { return S.settings.people * S.settings.marmitaDays; }
function totalLunchServings(){ return curWeek().lunches.reduce((s,l)=>{ const r=findRecipe(l.id); return r?s+r.servings*l.batches:s; },0); }
function weeklyLunchCost()   { return curWeek().lunches.reduce((s,l)=>{ const r=findRecipe(l.id); return r?s+recipeCost(r,S.ingredients)*l.batches:s; },0); }
function weeklyDinnerCost()  { return curWeek().dinners.reduce((s,id)=>{ const d=findDinner(id); return d?s+recipeCost(d,S.ingredients)*(S.settings.people/Math.max(1,d.servings)):s; },0); }
function weeklyCost()        { return weeklyLunchCost()+weeklyDinnerCost(); }
function costPerMarmita()    { const n=totalLunchServings(); return n>0?weeklyLunchCost()/n:0; }
function monthSpend()        { const ym=new Date().toISOString().slice(0,7); return (S.invoices||[]).filter(i=>i.date.startsWith(ym)).reduce((s,i)=>s+i.total,0); }

/* ===================== LISTA DE COMPRAS ===================== */
function buildShoppingList() {
  const map = {};
  const add = (ing, mult) => {
    const key = ing.name+'|'+ing.unit;
    if (!map[key]) map[key] = { name:ing.name, qty:0, unit:ing.unit, cat:ing.cat };
    map[key].qty += ing.qty * mult;
  };
  curWeek().lunches.forEach(l => { const r=findRecipe(l.id); if(r) r.ings.forEach(i=>add(i,l.batches)); });
  curWeek().dinners.forEach(id => { const d=findDinner(id); if(d) d.ings.forEach(i=>add(i,S.settings.people/Math.max(1,d.servings))); });
  return Object.values(map).sort((a,b)=>a.name.localeCompare(b.name));
}

/* ===================== TOAST ===================== */
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

/* ===================== DASHBOARD ===================== */
function renderDashboard() {
  const need=neededMarmitas(), have=totalLunchServings();
  const wCost=weeklyCost(), mCost=wCost*4.33, perM=costPerMarmita();
  const lunchC=weeklyLunchCost(), dinnerC=weeklyDinnerCost();
  const list=buildShoppingList();
  const byCat={};
  list.forEach(i=>{ byCat[i.cat]=(byCat[i.cat]||0)+ingCost(i,S.ingredients); });
  const maxC=Math.max(1,...Object.values(byCat));
  return `
  <div class="card">
    <div class="eyebrow">Configuração</div>
    <div class="g3" style="margin-bottom:8px;">
      <div><label>Pessoas</label><input type="number" min="1" id="cfg-people" value="${S.settings.people}"></div>
      <div><label>Dias marmita</label><input type="number" min="1" max="7" id="cfg-days" value="${S.settings.marmitaDays}"></div>
      <div><label>Proteína/p (g)</label><input type="number" min="0" id="cfg-protein" value="${S.settings.proteinPerPerson}"></div>
    </div>
    <div><label>Jantares/semana</label><input type="number" min="0" max="7" id="cfg-dinners" value="${S.settings.dinnersPerWeek}" style="max-width:110px;"></div>
  </div>
  <div class="g2">
    <div class="stat"><div class="v">${need}</div><div class="l">Marmitas necessárias/semana</div></div>
    <div class="stat"><div class="v">${have}</div><div class="l">Marmitas planeadas</div></div>
    <div class="stat"><div class="v">${S.settings.proteinPerPerson*S.settings.people}g</div><div class="l">Proteína total/dia</div></div>
    <div class="stat"><div class="v">${fmt(perM)}</div><div class="l">Custo por marmita</div></div>
    <div class="stat"><div class="v">${fmt(wCost)}</div><div class="l">Custo semanal</div></div>
    <div class="stat"><div class="v">${fmt(mCost)}</div><div class="l">Custo mensal estimado</div></div>
    <div class="stat"><div class="v">${fmt(monthSpend())}</div><div class="l">Gasto real este mês</div></div>
    <div class="stat"><div class="v">${fmt(lunchC)} / ${fmt(dinnerC)}</div><div class="l">Almoço / Jantar</div></div>
  </div>
  ${have<need?`<div class="card warn"><span class="eyebrow danger-text">⚠️ Faltam marmitas</span><div class="muted">${have} de ${need} planeadas.</div></div>`:''}
  <div class="card">
    <h3>Custo por categoria</h3>
    ${Object.keys(ICAT).map(c=>{ const v=byCat[c]||0; if(!v) return ''; return `<div class="barwrap"><div class="barlabel">${ICAT[c]}</div><div class="barbg"><div class="barfg" style="width:${Math.round(v/maxC*100)}%;"></div></div><div class="barval mono">${fmt(v)}</div></div>`; }).join('')}
    ${!list.length?'<div class="muted">Gera um cardápio para ver os custos.</div>':''}
  </div>`;
}

function bindDashboard() {
  const map={'cfg-people':'people','cfg-days':'marmitaDays','cfg-protein':'proteinPerPerson','cfg-dinners':'dinnersPerWeek'};
  Object.keys(map).forEach(id=>{ const el=document.getElementById(id); if(el) el.onchange=()=>{ S.settings[map[id]]=Math.max(0,parseInt(el.value)||0); save(); render(); }; });
}

/* ===================== CARDÁPIO ===================== */
function renderMenu() {
  const wk=curWeek(), need=neededMarmitas(), have=totalLunchServings();
  return `
  <div class="card">
    <div class="row between">
      <div><div class="eyebrow">Semana ativa</div><h2 style="margin:0;">Semana ${S.currentWeek}</h2></div>
      <button class="btn" id="btn-gen">✨ Gerar</button>
    </div>
    <div class="muted" style="margin-top:5px;">${have}/${need} marmitas · ${fmt(weeklyLunchCost())}</div>
  </div>
  <div class="section-title">🍱 Almoços / Marmitas</div>
  <div class="card">
    ${wk.lunches.length===0?'<div class="empty"><span class="ic">🍽️</span>Nenhuma receita.<br><span class="muted">Usa "Gerar" ou vai a Receitas.</span></div>'
    :wk.lunches.map((l,i)=>{ const r=findRecipe(l.id); if(!r) return '';
      return `<div class="lunchpick"><div class="nm">${r.name}<div class="muted">${r.servings} porções/lote · ${fmt(recipeCost(r,S.ingredients))}</div></div>
        <button class="step-btn" data-adj="-1" data-i="${i}">–</button>
        <span class="mono" style="min-width:20px;text-align:center;">${l.batches}</span>
        <button class="step-btn" data-adj="1" data-i="${i}">+</button>
        <button class="x-btn" data-rml="${i}">✕</button></div>`; }).join('')}
  </div>
  <div class="section-title">🥪 Jantares</div>
  <div class="card">
    ${wk.dinners.length===0?'<div class="empty"><span class="ic">🌙</span>Nenhum jantar.</div>'
    :wk.dinners.map((id,i)=>{ const d=findDinner(id); if(!d) return '';
      return `<div class="lunchpick"><div class="nm">${d.name}<div class="muted">${DTYPES[d.type]||''}</div></div><button class="x-btn" data-rmd="${i}">✕</button></div>`; }).join('')}
  </div>
  <div class="section-title">📅 52 semanas</div>
  <div class="card">
    <div class="weekgrid">
      ${Array.from({length:52},(_,i)=>i+1).map(w=>{ const has=S.weeks[w]&&(S.weeks[w].lunches.length||S.weeks[w].dinners.length);
        return `<button class="${w===S.currentWeek?'active':''} ${has?'has':''}" data-week="${w}">${w}</button>`; }).join('')}
    </div>
  </div>`;
}

function bindMenu() {
  const gb=document.getElementById('btn-gen');
  if(gb) gb.onclick=()=>{ const wk=curWeek(); wk.lunches=generateLunches(S.recipes,S.weeks,S.currentWeek,neededMarmitas()); wk.dinners=generateDinners(S.dinners,S.weeks,S.currentWeek,S.settings.dinnersPerWeek); save(); toast('Cardápio gerado 🎉'); render(); };
  document.querySelectorAll('[data-week]').forEach(b=>b.onclick=()=>{ S.currentWeek=parseInt(b.dataset.week); save(); render(); });
  document.querySelectorAll('[data-adj]').forEach(b=>b.onclick=()=>{ const i=parseInt(b.dataset.i),adj=parseInt(b.dataset.adj); curWeek().lunches[i].batches=Math.max(0,curWeek().lunches[i].batches+adj); save(); render(); });
  document.querySelectorAll('[data-rml]').forEach(b=>b.onclick=()=>{ curWeek().lunches.splice(parseInt(b.dataset.rml),1); save(); render(); });
  document.querySelectorAll('[data-rmd]').forEach(b=>b.onclick=()=>{ curWeek().dinners.splice(parseInt(b.dataset.rmd),1); save(); render(); });
}

/* ===================== RECEITAS ===================== */
function renderRecipes() {
  const sub=S.recipesTab;
  // Inspirações pendentes (sem receita criada)
  const pendingInsp=(S.inspirations||[]).filter(i=>!i.recipeCreated);
  const inspBanner=pendingInsp.length?`
  <div class="card highlight" style="margin-bottom:10px;">
    <div class="eyebrow">📌 Inspirações por transformar em receita</div>
    ${pendingInsp.map(insp=>`<div class="row between" style="padding:6px 0;border-bottom:1px solid var(--line);">
      <span style="font-size:13px;flex:1;">${insp.notes||insp.url}</span>
      <button class="btn sm olive" data-insp2r="${insp.id}">+ Criar receita</button>
    </div>`).join('')}
  </div>`:'';
  return `
  ${inspBanner}
  <div class="pills">
    <button class="${sub==='lunch'?'active':''}" data-rtab="lunch">🍱 Marmitas</button>
    <button class="${sub==='dinner'?'active':''}" data-rtab="dinner">🥪 Jantares</button>
  </div>
  ${sub==='lunch'?renderLunchBank():renderDinnerBank()}
  <button class="btn block" id="btn-new-recipe" style="margin-top:6px;">+ ${sub==='lunch'?'Nova receita':'Novo jantar'}</button>`;
}

function renderLunchBank() {
  const f=S.recipesFilter;
  const cats=['all','fav',...Object.keys(CATS)];
  const list=S.recipes.filter(r=>f==='all'?true:f==='fav'?r.fav:r.cat===f);
  return `
  <div class="pills">
    ${cats.map(c=>`<button class="${f===c?'active':''}" data-rcf="${c}">${c==='all'?'Todas':c==='fav'?'⭐ Favoritas':CATS[c]}</button>`).join('')}
  </div>
  ${list.length===0?'<div class="empty"><span class="ic">🔍</span>Nada encontrado.</div>'
  :list.map(r=>renderRecipeCard(r,S.ingredients,{kind:'lunch'})).join('')}`;
}

function renderDinnerBank() {
  const f=S.dinnersFilter;
  const types=['all','fav',...Object.keys(DTYPES)];
  const list=S.dinners.filter(d=>f==='all'?true:f==='fav'?d.fav:d.type===f);
  return `
  <div class="pills">
    ${types.map(t=>`<button class="${f===t?'active':''}" data-rdf="${t}">${t==='all'?'Todos':t==='fav'?'⭐ Favoritas':DTYPES[t]}</button>`).join('')}
  </div>
  ${list.length===0?'<div class="empty"><span class="ic">🔍</span>Nada encontrado.</div>'
  :list.map(d=>renderRecipeCard(d,S.ingredients,{kind:'dinner'})).join('')}`;
}

/* renderRecipeCard — com botão Editar */
function renderRecipeCardFull(r, ingredients, opts={}) {
  const cost=recipeCostPerServing(r,ingredients);
  const catKey=r.cat||'';
  return `
  <div class="recipe-card">
    <div class="row between">
      <span class="name">${r.name}</span>
      <div class="row" style="gap:4px;">
        <button class="x-btn" style="color:${r.fav?'#E3A23B':'#c8c2a4'};font-size:19px;" data-fav="${r.id}" data-kind="${opts.kind||'lunch'}">★</button>
        ${r.cat?`<span class="tag cat-${catKey}">${CATS[catKey]||DTYPES[r.type]||''}</span>`:''}
      </div>
    </div>
    <div class="tags-row">
      <span class="tag">${r.freezes?'❄️ Congela':'🚫 Não congela'}</span>
      <span class="tag">⏱️ ${r.prep}min</span>
      ${r.oven?`<span class="tag">🔥 ${r.oven}min forno</span>`:''}
      ${r.pressure?`<span class="tag">💨 ${r.pressure}min pressão</span>`:''}
      <span class="tag">📶 ${r.diff}</span>
      ${r.season&&r.season!=='todo'?`<span class="tag gold">🌱 ${SEASONS[r.season]}</span>`:''}
      <span class="tag mono">${fmt(cost)}/porção</span>
    </div>
    <div class="row" style="margin-top:9px;gap:6px;">
      <button class="btn sm olive" data-add="${r.id}" data-kind="${opts.kind||'lunch'}">+ Adicionar à semana</button>
      <button class="btn sm ghost" data-edit="${r.id}" data-kind="${opts.kind||'lunch'}">✏️ Editar</button>
      <button class="x-btn" data-delrec="${r.id}" data-kind="${opts.kind||'lunch'}" title="Apagar receita">🗑️</button>
    </div>
  </div>`;
}

function bindRecipes() {
  document.querySelectorAll('[data-rtab]').forEach(b=>b.onclick=()=>{ S.recipesTab=b.dataset.rtab; render(); });
  document.querySelectorAll('[data-rcf]').forEach(b=>b.onclick=()=>{ S.recipesFilter=b.dataset.rcf; render(); });
  document.querySelectorAll('[data-rdf]').forEach(b=>b.onclick=()=>{ S.dinnersFilter=b.dataset.rdf; render(); });
  document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>{
    const kind=b.dataset.kind,id=b.dataset.fav;
    if(kind==='lunch'){ const r=S.recipes.find(r=>r.id===id); if(r) r.fav=!r.fav; }
    else { const d=S.dinners.find(d=>d.id===id); if(d) d.fav=!d.fav; }
    save(); render();
  });
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.add,kind=b.dataset.kind;
    if(kind==='lunch'){ const ex=curWeek().lunches.find(l=>l.id===id); if(ex) ex.batches++; else curWeek().lunches.push({id,batches:1}); }
    else curWeek().dinners.push(id);
    save(); toast('Adicionado ao cardápio ✓'); render();
  });
  // Editar receita
  document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{
    const kind=b.dataset.kind,id=b.dataset.edit;
    const rec = kind==='lunch'?S.recipes.find(r=>r.id===id):S.dinners.find(d=>d.id===id);
    if(rec) openRecipeModal(kind, null, rec);
  });
  // Apagar receita
  document.querySelectorAll('[data-delrec]').forEach(b=>b.onclick=()=>{
    if(!confirm('Apagar esta receita?')) return;
    const kind=b.dataset.kind,id=b.dataset.delrec;
    if(kind==='lunch') S.recipes=S.recipes.filter(r=>r.id!==id);
    else S.dinners=S.dinners.filter(d=>d.id!==id);
    save(); render();
  });
  // Inspirações → criar receita (banner)
  document.querySelectorAll('[data-insp2r]').forEach(b=>b.onclick=()=>{
    const insp=S.inspirations.find(x=>x.id===b.dataset.insp2r);
    openRecipeModal(S.recipesTab, insp, null);
  });
  const nb=document.getElementById('btn-new-recipe');
  if(nb) nb.onclick=()=>openRecipeModal(S.recipesTab,null,null);
}

/* ===================== LISTA DE COMPRAS ===================== */
function renderShopping() {
  const sub=S.shoppingTab;
  return `
  <div class="pills">
    <button class="${sub==='cardapio'?'active':''}" data-stab="cardapio">🗓️ Do cardápio</button>
    <button class="${sub==='mestra'?'active':''}" data-stab="mestra">📝 Lista mestra</button>
  </div>
  ${sub==='cardapio'?renderShoppingCardapio():renderPantryList()}`;
}

function renderShoppingCardapio() {
  const list=buildShoppingList();
  const byCat={};
  Object.keys(ICAT).forEach(c=>byCat[c]=[]);
  list.forEach(i=>(byCat[i.cat]=byCat[i.cat]||[]).push(i));
  const total=list.reduce((s,i)=>s+ingCost(i,S.ingredients),0);
  const allDone=list.length>0&&list.every(i=>S.shoppingDone[i.name+'|'+i.unit]);
  return `
  <div class="card row between">
    <div><div class="eyebrow">Total estimado</div><h2 style="margin:0;">${fmt(total)}</h2></div>
    <button class="btn sm ghost" id="shop-add-manual">+ item</button>
  </div>
  ${allDone?'<div class="card success">✅ Tudo comprado! "Comprar mercado" marcado.</div>':''}
  ${list.length===0?'<div class="empty"><span class="ic">🛒</span>Sem itens.<br><span class="muted">Gera um cardápio primeiro.</span></div>':''}
  ${Object.keys(ICAT).map(c=>{ const items=byCat[c]||[]; if(!items.length) return '';
    return `<div class="section-title">${ICAT[c]}</div><div class="card">
      ${items.map(i=>{ const key=i.name+'|'+i.unit,done=!!S.shoppingDone[key],best=cheapestStore(i.name,S.ingredients);
        return `<div class="shop-item ${done?'done':''}"><input type="checkbox" data-shopkey="${key}" ${done?'checked':''}>
          <span class="nm">${i.name}${best?` <span style="font-size:11px;color:var(--teal);">(${STORES[best]})</span>`:''}</span>
          <span class="qty">${i.qty.toFixed(2)} ${i.unit}</span></div>`; }).join('')}
    </div>`; }).join('')}`;
}

function renderPantryList() {
  const byCat={};
  Object.keys(ICAT).forEach(c=>byCat[c]=[]);
  S.pantry.forEach(p=>(byCat[p.cat]=byCat[p.cat]||[]).push(p));
  const checked=S.pantry.filter(p=>p.checked).length;
  return `
  <div class="card row between">
    <span class="muted">${checked} marcado(s)</span>
    <div class="row" style="gap:6px;">
      <button class="btn sm ghost" id="pantry-add">+ item</button>
      <button class="btn sm olive" id="pantry-sync">↻ Enviar para lista</button>
    </div>
  </div>
  ${Object.keys(ICAT).map(c=>{ const items=byCat[c]||[]; if(!items.length) return '';
    return `<div class="section-title">${ICAT[c]}</div><div class="card">
      ${items.map(p=>`<div class="shop-item ${p.checked?'done':''}"><input type="checkbox" data-pantrychk="${p.id}" ${p.checked?'checked':''}><span class="nm">${p.name}</span><button class="x-btn" data-pantryrm="${p.id}">✕</button></div>`).join('')}
    </div>`; }).join('')}`;
}

function bindShopping() {
  document.querySelectorAll('[data-stab]').forEach(b=>b.onclick=()=>{ S.shoppingTab=b.dataset.stab; render(); });
  document.querySelectorAll('[data-shopkey]').forEach(el=>el.onchange=()=>{
    S.shoppingDone[el.dataset.shopkey]=el.checked;
    const list=buildShoppingList();
    if(list.length&&list.every(i=>S.shoppingDone[i.name+'|'+i.unit])){ const item=S.checklist.find(c=>c.text.toLowerCase().includes('mercado')); if(item) item.done=true; }
    save(); render();
  });
  const sa=document.getElementById('shop-add-manual'); if(sa) sa.onclick=openExtraModal;
  document.querySelectorAll('[data-pantrychk]').forEach(el=>el.onchange=()=>{ const p=S.pantry.find(p=>p.id===el.dataset.pantrychk); if(p) p.checked=el.checked; save(); render(); });
  document.querySelectorAll('[data-pantryrm]').forEach(b=>b.onclick=()=>{ const i=S.pantry.findIndex(p=>p.id===b.dataset.pantryrm); if(i>-1) S.pantry.splice(i,1); save(); render(); });
  const pa=document.getElementById('pantry-add'); if(pa) pa.onclick=()=>{ const n=prompt('Nome do item:'); if(!n) return; S.pantry.push({id:'p_'+Date.now(),name:n.trim(),cat:'desp',checked:false}); save(); render(); };
  const ps=document.getElementById('pantry-sync'); if(ps) ps.onclick=()=>{
    const marked=S.pantry.filter(p=>p.checked);
    if(!marked.length){ toast('Marca pelo menos um item'); return; }
    marked.forEach(p=>{ p.checked=false; });
    save(); S.shoppingTab='cardapio'; toast(marked.length+' item(ns) enviados ✓'); render();
  };
}

/* ===================== MAIS ===================== */
function renderMore() {
  const sub=S.moreTab;
  const tabs=[['freezer','❄️ Freezer'],['checklist','📋 Checklist'],['precos','💶 Preços'],['batch','🔥 Batch'],['faturas','📸 Faturas'],['inspiracoes','📌 Inspirações']];
  const map={freezer:renderFreezer,checklist:renderChecklist,precos:renderPrecos,batch:renderBatch,faturas:renderFaturas,inspiracoes:renderInspiracoes};
  return `
  <div class="pills">${tabs.map(([id,lb])=>`<button class="${sub===id?'active':''}" data-mtab="${id}">${lb}</button>`).join('')}</div>
  ${(map[sub]||renderFreezer)()}`;
}

function renderFreezer() {
  const max=Math.max(1,...S.freezer.map(f=>f.qty));
  return `<div class="card">${S.freezer.map(f=>`<div class="freezer-item">
    <div class="nm">${f.name}</div>
    <div class="barbg" style="flex:1"><div class="barfg" style="width:${Math.round(f.qty/max*100)}%;background:var(--teal);"></div></div>
    <button class="step-btn" data-fr="${f.id}" data-adj="-1">–</button>
    <span class="mono" style="min-width:20px;text-align:center;">${f.qty}</span>
    <button class="step-btn" data-fr="${f.id}" data-adj="1">+</button>
    <button class="x-btn" data-frrm="${f.id}">✕</button>
  </div>`).join('')}
  <button class="btn sm olive block" id="add-freezer" style="margin-top:6px;">+ item</button></div>`;
}

function renderChecklist() {
  return `<div class="card">${S.checklist.map(c=>`<div class="chk ${c.done?'done':''}">
    <input type="checkbox" data-chk="${c.id}" ${c.done?'checked':''}>
    <span style="flex:1;">${c.text}</span>
    <button class="x-btn" data-chkrm="${c.id}">✕</button>
  </div>`).join('')}</div>
  <div class="row" style="gap:8px;">
    <button class="btn sm olive" id="chk-add">+ item</button>
    <button class="btn sm ghost" id="chk-reset">↺ Reiniciar semana</button>
  </div>`;
}

function renderPrecos() {
  const q=(S._priceQ||'').toLowerCase();
  const list=S.ingredients.filter(i=>!q||i.name.toLowerCase().includes(q));
  return `
  <div class="card"><input type="text" id="price-search" placeholder="🔍 procurar ingrediente…" value="${S._priceQ||''}"></div>
  ${list.map(ing=>{ const best=cheapestStore(ing.name,S.ingredients);
    return `<div class="card" style="padding:10px 13px;">
      <div style="font-weight:700;font-size:13.5px;margin-bottom:7px;">${ing.name}</div>
      <div class="g3">${Object.keys(STORES).map(s=>`<div>
        <label style="${best===s?'color:var(--success);font-weight:800;':''}">${STORES[s]}${best===s?' ✓':''}</label>
        <input type="number" step="0.01" min="0" data-pstore="${ing.id}" data-ps="${s}" value="${ing.prices&&ing.prices[s]!=null?ing.prices[s]:''}" placeholder="—">
      </div>`).join('')}</div>
    </div>`; }).join('')}
  ${list.length===0?'<div class="empty"><span class="ic">🔍</span>Nenhum resultado.</div>':''}`;
}

function renderBatch() {
  const items=curWeek().lunches.map(l=>{ const r=findRecipe(l.id); return r?{...r,batches:l.batches}:null; }).filter(Boolean);
  if(!items.length) return '<div class="empty"><span class="ic">🔥</span>Sem receitas no cardápio.<br><span class="muted">Vai a Cardápio e gera ou escolhe receitas.</span></div>';
  const ordered=[...items].sort((a,b)=>(b.oven+b.pressure)-(a.oven+a.pressure));
  let clock=0;
  const timeline=ordered.map(r=>{ const start=clock; clock+=r.prep; const cookEnd=clock+Math.max(r.oven||0,r.pressure||0); return {r,start,prepEnd:clock,cookEnd}; });
  const total=Math.max(...timeline.map(t=>t.cookEnd),0);
  return `
  <div class="g2" style="margin-bottom:8px;">
    <div class="stat"><div class="v">${Math.round(total)}min</div><div class="l">Tempo total</div></div>
    <div class="stat"><div class="v">${(total/60).toFixed(1)}h</div><div class="l">De domingo</div></div>
  </div>
  <div class="section-title">Ordem de preparo</div>
  <div class="card">${ordered.map((r,i)=>`<div class="timeline-step">
    <span class="time">${i+1}.</span>
    <div class="desc">${r.name}<div class="muted">${r.prep}min prep${r.oven?` · ${r.oven}min forno`:''}${r.pressure?` · ${r.pressure}min pressão`:''}</div></div>
  </div>`).join('')}
  <div class="muted" style="margin-top:8px;">💡 Começa pelas que têm mais forno/pressão.</div></div>
  <div class="section-title">Cronograma</div>
  <div class="card">${timeline.map(t=>`
    <div class="kv"><span>${fmtMin(t.start)} — ${t.r.name}</span><span class="mono">${t.r.prep}min</span></div>
    ${t.r.oven||t.r.pressure?`<div class="kv"><span>${fmtMin(t.prepEnd)} — ${t.r.oven?'forno':'pressão'}</span><span class="mono">${t.r.oven||t.r.pressure}min</span></div>`:''}`).join('')}
    <div class="kv" style="border-top:1.5px solid var(--line);margin-top:4px;padding-top:8px;font-weight:700;"><span>🏁 Pronto</span><span class="mono">${fmtMin(total)}</span></div>
  </div>
  <div class="section-title">Etiquetas</div>
  <div class="card" id="labels-wrap">
    ${items.map(r=>Array.from({length:r.batches}).map((_,bi)=>`<div class="label-box"><div class="lname">${r.name}</div><div class="lmeta">Semana ${S.currentWeek} · Lote ${bi+1} · ${r.freezes?'❄️ Congelar':'🍽️ Consumir fresco'} · ${r.diff}</div></div>`).join('')).join('')}
    <button class="btn sm ghost block" id="print-labels">🖨️ Imprimir</button>
  </div>`;
}

function renderFaturas() {
  const invs=(S.invoices||[]).slice().reverse();
  return `
  <div class="card"><div class="eyebrow">Gasto real este mês</div><h2 style="margin:0;">${fmt(monthSpend())}</h2></div>
  <div class="card">
    <input type="file" accept="image/*" capture="environment" id="invoice-file" style="display:none;">
    <button class="btn block" id="invoice-scan-btn">📸 Digitalizar fatura</button>
    <div id="invoice-status" class="muted" style="margin-top:8px;"></div>
  </div>
  ${S._invoiceDraft?renderInvoiceDraft():''}
  <div class="section-title">Histórico</div>
  ${invs.length===0?'<div class="empty"><span class="ic">🧾</span>Sem faturas.</div>'
  :invs.map(inv=>`<div class="card"><div class="row between"><span style="font-weight:700;">${STORES[inv.store]||inv.store} · ${inv.date}</span><span class="mono">${fmt(inv.total)}</span></div><div class="muted">${inv.items.length} item(ns)</div></div>`).join('')}`;
}

function renderInvoiceDraft() {
  const d=S._invoiceDraft;
  return `<div class="card highlight">
    <h3 style="margin-bottom:10px;">Confirma os itens lidos</h3>
    <div class="g2" style="margin-bottom:8px;">
      <div><label>Loja</label><select id="draft-store">${Object.keys(STORES).map(s=>`<option value="${s}" ${d.store===s?'selected':''}>${STORES[s]}</option>`).join('')}</select></div>
      <div><label>Data</label><input type="date" id="draft-date" value="${d.date}"></div>
    </div>
    ${d.items.map((it,i)=>`<div class="ing-row"><input type="text" data-di="${i}" data-df="name" value="${it.name}"><input type="number" step="0.01" data-di="${i}" data-df="price" value="${it.price}"><span class="muted" style="font-size:11px;">/kg</span><button class="x-btn" data-dirm="${i}">✕</button></div>`).join('')}
    <button class="btn sm ghost" id="draft-add" style="margin:6px 0;">+ item</button>
    <div class="row between" style="margin-top:8px;">
      <button class="btn sm ghost" id="draft-cancel">Cancelar</button>
      <button class="btn sm" id="draft-save">💾 Guardar fatura</button>
    </div>
  </div>`;
}

function renderInspiracoes() {
  const list=(S.inspirations||[]).slice().reverse();
  return `
  <div class="card">
    <div class="field"><label>Link ou descrição</label><input type="url" id="insp-url" placeholder="https://instagram.com/p/…"></div>
    <div class="field"><label>Notas</label><input type="text" id="insp-notes" placeholder="ex: wrap de frango com molho de iogurte"></div>
    <button class="btn block olive" id="insp-save">📌 Guardar inspiração</button>
  </div>
  ${list.length===0?'<div class="empty"><span class="ic">📌</span>Sem inspirações ainda.</div>'
  :list.map(insp=>`<div class="insp-card">
    <div class="row between">
      <span style="font-weight:700;flex:1;">${insp.notes||'(sem notas)'}</span>
      <span class="muted" style="font-size:11px;flex-shrink:0;">${insp.date}</span>
    </div>
    ${insp.url?`<a href="${insp.url}" target="_blank" style="color:var(--teal);font-size:12px;word-break:break-all;">${insp.url}</a>`:''}
    ${insp.recipeCreated?'<span class="tag" style="margin-top:6px;display:inline-block;">✅ Receita criada</span>':''}
    <div class="row" style="margin-top:8px;gap:6px;">
      ${!insp.recipeCreated?`<button class="btn sm olive" data-insp2r="${insp.id}">🍽️ Criar receita</button>`:''}
      <button class="x-btn" data-insprm="${insp.id}">✕</button>
    </div>
  </div>`).join('')}`;
}

function bindMore() {
  document.querySelectorAll('[data-mtab]').forEach(b=>b.onclick=()=>{ S.moreTab=b.dataset.mtab; render(); });
  // Freezer
  document.querySelectorAll('[data-fr]').forEach(b=>b.onclick=()=>{ const f=S.freezer.find(x=>x.id===b.dataset.fr),adj=parseInt(b.dataset.adj); if(f) f.qty=Math.max(0,f.qty+adj); save(); render(); });
  document.querySelectorAll('[data-frrm]').forEach(b=>b.onclick=()=>{ const i=S.freezer.findIndex(f=>f.id===b.dataset.frrm); if(i>-1) S.freezer.splice(i,1); save(); render(); });
  const af=document.getElementById('add-freezer'); if(af) af.onclick=()=>{ const n=prompt('Nome:'); if(!n) return; S.freezer.push({id:'f_'+Date.now(),name:n.trim(),qty:1,unit:'porções'}); save(); render(); };
  // Checklist
  document.querySelectorAll('[data-chk]').forEach(el=>el.onchange=()=>{ const c=S.checklist.find(c=>c.id===el.dataset.chk); if(c) c.done=el.checked; save(); render(); });
  document.querySelectorAll('[data-chkrm]').forEach(b=>b.onclick=()=>{ const i=S.checklist.findIndex(c=>c.id===b.dataset.chkrm); if(i>-1) S.checklist.splice(i,1); save(); render(); });
  const ca=document.getElementById('chk-add'); if(ca) ca.onclick=()=>{ const t=prompt('Novo item:'); if(!t) return; S.checklist.push({id:'c_'+Date.now(),text:t.trim(),done:false}); save(); render(); };
  const cr=document.getElementById('chk-reset'); if(cr) cr.onclick=()=>{ S.checklist.forEach(c=>c.done=false); save(); render(); toast('Checklist reiniciada'); };
  // Preços
  const ps=document.getElementById('price-search'); if(ps) ps.oninput=()=>{ S._priceQ=ps.value; render(); };
  document.querySelectorAll('[data-pstore]').forEach(el=>el.onchange=()=>{
    const ing=S.ingredients.find(i=>i.id===el.dataset.pstore); if(!ing) return;
    if(!ing.prices) ing.prices={};
    const v=el.value===''?null:parseFloat(el.value)||0;
    ing.prices[el.dataset.ps]=v;
    if(v&&v>0){ if(!S.priceHistory) S.priceHistory={}; const k=ing.name.toLowerCase(); if(!S.priceHistory[k]) S.priceHistory[k]=[]; S.priceHistory[k].push({date:new Date().toISOString().slice(0,10),store:el.dataset.ps,price:v}); }
    save();
  });
  // Batch
  const pl=document.getElementById('print-labels'); if(pl) pl.onclick=()=>{ const w=window.open('','_blank'); w.document.write('<html><head><title>Etiquetas</title></head><body style="font-family:sans-serif;">'+document.getElementById('labels-wrap').innerHTML+'</body></html>'); w.document.close(); w.print(); };
  // Faturas
  const isb=document.getElementById('invoice-scan-btn'),ifile=document.getElementById('invoice-file');
  if(isb&&ifile){
    isb.onclick=()=>ifile.click();
    ifile.onchange=async()=>{
      const file=ifile.files[0]; if(!file) return;
      const statusEl=document.getElementById('invoice-status'); statusEl.textContent='⏳ A ler a fatura…';
      try{
        const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(file);});
        const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:file.type||'image/jpeg',data:b64}},{type:'text',text:'Fatura de supermercado português. Extrai loja (lidl/continente/mercadona/pingodoce/aldi) e lista de itens com nome e preço por kg/l/unid. Responde APENAS JSON sem markdown: {"store":"lidl","items":[{"name":"Frango","price":6.49}]}'}]}]})});
        const data=await resp.json();
        const text=(data.content||[]).map(b=>b.text||'').join('').replace(/```json|```/g,'').trim();
        const parsed=JSON.parse(text);
        S._invoiceDraft={store:parsed.store||'lidl',date:new Date().toISOString().slice(0,10),items:(parsed.items||[]).map(i=>({name:i.name,price:parseFloat(i.price)||0}))};
        statusEl.textContent=''; save(); render();
      }catch(e){ document.getElementById('invoice-status').textContent='⚠️ Não consegui ler. Adiciona os preços manualmente em Preços.'; }
    };
  }
  document.querySelectorAll('[data-di]').forEach(el=>el.oninput=()=>{ if(S._invoiceDraft){ const it=S._invoiceDraft.items[parseInt(el.dataset.di)]; if(it) it[el.dataset.df]=el.dataset.df==='price'?parseFloat(el.value)||0:el.value; } });
  document.querySelectorAll('[data-dirm]').forEach(b=>b.onclick=()=>{ if(S._invoiceDraft){ S._invoiceDraft.items.splice(parseInt(b.dataset.dirm),1); render(); } });
  const dad=document.getElementById('draft-add'); if(dad) dad.onclick=()=>{ if(S._invoiceDraft){ S._invoiceDraft.items.push({name:'',price:0}); render(); } };
  const dc=document.getElementById('draft-cancel'); if(dc) dc.onclick=()=>{ S._invoiceDraft=null; save(); render(); };
  const dds=document.getElementById('draft-store'); if(dds) dds.onchange=()=>{ if(S._invoiceDraft) S._invoiceDraft.store=dds.value; };
  const ddd=document.getElementById('draft-date'); if(ddd) ddd.onchange=()=>{ if(S._invoiceDraft) S._invoiceDraft.date=ddd.value; };
  const dsv=document.getElementById('draft-save'); if(dsv) dsv.onclick=()=>{
    const d=S._invoiceDraft; if(!d) return;
    const items=d.items.filter(i=>i.name.trim()), total=items.reduce((s,i)=>s+i.price,0);
    items.forEach(i=>{ const ing=S.ingredients.find(x=>x.name.toLowerCase()===i.name.toLowerCase()); if(ing){ if(!ing.prices) ing.prices={}; ing.prices[d.store]=i.price; } });
    S.invoices=S.invoices||[]; S.invoices.push({date:d.date,store:d.store,items,total});
    S._invoiceDraft=null; save(); toast('Fatura guardada ✓'); render();
  };
  // Inspirações
  const isave=document.getElementById('insp-save'); if(isave) isave.onclick=()=>{
    const url=(document.getElementById('insp-url')||{}).value?.trim()||'';
    const notes=(document.getElementById('insp-notes')||{}).value?.trim()||'';
    if(!url&&!notes){ toast('Adiciona um link ou uma nota'); return; }
    S.inspirations=S.inspirations||[];
    S.inspirations.push({id:'insp_'+Date.now(),url,notes,date:new Date().toISOString().slice(0,10),recipeCreated:false});
    save(); toast('Inspiração guardada ✓'); render();
  };
  document.querySelectorAll('[data-insprm]').forEach(b=>b.onclick=()=>{ const i=S.inspirations.findIndex(x=>x.id===b.dataset.insprm); if(i>-1) S.inspirations.splice(i,1); save(); render(); });
  document.querySelectorAll('[data-insp2r]').forEach(b=>b.onclick=()=>{
    const insp=S.inspirations.find(x=>x.id===b.dataset.insp2r);
    S.tab='recipes'; render();
    openRecipeModal(S.recipesTab, insp, null);
  });
}

/* ===================== MODAL RECEITA (criar + editar) ===================== */
let _modalIngs=[], _editingId=null, _editingKind=null;

function openRecipeModal(kind, prefill, existing) {
  _editingId   = existing?existing.id:null;
  _editingKind = kind;
  _modalIngs   = existing?existing.ings.map(i=>({...i})):[{name:'',qty:0,unit:'kg',cat:'horti'}];
  const isEdit = !!existing;
  const bg=document.createElement('div'); bg.className='modal-bg'; bg.id='recipe-modal';
  bg.innerHTML=`<div class="modal">
    <button class="modal-close" id="modal-x">✕</button>
    <h2 style="margin-bottom:14px;">${isEdit?'Editar receita':kind==='lunch'?'Nova receita de marmita':'Nova ideia de jantar'}</h2>
    ${prefill?`<div class="muted" style="margin-bottom:8px;">📌 ${prefill.notes||prefill.url}</div>`:''}
    <div class="field"><label>Nome</label><input type="text" id="m-name" value="${existing?existing.name:prefill?(prefill.notes||''):''}"></div>
    ${kind==='lunch'
      ?`<div class="field"><label>Categoria</label><select id="m-cat">${Object.keys(CATS).map(c=>`<option value="${c}" ${existing&&existing.cat===c?'selected':''}>${CATS[c]}</option>`).join('')}</select></div>`
      :`<div class="field"><label>Tipo</label><select id="m-type">${Object.keys(DTYPES).map(t=>`<option value="${t}" ${existing&&existing.type===t?'selected':''}>${DTYPES[t]}</option>`).join('')}</select></div>`}
    <div class="g3">
      <div class="field"><label>Congela?</label><select id="m-freeze"><option value="1" ${existing&&existing.freezes?'selected':''}>Sim</option><option value="0" ${existing&&!existing.freezes?'selected':''}>Não</option></select></div>
      <div class="field"><label>Prep (min)</label><input type="number" id="m-prep" value="${existing?existing.prep:15}"></div>
      <div class="field"><label>Dificuldade</label><select id="m-diff">${['fácil','médio','difícil'].map(d=>`<option ${existing&&existing.diff===d?'selected':''}>${d}</option>`).join('')}</select></div>
    </div>
    ${kind==='lunch'?`<div class="g2"><div class="field"><label>Forno (min)</label><input type="number" id="m-oven" value="${existing?existing.oven||0:0}"></div><div class="field"><label>Pressão (min)</label><input type="number" id="m-press" value="${existing?existing.pressure||0:0}"></div></div>`:''}
    <div class="field"><label>Porções</label><input type="number" id="m-serv" value="${existing?existing.servings:kind==='lunch'?4:3}"></div>
    <div class="field"><label>Ingredientes</label><div id="m-ings"></div><button class="btn sm ghost" id="m-add-ing">+ ingrediente</button></div>
    <button class="btn block" id="m-save" style="margin-top:10px;">💾 ${isEdit?'Guardar alterações':'Guardar receita'}</button>
  </div>`;
  document.body.appendChild(bg);
  renderModalIngs();
  document.getElementById('modal-x').onclick=()=>bg.remove();
  document.getElementById('m-add-ing').onclick=()=>{ _modalIngs.push({name:'',qty:0,unit:'kg',cat:'horti'}); renderModalIngs(); };
  document.getElementById('m-save').onclick=()=>saveRecipeModal(kind,bg,prefill);
}

function renderModalIngs() {
  const c=document.getElementById('m-ings'); if(!c) return;
  c.innerHTML=_modalIngs.map((ing,i)=>`<div class="ing-row">
    <input type="text" list="ing-list" placeholder="nome" value="${ing.name}" data-mi="${i}" data-mf="name">
    <input type="number" step="0.01" placeholder="qtd" value="${ing.qty||''}" data-mi="${i}" data-mf="qty">
    <select data-mi="${i}" data-mf="unit">${['kg','l','unid'].map(u=>`<option ${ing.unit===u?'selected':''}>${u}</option>`).join('')}</select>
    <button class="x-btn" data-mirm="${i}">✕</button>
  </div>`).join('')
  +`<datalist id="ing-list">${S.ingredients.map(i=>`<option value="${i.name}">`).join('')}</datalist>`;
  c.querySelectorAll('[data-mi]').forEach(el=>{ el.oninput=el.onchange=()=>{ const i=parseInt(el.dataset.mi),f=el.dataset.mf; _modalIngs[i][f]=f==='qty'?parseFloat(el.value)||0:el.value; }; });
  c.querySelectorAll('[data-mirm]').forEach(b=>b.onclick=()=>{ _modalIngs.splice(parseInt(b.dataset.mirm),1); renderModalIngs(); });
}

function saveRecipeModal(kind, bg, prefill) {
  const name=document.getElementById('m-name').value.trim();
  if(!name){ toast('Dá um nome à receita'); return; }
  const ings=_modalIngs.filter(i=>i.name.trim());
  const base={
    id: _editingId || (kind==='lunch'?'rc_':'dc_')+Date.now(),
    name,
    freezes: document.getElementById('m-freeze').value==='1',
    prep: parseInt(document.getElementById('m-prep').value)||0,
    diff: document.getElementById('m-diff').value,
    servings: parseInt(document.getElementById('m-serv').value)||1,
    season: _editingId?(kind==='lunch'?findRecipe(_editingId):findDinner(_editingId))?.season||'todo':'todo',
    fav: _editingId?(kind==='lunch'?findRecipe(_editingId):findDinner(_editingId))?.fav||false:false,
    ings
  };
  if(kind==='lunch'){
    Object.assign(base,{cat:document.getElementById('m-cat').value, oven:parseInt(document.getElementById('m-oven').value)||0, pressure:parseInt(document.getElementById('m-press').value)||0});
    if(_editingId){ const idx=S.recipes.findIndex(r=>r.id===_editingId); if(idx>-1) S.recipes[idx]=base; else S.recipes.push(base); }
    else S.recipes.push(base);
  } else {
    Object.assign(base,{type:document.getElementById('m-type').value});
    if(_editingId){ const idx=S.dinners.findIndex(d=>d.id===_editingId); if(idx>-1) S.dinners[idx]=base; else S.dinners.push(base); }
    else S.dinners.push(base);
  }
  // marcar inspiração como criada
  if(prefill){ const insp=S.inspirations.find(x=>x.id===prefill.id); if(insp) insp.recipeCreated=true; }
  _editingId=null; _editingKind=null;
  save(); bg.remove(); toast(_editingId?'Receita atualizada ✓':'Receita guardada ✓'); render();
}

function openExtraModal() {
  const bg=document.createElement('div'); bg.className='modal-bg';
  bg.innerHTML=`<div class="modal"><button class="modal-close" id="extra-x">✕</button>
    <h2>Adicionar item à lista</h2>
    <div class="field"><label>Nome</label><input type="text" id="ex-name"></div>
    <div class="g2"><div class="field"><label>Quantidade</label><input type="number" step="0.1" id="ex-qty" value="1"></div>
    <div class="field"><label>Unidade</label><select id="ex-unit"><option>unid</option><option>kg</option><option>l</option></select></div></div>
    <div class="field"><label>Categoria</label><select id="ex-cat">${Object.keys(ICAT).map(c=>`<option value="${c}">${ICAT[c]}</option>`).join('')}</select></div>
    <button class="btn block" id="ex-save">Adicionar</button>
  </div>`;
  document.body.appendChild(bg);
  document.getElementById('extra-x').onclick=()=>bg.remove();
  document.getElementById('ex-save').onclick=()=>{
    const name=(document.getElementById('ex-name').value||'').trim(); if(!name){toast('Dá um nome');return;}
    S.pantry.push({id:'px_'+Date.now(),name,cat:document.getElementById('ex-cat').value,checked:true});
    save(); bg.remove(); toast('Item adicionado ✓'); render();
  };
}

/* ===================== NAV + RENDER ===================== */
const TABS=[{id:'dashboard',ic:'📊',lb:'Painel'},{id:'menu',ic:'🗓️',lb:'Cardápio'},{id:'recipes',ic:'📖',lb:'Receitas'},{id:'shopping',ic:'🛒',lb:'Lista'},{id:'more',ic:'☰',lb:'Mais'}];

function renderNav() {
  document.getElementById('nav').innerHTML=TABS.map(t=>`<button data-tab="${t.id}" class="${S.tab===t.id?'active':''}"><span class="ic">${t.ic}</span>${t.lb}</button>`).join('');
  document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{ S.tab=b.dataset.tab; save(); render(); });
}

function render() {
  document.getElementById('topsub').textContent=({dashboard:'Painel',menu:'Cardápio',recipes:'Receitas',shopping:'Lista de compras',more:'Mais'})[S.tab]||'';
  document.getElementById('week-badge').textContent='Semana '+S.currentWeek;
  const c=document.getElementById('content');
  const views={dashboard:renderDashboard,menu:renderMenu,recipes:renderRecipes,shopping:renderShopping,more:renderMore};
  c.innerHTML=(views[S.tab]||renderDashboard)();
  const binds={dashboard:bindDashboard,menu:bindMenu,recipes:bindRecipes,shopping:bindShopping,more:bindMore};
  (binds[S.tab]||bindDashboard)();
  renderNav();
  // scroll sempre ao topo ao mudar de tab
  c.scrollTop=0;
}

/* ===================== INIT ===================== */
async function init() {
  try {
    // CORRIGIDO: paths relativos correctos para a pasta data/
    const [rData, iData] = await Promise.all([
      fetch('./data/recipes.json').then(r=>{ if(!r.ok) throw new Error('recipes.json: '+r.status); return r.json(); }),
      fetch('./data/ingredients.json').then(r=>{ if(!r.ok) throw new Error('ingredients.json: '+r.status); return r.json(); })
    ]);
    APP = { recipes:rData, ingredients:iData };
    const saved = Storage.load();
    S = saved ? mergeState(saved, defaultState(APP)) : defaultState(APP);
    if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
    document.getElementById('content').innerHTML='';
    render();
  } catch(err) {
    console.error(err);
    document.getElementById('content').innerHTML=`
      <div class="card warn">
        <h3>Erro ao iniciar</h3>
        <div class="muted">${err.message}</div>
        <pre style="white-space:pre-wrap;font-size:11px;margin-top:8px;color:#600;">${err.stack||''}</pre>
      </div>`;
  }
}

init();
