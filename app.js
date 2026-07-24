/* app.js — PARTE 1 ATUALIZADA (Ingredientes e Passos Completos) */
'use strict';

const DEFAULT_RECIPES = [
  { id: 'f_desfiado', name: 'Frango desfiado tradicional', cat: 'Almoço/Marmita', bimby: 'Programe 5 seg/Vel 4 Invertida para desfiar o frango cozido.', airfryer: '', calories: 280, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Sal, Água', steps: 'Cozinhe o frango e desfie.' },
  { id: 'f_mexicano', name: 'Frango mexicano', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Pimentões coloridos, Milho, Cebola', steps: 'Refogue tudo junto.' },
];

let S = null;
let saveTimer = null;
/* app.js — PARTE 2 (Metade A) */
const EXTRA_RECIPES = [
  { id: 'm_feij_1', name: 'Frango grelhado + arroz + feijão preto + brócolos', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: 'Grelhe o frango a 180°C por 12 min.', isSuggestion: true },
];

/* app.js — PARTE 3 */
function getInitialPantry() {
  const list = [
    { name: 'Bife', cat: 'CARNE' }, { name: 'Costeletas de porco', cat: 'CARNE' }, { name: 'Hambúrguer', cat: 'CARNE' }, { name: 'Camarão', cat: 'CARNE' }, { name: 'Linguiça', cat: 'CARNE' },
    { name: 'Kiwi', cat: 'LEGUMES e FRUTAS' }, { name: 'Limão', cat: 'LEGUMES e FRUTAS' }, { name: 'Morango congelado', cat: 'LEGUMES e FRUTAS' }, { name: 'Melancia', cat: 'LEGUMES e FRUTAS' },
    { name: 'Queijo ralado', cat: 'LATICÍNIOS' }, { name: 'Queijo camembert', cat: 'LATICÍNIOS' }, { name: 'Requeijão', cat: 'LATICÍNIOS' }, { name: 'Queijo para a quiche', cat: 'LATICÍNIOS' },
    { name: 'Desingordurante', cat: 'LIMPEZA' }, { name: 'Desentupidor', cat: 'LIMPEZA' }, { name: 'Sabão lavar roupa', cat: 'LIMPEZA' }, { name: 'Lixívia', cat: 'LIMPEZA' },
    { name: 'Massa de pizza', cat: 'CONGELADOS' }, { name: 'Batata congelada', cat: 'CONGELADOS' },
    { name: 'Molho barbecue', cat: 'MOLHOS e TEMPEROS' }, { name: 'Azeite', cat: 'MOLHOS e TEMPEROS' }, { name: 'Alho em pó', cat: 'MOLHOS e TEMPEROS' }, { name: 'Cebola em pó', cat: 'MOLHOS e TEMPEROS' },
    { name: 'Cerveja', cat: 'BEBIDAS' }, { name: 'Água', cat: 'BEBIDAS' }, { name: 'Água das pedras', cat: 'BEBIDAS' }, { name: 'Refri', cat: 'BEBIDAS' },
    { name: 'Fubá', cat: 'GRÃOS E FARINHA' }, { name: 'Feijão', cat: 'GRÃOS E FARINHA' }, { name: 'Macarrão', cat: 'GRÃOS E FARINHA' }, { name: 'Arroz', cat: 'GRÃOS E FARINHA' },
    { name: 'Wrap', cat: 'PÃES E BISCOITOS' }, { name: 'Pão Rustik', cat: 'PÃES E BISCOITOS' }, { name: 'Biscoito maria', cat: 'PÃES E BISCOITOS' },
    { name: 'Saco areia gato', cat: 'GATO' }, { name: 'Areia gato', cat: 'GATO' }, { name: 'Comida gato', cat: 'GATO' },
    { name: 'Atum', cat: 'ENLATADOS' }, { name: 'Chocolate branco e preto', cat: 'ENLATADOS' }, { name: 'Chili', cat: 'ENLATADOS' }, { name: 'Leite moça', cat: 'ENLATADOS' },
  ];
  return list.map(item => ({ ...item, has: true }));
}

function defaultState() {
  return {
    settings: { kcalTu: 1200, kcalEle: 1800, protTu: 135, protEle: 200, carboTu: 80, carboEle: 100 },
    currentWeek: 1,
    myRecipes: [], 
    selectedLunches: [], 
    selectedSnacks: [],
    selectedInstagramExtras: [],
    pantryStock: getInitialPantry(),
    shoppingList: [],
    invoices: [],
    instagramInspirations: [], 
    searchQuery: '',
    tab: 'dashboard'
  };
}

function initAppState() {
  const saved = localStorage.getItem('Marmitas_Pro_Final_v25');
  if (saved) {
    try { S = JSON.parse(saved); } catch(e) { S = defaultState(); }
  } else {
    S = defaultState();
  }
  
  if (!S || typeof S !== 'object') S = defaultState();
  if (!S.myRecipes) S.myRecipes = [];
  if (!S.selectedLunches) S.selectedLunches = [];
  if (!S.pantryStock || S.pantryStock.length === 0) S.pantryStock = getInitialPantry();
  if (!S.shoppingList) S.shoppingList = [];
  if (!S.invoices) S.invoices = [];
  if (!S.instagramInspirations) S.instagramInspirations = [];
  if (!S.tab) S.tab = 'dashboard';

  render();
}

function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => localStorage.setItem('Marmitas_Pro_Final_v25', JSON.stringify(S)), 300);
}

