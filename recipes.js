/* recipes.js */
const CATS = { bovina:'Carne Bovina', frango:'Frango', peixe:'Peixe', porco:'Porco', peru:'Peru', veg:'Vegetariana' };
const DTYPES = { wrap:'Wraps', tosta:'Tostas', burger:'Hambúrguer', sopa:'Sopas', omelete:'Omeletes' };
const STORES = { lidl:'Lidl', continente:'Continente', mercadona:'Mercadona', pingodoce:'Pingo Doce', aldi:'Aldi' };
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

/* ---- Preços ---- */
function bestPrice(name, ingredients) {
  const key = name.toLowerCase().trim();
  const ing = ingredients.find(i => i.name.toLowerCase() === key);
  if (!ing || !ing.prices) return null;
  const vals = Object.values(ing.prices).filter(v => v !== null && v > 0);
  return vals.length ? Math.min(...vals) : null;
}

function cheapestStore(name, ingredients) {
  const key = name.toLowerCase().trim();
  const ing = ingredients.find(i => i.name.toLowerCase() === key);
  if (!ing || !ing.prices) return null;
  let best = null, bestS = null;
  Object.entries(ing.prices).forEach(([s, v]) => {
    if (v && v > 0 && (best === null || v < best)) { best = v; bestS = s; }
  });
  return bestS;
}

function ingCost(ing, ingredients) {
  const p = bestPrice(ing.name, ingredients);
  return p !== null ? p * ing.qty : 0;
}

function recipeCost(recipe, ingredients) {
  return recipe.ings.reduce((s, i) => s + ingCost(i, ingredients), 0);
}

function recipeCostPerServing(recipe, ingredients) {
  return recipeCost(recipe, ingredients) / Math.max(1, recipe.servings);
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
function fmtMin(min) {
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  return h > 0 ? `${h}h${String(m).padStart(2,'0')}` : `${m}min`;
}

function renderRecipeCard(r, ingredients, opts = {}) {
  const cost = recipeCostPerServing(r, ingredients);
  const catKey = r.cat || '';
  return `
  <div class="recipe-card">
    <div class="row between">
      <span class="name">${r.name}</span>
      <div class="row" style="gap:5px;">
        <button class="x-btn" style="color:${r.fav?'#E3A23B':'#c8c2a4'}; font-size:19px;"
          data-fav="${r.id}" data-kind="${opts.kind||'lunch'}">★</button>
        ${r.cat ? `<span class="tag cat-${catKey}">${(CATS[catKey]||DTYPES[r.type]||'')}</span>` : ''}
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
    <div class="row" style="margin-top:9px; gap:6px;">
      <button class="btn sm olive" data-add="${r.id}" data-kind="${opts.kind||'lunch'}">+ Adicionar à semana</button>
    </div>
  </div>`;
}
