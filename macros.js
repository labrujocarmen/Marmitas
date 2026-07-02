/* macros.js — cálculo de macronutrientes estimados por receita */
const MACRO_DB = {
  // por 100g de produto cru
  'peito de frango':    { prot:31, carb:0,  fat:3.6, kcal:165 },
  'carne picada bovina':{ prot:26, carb:0,  fat:15,  kcal:250 },
  'carne bovina':       { prot:26, carb:0,  fat:15,  kcal:250 },
  'lombo de porco':     { prot:27, carb:0,  fat:6,   kcal:165 },
  'peito de peru':      { prot:29, carb:0,  fat:1,   kcal:135 },
  'salmão':             { prot:25, carb:0,  fat:13,  kcal:208 },
  'pescada (filetes)':  { prot:20, carb:0,  fat:1.5, kcal:92  },
  'bacalhau desfiado':  { prot:29, carb:0,  fat:0.5, kcal:120 },
  'atum fresco':        { prot:30, carb:0,  fat:1,   kcal:130 },
  'ovo':                { prot:13, carb:1,  fat:11,  kcal:155 }, // por 100g
  'batata':             { prot:2,  carb:17, fat:0.1, kcal:77  },
  'batata-doce':        { prot:1.6,carb:20, fat:0.1, kcal:86  },
  'arroz':              { prot:2.7,carb:28, fat:0.3, kcal:130 },
  'massa':              { prot:5,  carb:25, fat:0.9, kcal:131 },
  'esparguete':         { prot:5,  carb:25, fat:0.9, kcal:131 },
  'grão-de-bico cozido':{ prot:9,  carb:27, fat:3,   kcal:164 },
  'lentilhas cozidas':  { prot:9,  carb:20, fat:0.4, kcal:116 },
  'quinoa':             { prot:14, carb:64, fat:6,   kcal:368 },
  'queijo ralado':      { prot:25, carb:1,  fat:33,  kcal:400 },
  'natas':              { prot:2,  carb:3,  fat:35,  kcal:337 },
  'leite':              { prot:3.4,carb:5,  fat:3.6, kcal:65  },
};

function calcMacros(recipe) {
  let prot=0, carb=0, fat=0, kcal=0;
  recipe.ings.forEach(ing => {
    const key = ing.name.toLowerCase();
    const db = MACRO_DB[key];
    if (!db) return;
    // qty em kg → gramas
    const g = ing.unit === 'kg' ? ing.qty * 1000 : ing.unit === 'l' ? ing.qty * 1000 : ing.qty * 60;
    prot += db.prot * g / 100;
    carb += db.carb * g / 100;
    fat  += db.fat  * g / 100;
    kcal += db.kcal * g / 100;
  });
  const serv = Math.max(1, recipe.servings);
  return { prot: Math.round(prot/serv), carb: Math.round(carb/serv), fat: Math.round(fat/serv), kcal: Math.round(kcal/serv) };
}

function renderMacroBar(label, val, max, color) {
  const pct = Math.round(Math.min(100, (val/Math.max(1,max))*100));
  return `<div class="macro-bar">
    <span class="name">${label}</span>
    <div class="bg"><div class="fill" style="width:${pct}%;background:${color};"></div></div>
    <span class="val mono">${val}g</span>
  </div>`;
}

function renderMacrosPanel() {
  if (!S || !curWeek) return '';
  const items = curWeek().lunches.map(l => {
    const r = findRecipe(l.id); return r ? {...r, batches:l.batches} : null;
  }).filter(Boolean);
  if (!items.length) return '<div class="empty"><span class="ic">🧬</span>Sem receitas no cardápio.</div>';
  const totals = { prot:0, carb:0, fat:0, kcal:0 };
  const cards = items.map(r => {
    const m = calcMacros(r);
    totals.prot += m.prot; totals.carb += m.carb; totals.fat += m.fat; totals.kcal += m.kcal;
    return `<div class="card"><div style="font-weight:700;font-size:13.5px;margin-bottom:8px;">${r.name}</div>
      ${renderMacroBar('Proteína', m.prot, 50, 'var(--terracotta)')}
      ${renderMacroBar('Carb', m.carb, 80, 'var(--gold)')}
      ${renderMacroBar('Gordura', m.fat, 30, 'var(--teal)')}
      <div class="muted" style="font-size:12px;margin-top:4px;">🔥 ${m.kcal} kcal / porção</div>
    </div>`;
  }).join('');
  const target = S.settings.proteinPerPerson;
  return `
  <div class="card">
    <h3>Totais médios por marmita</h3>
    ${renderMacroBar('Proteína', totals.prot/items.length|0, target, 'var(--terracotta)')}
    ${renderMacroBar('Carb', totals.carb/items.length|0, 100, 'var(--gold)')}
    ${renderMacroBar('Gordura', totals.fat/items.length|0, 40, 'var(--teal)')}
    <div class="muted" style="margin-top:4px;">Meta proteína: ${target}g/pessoa · ${target<(totals.prot/items.length|0)?'✅ atingida':'⚠️ abaixo da meta'}</div>
  </div>
  ${cards}`;
}