function getAllRecipes() {
  const igRecipes = (S.instagramInspirations || []).map(ig => ({
    id: ig.id, 
    name: `📸 ${ig.name}`,
    cat: ig.category || 'Lanches', 
    proteinType: 'lanche',
    bimby: 'Ver link original guardado na aba Insta.', 
    airfryer: '', 
    calories: 0, 
    protein: 0, 
    isSuggestion: false, 
    isFromInstagram: true, 
    link: ig.link, 
    ings: 'Ver detalhes no link original.', 
    steps: 'Seguir os passos do site original.'
  }));

  return [...(S.myRecipes || []), ...igRecipes, ...(typeof DEFAULT_RECIPES !== 'undefined' ? DEFAULT_RECIPES : []), ...(typeof EXTRA_RECIPES !== 'undefined' ? EXTRA_RECIPES : [])];
}

function monthSpend() {
  const ym = new Date().toISOString().slice(0,7);
  if (!S.invoices) return 0;
  return S.invoices.filter(i => i && i.date && i.date.startsWith(ym)).reduce((sum, i) => sum + i.total, 0);
}

/* app.js — PARTE 4 */
window.switchTab = function(tab) { 
  S.tab = tab; 
  render(); 
};

function render() {
  const root = document.getElementById('app-root') || document.body;
  if (!root) return;

  let view = renderDashboard();
  if (S.tab === 'recipes') view = renderRecipes();
  if (S.tab === 'pantry') view = renderPantry();
  if (S.tab === 'shopping') view = renderShopping();
  if (S.tab === 'instagram') view = renderInstagram(); 
  if (S.tab === 'gastos') view = renderGastos();

  root.innerHTML = `
    <nav style="display:grid; grid-template-columns: repeat(6, 1fr); background:#111; color:#fff; font-size:10px; text-align:center; font-weight:bold; border-bottom:3px solid #007bff; font-family:sans-serif;">
      <div onclick="switchTab('dashboard')" style="padding:14px 1px; cursor:pointer; background:${S.tab==='dashboard'?'#007bff':''};">📋 Painel</div>
      <div onclick="switchTab('recipes')" style="padding:14px 1px; cursor:pointer; background:${S.tab==='recipes'?'#007bff':''};">📖 Receitas</div>
      <div onclick="switchTab('pantry')" style="padding:14px 1px; cursor:pointer; background:${S.tab==='pantry'?'#007bff':''};">🗄️ Despensa</div>
      <div onclick="switchTab('shopping')" style="padding:14px 1px; cursor:pointer; background:${S.tab==='shopping'?'#007bff':''};">🛒 Compras</div>
      <div onclick="switchTab('instagram')" style="padding:14px 1px; cursor:pointer; background:${S.tab==='instagram'?'#007bff':''};">📸 Insta</div>
      <div onclick="switchTab('gastos')" style="padding:14px 1px; cursor:pointer; background:${S.tab==='gastos'?'#007bff':''};">💰 Gastos</div>
    </nav>
    <div style="padding:15px; max-width:600px; margin:0 auto; font-family:sans-serif; background:#f8f9fa; min-height:100vh; box-sizing:border-box;">
      ${view}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initAppState);
if (document.readyState === "complete" || document.readyState === "interactive") { initAppState(); }

window.registerInvoice = function() {
  const val = parseFloat(prompt("Valor total do talão do supermercado (€):"));
  if (isNaN(val) || val <= 0) return;
  S.invoices.push({ id: 'inv_'+Date.now(), date: new Date().toISOString().slice(0,10), total: val });
  save(); render();
};

window.generateWeeklyMenu = function() {
  const all = getAllRecipes();
  if (all.length === 0) return;
  
  const frangos = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'frango' || r.name.toLowerCase().includes('frango')));
  const carnes = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'carne' || r.name.toLowerCase().includes('carne')));
  const peixes = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'peixe' || r.name.toLowerCase().includes('peixe')));
  const lanches = all.filter(r => r.cat === 'Lanches' || r.proteinType === 'lanche');

  let escolhaAlmocos = [];
  
  if (frangos.length >= 2) {
    const fSh = [...frangos].sort(() => 0.5 - Math.random());
    escolhaAlmocos.push(fSh[0].id, fSh[1].id);
  } else if (frangos.length > 0) {
    escolhaAlmocos.push(frangos[0].id);
  }

  if (carnes.length >= 1) {
    const cSh = [...carnes].sort(() => 0.5 - Math.random());
    escolhaAlmocos.push(cSh[0].id);
  }

  if (peixes.length >= 1) {
    const pSh = [...peixes].sort(() => 0.5 - Math.random());
    escolhaAlmocos.push(pSh[0].id);
  }

  if (lanches.length >= 2) {
    const lSh = [...lanches].sort(() => 0.5 - Math.random());
    S.selectedSnacks = [lSh[0].id, lSh[1].id, lSh[0].id, lSh[1].id, lSh[0].id];
  } else if (lanches.length > 0) {
    S.selectedSnacks = Array(5).fill(lanches[0].id);
  }

  if (escolhaAlmocos.length > 0) {
    S.selectedLunches = escolhaAlmocos.sort(() => 0.5 - Math.random());
  }

  save(); 
  render();
  alert("✨ Menu da semana gerado com sucesso!");
};

window.addInstagramLink = function() {
  const name = prompt("Nome da receita do Instagram:");
  if (!name) return;
  const category = prompt("Categoria (ex: Lanche, Almoço/Marmita):", "Lanche") || "Lanche";
  const link = prompt("Cole o link completo da receita:");
  if (!link) return;
  
  S.instagramInspirations.push({ id: 'ig_'+Date.now(), name, category, link });
  save(); render();
};

window.deleteInstagramLink = function(id) {
  if (confirm("Remover esta inspiração?")) {
    S.instagramInspirations = S.instagramInspirations.filter(i => i.id !== id);
    save(); render();
  }
};

window.addCustomShoppingItem = function() {
  const name = prompt("O que precisas de comprar para casa?");
  if (!name) return;
  const cat = prompt("Categoria (ex: Limpeza, Laticínios):", "Geral") || "Geral";
  S.shoppingList.push({ id: 'item_'+Date.now(), name, cat, done: false });
  save(); render();
};

window.toggleShoppingItem = function(id) {
  const item = S.shoppingList.find(i => i.id === id);
  if (item) { item.done = !item.done; save(); setTimeout(render, 200); }
};

window.togglePantry = function(index) {
  S.pantryStock[index].has = !S.pantryStock[index].has;
  save(); render();
};

window.toggleSelectInstagramRecipe = function(id) {
  if (!S.selectedInstagramExtras) S.selectedInstagramExtras = [];
  const idx = S.selectedInstagramExtras.indexOf(id);
  if (idx > -1) {
    S.selectedInstagramExtras.splice(idx, 1);
  } else {
    S.selectedInstagramExtras.push(id);
  }
  save(); 
  render(); 
};

/* app.js — PARTE 5 */
function renderDashboard() {
  const totalGasto = monthSpend();
  
  if (!S.settings) S.settings = {};
  if (!S.settings.kcalTu) S.settings.kcalTu = 1200;
  if (!S.settings.kcalEle) S.settings.kcalEle = 1800;
  if (!S.settings.protTu) S.settings.protTu = 135; 
  if (!S.settings.protEle) S.settings.protEle = 200; 
  if (!S.settings.carboTu) S.settings.carboTu = 80;
  if (!S.settings.carboEle) S.settings.carboEle = 100;

  const carneNecessaria = ((S.settings.protTu * 6) + (S.settings.protEle * 6)) / 1000; 
  const hidratosNecessarios = ((S.settings.carboTu * 6) + (S.settings.carboEle * 6)) / 1000; 

  window.changeMacrosPrompt = function() {
    S.settings.kcalTu = parseInt(prompt("As tuas Calorias Diárias (Kcal):", S.settings.kcalTu)) || 1200;
    S.settings.protTu = parseInt(prompt("A tua Proteína por Marmita (g):", S.settings.protTu)) || 135;
    S.settings.carboTu = parseInt(prompt("Os teus Hidratos por Marmita (g):", S.settings.carboTu)) || 80;
    
    S.settings.kcalEle = parseInt(prompt("Calorias Diárias Dele (Kcal):", S.settings.kcalEle)) || 1800;
    S.settings.protEle = parseInt(prompt("Proteína Dele por Marmita (g):", S.settings.protEle)) || 200;
    S.settings.carboEle = parseInt(prompt("Hidratos Dele por Marmita (g):", S.settings.carboEle)) || 100;
    
    save(); 
    render(); 
  };

  const dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  const allRecs = getAllRecipes();

  return `
    <div style="background:#fff0f6; border-left:5px solid #d62976; padding:15px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
      <small style="color:#c2185b; font-weight:bold; display:block;">🩺 GUIA DE SAÚDE</small>
      <p style="margin:5px 0; font-size:12px; color:#555; line-height:1.4;">Foca em alimentos ricos em potássio e antioxidantes.</p>
    </div>

    <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #eee; box-shadow:0 2px 4px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <small style="color:#6c757d; font-weight:bold; text-transform:uppercase; letter-spacing:0.5px;">⚖️ METAS SEMANAIS</small>
        <button onclick="changeMacrosPrompt()" style="background:#f0f0f0; border:1px solid #ccc; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">⚙️</button>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
        <div style="background:#f1f3f5; padding:10px; border-radius:6px; text-align:center;">
          <b style="font-size:13px; color:#333; display:block;">👩‍🍳 A tua Ementa</b>
          <span style="font-size:16px; font-weight:bold; color:#007bff;">${S.settings.kcalTu} Kcal</span>
        </div>
        <div style="background:#f1f3f5; padding:10px; border-radius:6px; text-align:center;">
          <b style="font-size:13px; color:#333; display:block;">👨‍🦱 Marido</b>
          <span style="font-size:16px; font-weight:bold; color:#6f42c1;">${S.settings.kcalEle} Kcal</span>
        </div>
      </div>
    </div>

    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:15px; border-radius:8px; margin-bottom:15px;">
      <small style="color:#6c757d; font-weight:bold; display:block;">💰 GASTOS DESTE MÊS</small>
      <h2 style="margin:5px 0 10px 0; color:#28a745;">€${totalGasto.toFixed(2)}</h2>
      <button onclick="registerInvoice()" style="background:#28a745; color:#fff; padding:8px 12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; width:100%; font-size:13px;">Registar Fatura</button>
    </div>

    <div style="background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05); border:1px solid #eee;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0; color:#333; font-size:15px;">🍱 Menu da Semana</h3>
        <button onclick="generateWeeklyMenu()" style="background:#6f42c1; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✨ Gerar</button>
      </div>
      
      ${(!S.selectedLunches || S.selectedLunches.length === 0) ? `<p style="color:#888; font-size:13px; margin:0;">Nenhum prato escolhido.</p>` : `
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          ${dias.map((dia, idx) => {
            const lunchId = S.selectedLunches[idx % S.selectedLunches.length];
            const lunchRec = allRecs.find(x => x.id === lunchId);
            return `
              <div style="padding:10px; background:#f8f9fa; border-radius:6px; border-left:4px solid #6f42c1; font-size:13px;">
                <b style="color:#6f42c1; display:block; margin-bottom:4px;">📅 ${dia}</b>
                <div>🍗 ${lunchRec ? lunchRec.name : 'Não definido'}</div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

function renderRecipes() {
  const all = getAllRecipes();
  if (!S.currentRecipeFilter) S.currentRecipeFilter = 'todos';

  const query = (S.searchQuery || '').toLowerCase().trim();
  let filtered = all.filter(r => r.name.toLowerCase().includes(query) || (r.cat || '').toLowerCase().includes(query));

  window.setRecipeFilter = function(filterName) {
    S.currentRecipeFilter = filterName;
    save(); render();
  };

  return `
    <h3 style="margin:0 0 12px 0; color:#333;">❤️ Receitas (${filtered.length})</h3>
    <div style="margin-bottom:12px;">
      <input type="text" id="recipe-search-bar" placeholder="🔍 Pesquisar..." value="${S.searchQuery || ''}" oninput="S.searchQuery = this.value; save(); render();" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
    </div>
    ${filtered.map(r => `
      <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:12px; border:1px solid #ddd;">
        <b style="font-size:14px; color:#222;">${r.name}</b>
        <div style="margin-top:8px; font-size:12px; color:#555;">
          <span style="background:#e9ecef; color:#495057; padding:2px 6px; border-radius:4px;">${r.cat}</span>
        </div>
      </div>
    `).join('')}
  `;
}

function renderPantry() {
  const groups = {};
  
  S.pantryStock.forEach((item, index) => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push({ ...item, realIndex: index });
  });

  return `
    <h3 style="margin-top:0; color:#333;">🗄️ Despensa</h3>
    ${Object.keys(groups).map(cat => `
      <div style="margin-bottom:20px;">
        <b style="color:#495057; font-size:12px; text-transform:uppercase; display:block; margin-bottom:8px;">${cat}</b>
        ${groups[cat].map(item => `
          <div style="padding:10px; border-radius:6px; margin-bottom:5px; border:1px solid #f0f0f0; background:#fff; display:flex; justify-content:space-between; align-items:center;">
            <span style="color: ${item.has ? '#333' : '#aaa'}; font-weight:600; font-size:13px;">${item.name}</span>
            <button onclick="togglePantry(${item.realIndex})" style="background:${item.has ? '#28a745':'#dc3545'}; color:#fff; border:none; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
              ${item.has ? '✅' : '❌'}
            </button>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

/* app.js — PARTE 6 */
window.buyPantryItem = function(index, name, cat) {
  const priceInput = document.getElementById(`price-pantry-${index}`);
  const marketInput = document.getElementById(`market-pantry-${index}`);
  const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
  const market = marketInput ? marketInput.value : 'Geral';

  S.pantryStock[index].has = true;

  if (price > 0) {
    S.invoices.push({
      id: 'inv_' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      market: market,
      total: price,
      details: `${name} (${cat})`
    });
  }
  save(); render();
};

window.buyExtraItem = function(id, name, cat) {
  const priceInput = document.getElementById(`price-extra-${id}`);
  const marketInput = document.getElementById(`market-extra-${id}`);
  const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
  const market = marketInput ? marketInput.value : 'Geral';

  S.shoppingList = S.shoppingList.filter(item => item.id !== id);

  if (price > 0) {
    S.invoices.push({
      id: 'inv_' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      market: market,
      total: price,
      details: `${name} (${cat})`
    });
  }
  save(); render();
};

const selectSupermercados = (idPrefix, indexOrId) => `
  <select id="market-${idPrefix}-${indexOrId}" style="padding:4px; font-size:12px; border:1px solid #ccc; border-radius:4px;">
    <option value="Lidl">Lidl</option>
    <option value="Mercadona">Mercadona</option>
    <option value="Continente">Continente</option>
    <option value="Pingo Doce">Pingo Doce</option>
    <option value="Outro">Outro</option>
  </select>
`;

function renderShopping() {
  const missingFromPantry = S.pantryStock.filter(x => !x.has);

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">🛒 Compras</h3>
      <button onclick="addCustomShoppingItem()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">➕</button>
    </div>
    
    <b style="color:#c82333; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">Falta na Despensa:</b>
    <div style="background:#fff; padding:10px; border-radius:8px; border:1px solid #eee; margin-bottom:20px; display:flex; flex-direction:column; gap:8px;">
      ${missingFromPantry.length === 0 ? '<p style="color:#28a745; font-size:12px; margin:0; font-weight:bold;">✅ Despensa completa!</p>' : ''}
      
      ${S.pantryStock.map((item, index) => {
        if (item.has) return '';
        return `
          <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; background:#fdf2f2; padding:8px; border-radius:6px; border:1px solid #f5c6cb;">
            <div>
              <span style="font-weight:600; font-size:13px; color:#c82333;">${item.name}</span>
              <small style="display:block; color:#6c757d; font-size:10px;">${item.cat}</small>
            </div>
            <div style="display:flex; align-items:center; gap:4px;">
              ${selectSupermercados('pantry', index)}
              <input type="number" id="price-pantry-${index}" placeholder="0.00€" step="0.01" style="width:60px; padding:4px; font-size:12px; border:1px solid #ccc; border-radius:4px;">
              <button onclick="buyPantryItem(${index}, '${item.name}', '${item.cat}')" style="background:#28a745; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">✓</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <b style="color:#495057; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">Outras Compras:</b>
    <div style="background:#fff; padding:10px; border-radius:8px; border:1px solid #eee; display:flex; flex-direction:column; gap:8px;">
      ${S.shoppingList.map(item => `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; background:#f8f9fa; padding:8px; border-radius:6px; border:1px solid #e2e3e5;">
          <div>
            <span style="font-weight:600; font-size:13px; color:#333;">${item.name}</span>
            <small style="display:block; color:#6c757d; font-size:10px;">${item.cat}</small>
          </div>
          <div style="display:flex; align-items:center; gap:4px;">
            ${selectSupermercados('extra', item.id)}
            <input type="number" id="price-extra-${item.id}" placeholder="0.00€" step="0.01" style="width:60px; padding:4px; font-size:12px; border:1px solid #ccc; border-radius:4px;">
            <button onclick="buyExtraItem('${item.id}', '${item.name}', '${item.cat}')" style="background:#28a745; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">✓</button>
          </div>
        </div>
      `).join('')}
      ${S.shoppingList.length === 0 ? '<p style="color:#888; font-size:12px; margin:0;">Nenhum artigo extra adicionado.</p>' : ''}
    </div>
  `;
}

function renderGastos() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyInvoices = (S.invoices || []).filter(i => i && i.date && i.date.startsWith(currentMonth));
  const totalMes = monthlyInvoices.reduce((sum, i) => sum + (Number(i.total) || 0), 0);

  const mercadoTotais = {};
  monthlyInvoices.forEach(i => {
    if (i) {
      const nomeMercado = i.market || 'Manual/Outro';
      const valorTotal = Number(i.total) || 0;
      mercadoTotais[nomeMercado] = (mercadoTotais[nomeMercado] || 0) + valorTotal;
    }
  });

  window.clearHistoryGastos = function() {
    if (confirm("Desejas limpar todo o histórico de gastos?")) {
      S.invoices = [];
      save(); render();
    }
  };

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">📊 Gastos Detalhados</h3>
      <button onclick="clearHistoryGastos()" style="background:#dc3545; color:#fff; border:none; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;">🗑️ Limpar</button>
    </div>

    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:15px; border-radius:8px; margin-bottom:15px; text-align:center;">
      <small style="color:#6c757d; font-weight:bold; display:block;">💰 INVESTIMENTO DESTE MÊS</small>
      <h2 style="margin:5px 0 0 0; color:#28a745; font-size:28px;">€${totalMes.toFixed(2)}</h2>
    </div>

    <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #eee; margin-bottom:15px; font-size:13px;">
      <b style="color:#495057; display:block; margin-bottom:8px; text-transform:uppercase; font-size:11px;">🛒 Divisão por Supermercado:</b>
      ${Object.keys(mercadoTotais).length === 0 ? '<p style="color:#aaa; margin:0; font-size:12px;">Nenhum gasto registado ainda.</p>' : ''}
      ${Object.keys(mercadoTotais).map(m => `
        <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px dashed #f0f0f0;">
          <span>🏪 <b>${m}:</b></span>
          <span style="font-weight:700; color:#333;">€${mercadoTotais[m].toFixed(2)}</span>
        </div>
      `).join('')}
    </div>

    <b style="color:#495057; display:block; margin-bottom:8px; text-transform:uppercase; font-size:11px;">📜 Histórico:</b>
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${[...monthlyInvoices].reverse().map(item => `
        <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #eee; display:flex; justify-content:space-between; align-items:center; font-size:13px;">
          <div>
            <b style="color:#222;">${item.details || 'Fatura Manual'}</b>
            <small style="display:block; color:#888; font-size:10px;">🏪 ${item.market || 'Manual/Outro'} — 📅 ${item.date}</small>
          </div>
          <span style="font-weight:700; color:#28a745; font-size:14px;">+ €${(Number(item.total) || 0).toFixed(2)}</span>
        </div>
      `).join('')}
      ${monthlyInvoices.length === 0 ? '<p style="color:#888; font-size:12px; text-align:center; padding:10px;">Nenhum artigo registado neste mês.</p>' : ''}
    </div>
  `;
}

function renderInstagram() {
  const list = [...(S.instagramInspirations || [])].reverse();

  window.saveInstagramInspiracionClassic = function() {
    const linkInput = document.getElementById('insp-url-input');
    const nameInput = document.getElementById('insp-name-input');
    const catInput = document.getElementById('insp-cat-input');

    const link = linkInput ? linkInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';
    const category = catInput ? catInput.value.trim() : 'Lanche';

    if (!name || !link) {
      alert("Preencha o Nome e o Link!");
      return;
    }

    const hoje = new Date().toISOString().slice(0, 10);
    S.instagramInspirations.push({
      id: 'ig_' + Date.now(),
      name: name,
      category: category,
      link: link,
      date: hoje
    });

    save();
    render();
  };

  return `
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px;">
      <div style="margin-bottom:10px;">
        <label style="display:block; font-size:12px; font-weight:bold; color:#495057; margin-bottom:4px;">Link</label>
        <input type="url" id="insp-url-input" placeholder="https://instagram.com…" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      <div style="margin-bottom:10px;">
        <label style="display:block; font-size:12px; font-weight:bold; color:#495057; margin-bottom:4px;">Nome</label>
        <input type="text" id="insp-name-input" placeholder="ex: wrap de frango" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      <div style="margin-bottom:12px;">
        <label style="display:block; font-size:12px; font-weight:bold; color:#495057; margin-bottom:4px;">Categoria</label>
        <input type="text" id="insp-cat-input" value="Lanche" placeholder="Lanche ou Almoço/Marmita" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      <button onclick="saveInstagramInspiracionClassic()" style="background:#556b2f; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%; font-size:13px;">📌 Guardar</button>
    </div>

    <div style="display:flex; flex-direction:column; gap:10px;">
      ${list.map(item => {
        const isSelected = S.selectedInstagramExtras && S.selectedInstagramExtras.includes(item.id);
        return `
          <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #eee;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
              <span style="font-weight:700; color:#222; font-size:14px; flex:1;">
                ${item.name} <small style="color:#6c757d;">(${item.category})</small>
              </span>
            </div>
            <div style="margin-top:4px;">
              <a href="${item.link}" target="_blank" style="color:#008080; font-size:12px; word-break:break-all; text-decoration:none;">${item.link}</a>
            </div>
            <div style="display:flex; gap:8px; margin-top:10px;">
              <button onclick="toggleSelectInstagramRecipe('${item.id}')" style="background:${isSelected ? '#dc3545':'#556b2f'}; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
                ${isSelected ? '✕ Remover' : '🍽️ Escolher'}
              </button>
              <button onclick="deleteInstagramLink('${item.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px; margin-left:auto;">✕</button>
            </div>
          </div>
        `;
      }).join('')}
      
      ${list.length === 0 ? '<div style="text-align:center; color:#888; font-size:13px; padding:20px;">📌 Sem inspirações.</div>' : ''}
    </div>
  `;
}
