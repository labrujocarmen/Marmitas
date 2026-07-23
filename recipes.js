/* recipes.js - Versão Simplificada (Sem preços por ingrediente) */
const CATS = { bovina:'Carne Bovina', frango:'Frango', peixe:'Peixe', porco:'Porco', peru:'Peru', veg:'Vegetariana' };
const DTYPES = { wrap:'Wraps', tosta:'Tostas', burger:'Hambúrguer', sopa:'Sopas', omelete:'Omeletes' };
const SEASONS = { todo:'Todo o ano', primavera:'Primavera', verao:'Verão', outono:'Outono', inverno:'Inverno' };
const ICAT = {
  carnes:'🥩 Carnes', horti:'🥦 Hortifrúti', desp:'🗄️ Despensa',
  lacti:'🥛 Laticínios', limp:'🧽 Limpeza', congelados:'🧊 Congelados',
  molhos:'🧂 Molhos/Temperos', bebidas:'🥤 Bebidas', graos:'🌾 Grãos/Farinha',
  paes:'🍞 Pães/Biscoitos', gato:'🐱 Gato', enlatados:'🥫 Enlatados'
};

function currentSeason() {
  const m = new Date().getMonth() + 1;
  if ([12,1,2].includes(m)) return 'inverno';
  if ([3,4,5].includes(m)) return 'primavera';
  if ([6,7,8].includes(m)) return 'verao';
  return 'outono';
}

/* ---- Gerador automático ---- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function recentIds(weeks, currentWeek, field, lookback) {
  const used = new Set();
  for (let w = currentWeek - 1; w >= Math.max(1, currentWeek - lookback); w--) {
    const wk = weeks[w]; if (!wk) continue;
    if (field === 'lunches') wk.lunches.forEach(l => used.add(l.id));
    else wk.dinners.forEach(id => used.add(id));
  }
  return used;
}

function generateLunches(recipes, weeks, currentWeek, need) {
  const used = recentIds(weeks, currentWeek, 'lunches', 3);
  const cats = Object.keys(CATS);
  let pool = shuffle(recipes);
  pool.sort((a, b) => ((used.has(a.id)?2:0)+(a.fav?0:1)) - ((used.has(b.id)?2:0)+(b.fav?0:1)));
  const chosen = [], usedCats = new Set();
  for (const r of pool) {
    if (chosen.length >= 4) break;
    if (usedCats.has(r.cat) && usedCats.size < cats.length) continue;
    chosen.push(r); usedCats.add(r.cat);
  }
  while (chosen.length < 2 && chosen.length < pool.length) {
    const r = pool.find(p => !chosen.includes(p)); if (r) chosen.push(r); else break;
  }
  return chosen.map(r => ({ id: r.id, batches: Math.max(1, Math.ceil(need / chosen.length / r.servings)) }));
}

function generateDinners(dinners, weeks, currentWeek, count) {
  const used = recentIds(weeks, currentWeek, 'dinners', 3);
  const types = Object.keys(DTYPES);
  let pool = shuffle(dinners);
  pool.sort((a, b) => ((used.has(a.id)?2:0)+(a.fav?0:1)) - ((used.has(b.id)?2:0)+(b.fav?0:1)));
  const chosen = [], usedTypes = new Set();
  for (const d of pool) {
    if (chosen.length >= count) break;
    if (usedTypes.has(d.type) && usedTypes.size < types.length && chosen.length < types.length) continue;
    chosen.push(d); usedTypes.add(d.type);
  }
  while (chosen.length < count) {
    const d = pool.find(p => !chosen.includes(p)); if (d) chosen.push(d); else break;
  }
  return chosen.slice(0, count).map(d => d.id);
}

/* ---- Render helpers ---- */
function fmt(n) { return '€' + (Math.round(n * 100) / 100).toFixed(2); }

function renderRecipeCard(r, opts = {}) {
  const catKey = r.cat || '';
  const volumeTag = r.volume ? `<span class="tag" style="background:#6c757d; color:#fff; font-size:11px; padding:2px 6px; border-radius:4px;">📚 Vol. ${r.volume}</span>` : '';
  const bimbyBadge = r.bimby ? `<span class="tag" style="background:#20c997; color:#fff; font-size:11px; padding:2px 6px; border-radius:4px;">🤖 Bimby</span>` : '';
  const airfryerBadge = r.airfryer ? `<span class="tag" style="background:#fd7e14; color:#fff; font-size:11px; padding:2px 6px; border-radius:4px;">🍟 Airfryer</span>` : '';
  
  return `
  <div class="recipe-card" style="border-left: 4px solid #007bff; margin-bottom: 12px; background:#fff; padding:15px; border-radius:8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <div class="row between" style="display:flex; justify-content:space-between; align-items:center;">
      <span class="name" style="font-weight:bold; font-size:16px; color:#333;">${r.name}</span>
      <div class="row" style="display:flex; gap:5px; align-items:center;">
        <button class="x-btn" style="background:none; border:none; cursor:pointer; color:${r.fav?'#E3A23B':'#c8c2a4'}; font-size:19px;"
          data-fav="${r.id}" data-kind="${opts.kind||'lunch'}">★</button>
        ${r.cat ? `<span class="tag" style="background:#e9ecef; padding:2px 6px; border-radius:4px; font-size:11px;">${(CATS[catKey]||DTYPES[r.type]||'')}</span>` : ''}
      </div>
    </div>
    
    <div class="tags-row" style="margin-top:8px; display:flex; flex-wrap:wrap; gap:6px;">
      ${volumeTag}
      <span class="tag" style="background:#e2f0d9; font-size:11px; padding:2px 6px; border-radius:4px;">${r.freezes?'❄️ Congela':'🚫 Consumir fresco'}</span>
      <span class="tag" style="background:#f8f9fa; font-size:11px; padding:2px 6px; border-radius:4px;">⏱️ ${r.prep || 0}min</span>
      ${r.calories ? `<span class="tag" style="background:#fff3cd; font-size:11px; padding:2px 6px; border-radius:4px;">🔥 ${r.calories} kcal</span>` : ''}
      ${r.protein ? `<span class="tag" style="background:#d1ecf1; font-size:11px; padding:2px 6px; border-radius:4px;">💪 P: ${r.protein}g</span>` : ''}
      ${bimbyBadge} ${airfryerBadge}
    </div>

    <div class="recipe-details-drawer" id="drawer-${r.id}" style="background:#f8f9fa; padding:12px; font-size:13px; margin-top:10px; border-radius:6px; display:none; border: 1px solid #eee;">
      ${r.bimby ? `<p style="margin:4px 0;"><b>🤖 Modo Bimby:</b> ${r.bimby}</p>` : ''}
      ${r.airfryer ? `<p style="margin:4px 0;"><b>🍟 Modo Airfryer:</b> ${r.airfryer}</p>` : ''}
      ${r.ingredients && r.ingredients.length ? `<p style="margin:4px 0;"><b>🛒 Ingredientes:</b> ${r.ingredients.map(i => `${i.name} (${i.qty}${i.unit})`).join(', ')}</p>` : ''}
      ${r.steps ? `<p style="margin:4px 0; color:#555;"><b>👩‍🍳 Passo a Passo:</b> ${r.steps}</p>` : ''}
    </div>

    <div class="row" style="margin-top:12px; display:flex; justify-content: space-between;">
      <button class="btn sm olive" data-add="${r.id}" data-kind="${opts.kind||'lunch'}" style="background:#28a745; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">+ Adicionar à semana</button>
      <button class="btn sm" style="background:#f0f0f0; color:#333; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" onclick="const el=document.getElementById('drawer-${r.id}'); el.style.display = el.style.display === 'none' ? 'block' : 'none'">📖 Ver Detalhes</button>
    </div>
  </div>`;
}
