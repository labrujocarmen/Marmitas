/* app.js — PARTE 1 ATUALIZADA (Ingredientes e Passos Completos) */
'use strict';

const DEFAULT_RECIPES = [
  { id: 'f_desfiado', name: 'Frango desfiado tradicional', cat: 'Almoço/Marmita', bimby: 'Programe 5 seg/Vel 4 Invertida para desfiar o frango cozido.', airfryer: '', calories: 280, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Alho (2 dentes), Azeite (1 col sopa), Sal', steps: 'Cozinhe o frango, deixe arrefecer e desfie. No Bimby, programe 5 seg/Vel 4 Invertida.' },
  { id: 'f_mexicano', name: 'Frango mexicano', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Pimentões coloridos, Milho, Feijão, Tomate', steps: 'Refogue os vegetais, coloque o frango picado, temperado com cominho e paprika.' }
];

let S = null;
let saveTimer = null;
/* app.js — PARTE 2 (Metade A) */
const EXTRA_RECIPES = [
  { id: 'm_feij_1', name: 'Frango grelhado + arroz + feijão preto + brócolos', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: 'Grelhe o frango a 180°C por 12 min.', isSuggestion: true, calories: 350, protein: 38, ings: 'Peito de Frango (150g), Arroz (100g), Feijão Preto (80g), Brócolos (100g)', steps: 'Grelhe o frango, cozinhe o arroz e o feijão separadamente, e vapor os brócolos.' }
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

window.togglePantry = function(index) {
  if (!S.pantryStock || !S.pantryStock[index]) return;
  const item = S.pantryStock[index];
  
  // Se o item ainda não tiver a propriedade 'status', define com base no antigo 'has'
  if (!item.status) {
    if (item.has === true || item.has === undefined) {
      item.status = 'tenho';
    } else {
      item.status = 'falta';
    }
  }

  // FAZ O CICLO DOS 3 ESTADOS: Tenho (Verde) ➔ Falta (Vermelho) ➔ Não Usar (Cinza) ➔ Tenho (Verde)
  if (item.status === 'tenho') {
    item.status = 'falta';
    item.has = false; // Manda para a lista de compras
  } else if (item.status === 'falta') {
    item.status = 'nao_usar';
    item.has = true;  // Tira da lista de compras
  } else {
    item.status = 'tenho';
    item.has = true;  // Mantém fora da lista de compras
  }

  save(); 
  render();
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
      <button onclick="registerInvoice()" style="background:#28a745; color:#fff; padding:8px 12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; width:100%; font-size:13px;">Registar Talão</button>
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
      <input type="text" id="recipe-search-bar" placeholder="🔍 Pesquisar..." value="${S.searchQuery || ''}" oninput="S.searchQuery = this.value; save(); render();" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box;">
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
    <h3 style="margin-top:0; color:#333;">🗄️ Organização da Despensa</h3>
    <p style="color:#6c757d; font-size:12px; margin-bottom:15px;">Clica no botão para mudar: Verde (Tenho) ➔ Vermelho (Falta) ➔ Cinza (Não usar).</p>
    ${Object.keys(groups).map(cat => `
      <div style="margin-bottom:20px;">
        <b style="color:#495057; font-size:12px; text-transform:uppercase; display:block; margin-bottom:8px; letter-spacing:0.5px;">${cat}</b>
        ${groups[cat].map(item => {
          // Define a cor e o texto dinâmico com base nos 3 estados
          let btnColor = '#28a745';
          let btnText = '✅ Tenho';
          let textStyle = 'color: #333; text-decoration: none; font-weight:600;';

          if (item.status === 'falta') {
            btnColor = '#dc3545';
            btnText = '❌ Falta';
            textStyle = 'color: #c82333; text-decoration: none; font-weight:600;';
          } else if (item.status === 'nao_usar') {
            btnColor = '#6c757d';
            btnText = '⚪ Não Usar';
            textStyle = 'color: #aaa; text-decoration: line-through; font-weight:normal;';
          }

          return `
            <div style="padding:10px; border-radius:6px; margin-bottom:5px; border:1px solid #f0f0f0; background:#fff; display:flex; justify-content:space-between; align-items:center;">
              <span style="${textStyle} font-size:13px;">${item.name}</span>
              <button onclick="togglePantry(${item.realIndex})" style="background:${btnColor}; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
                ${btnText}
              </button>
            </div>
          `;
        }).join('')}
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
  // FILTRO CORRIGIDO: Só vai para a lista de compras o que estiver marcado estritamente como 'falta' (Vermelho)
  if (!S.cartList) S.cartList = [];
  const missingFromPantry = S.pantryStock.filter(x => x && x.status === 'falta');

  window.putItemInCartFromPantry = function(index, name, cat) {
    S.cartList.push({ type: 'pantry', realIdx: index, name: name, cat: cat });
    save(); render();
  };

  window.putItemInCartFromExtra = function(id, name, cat) {
    S.cartList.push({ type: 'extra', id: id, name: name, cat: cat });
    S.shoppingList = S.shoppingList.filter(item => item.id !== id);
    save(); render();
  };

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">🛒 Lista de Compras</h3>
      <button onclick="addCustomShoppingItem()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">➕ Artigo Extra</button>
    </div>
    
    <b style="color:#c82333; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">🚨 Preciso de Comprar (Marcados como Falta):</b>
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; margin-bottom:20px; display:flex; flex-direction:column; gap:8px;">
      ${missingFromPantry.length === 0 ? '<p style="color:#28a745; font-size:12px; margin:0; font-weight:bold;">✅ Nada em falta na Despensa!</p>' : ''}
      
      ${S.pantryStock.map((item, index) => {
        const alreadyInCart = S.cartList.some(c => c.type === 'pantry' && c.realIdx === index);
        // SÓ MOSTRA SE ESTIVER COMO 'FALTA' E NÃO ESTIVER NO CARRINHO
        if (item.status !== 'falta' || alreadyInCart) return ''; 
        
        return `
          <div onclick="putItemInCartFromPantry(${index}, '${item.name}', '${item.cat}')" style="padding:12px; background:#fdf2f2; border:1px solid #f5c6cb; border-radius:6px; cursor:pointer; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
            <span>🔸 ${item.name} <small style="color:#6c757d; font-weight:normal;">(${item.cat})</small></span>
            <span style="font-size:11px; color:#28a745; font-weight:normal;">🛒 Carrinho</span>
          </div>
        `;
      }).join('')}
    </div>

    <b style="color:#495057; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">🏡 Outras Coisas / Lista Extra:</b>
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; display:flex; flex-direction:column; gap:8px;">
      ${S.shoppingList.map(item => `
        <div onclick="putItemInCartFromExtra('${item.id}', '${item.name}', '${item.cat}')" style="padding:12px; background:#fff; border:1px solid #eee; border-radius:6px; cursor:pointer; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
          <span>🔹 ${item.name} <small style="color:#6c757d; font-weight:normal;">(${item.cat})</small></span>
          <span style="font-size:11px; color:#28a745; font-weight:normal;">🛒 Carrinho</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderGastos() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyInvoices = (S.invoices || []).filter(i => i && i.date && i.date.startsWith(currentMonth));
  const totalMes = monthlyInvoices.reduce((sum, i) => sum + (Number(i.total) || 0), 0);
  if (!S.cartList) S.cartList = [];

  const mercadoTotais = {};
  monthlyInvoices.forEach(i => {
    if (i) {
      const nomeMercado = i.market || 'Manual/Outro';
      const valorTotal = Number(i.total) || 0;
      mercadoTotais[nomeMercado] = (mercadoTotais[nomeMercado] || 0) + valorTotal;
    }
  });

  // Fecha a compra do item faturando o preço real pago
  window.finalizePriceAndCheckout = function(cartIdOrIdx, type, name, cat, realIndexInPantry) {
    const priceInput = document.getElementById(`price-cart-${cartIdOrIdx}`);
    const marketSelect = document.getElementById(`market-cart-${cartIdOrIdx}`);
    const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
    const market = marketSelect ? marketSelect.value : 'Lidl';

    // 1. Devolve o produto à Despensa marcado como "Tenho"
    if (type === 'pantry') {
      S.pantryStock[realIndexInPantry].has = true;
    }

    // 2. Se deitares um preço maior que zero, acumula no histórico de gastos detalhado
    if (price > 0) {
      S.invoices.push({
        id: 'inv_' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        market: market,
        total: price,
        details: `${name} (${cat})`
      });
    }

    // 3. Remove permanentemente o item do carrinho de espera
    if (type === 'pantry') {
      S.cartList = S.cartList.filter(c => !(c.type === 'pantry' && c.realIdx === realIndexInPantry));
    } else {
      S.cartList = S.cartList.filter(c => !(c.type === 'extra' && c.id === cartIdOrIdx));
    }

    save(); render();
  };

  window.clearHistoryGastos = function() {
    if (confirm("Desejas limpar todo o teu histórico de gastos acumulado?")) {
      S.invoices = [];
      save(); render();
    }
  };

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">📊 Fecho de Caixa das Compras</h3>
      <button onclick="clearHistoryGastos()" style="background:#dc3545; color:#fff; border:none; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;">🗑️ Limpar Histórico</button>
    </div>

    <!-- CARD DO TOTAL DO MÊS -->
    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:15px; border-radius:8px; margin-bottom:15px; text-align:center;">
      <small style="color:#6c757d; font-weight:bold; display:block; text-transform:uppercase;">💰 INVESTIMENTO EM REFEIÇÕES DESTE MÊS</small>
      <h2 style="margin:5px 0 0 0; color:#28a745; font-size:26px;">€${totalMes.toFixed(2)}</h2>
    </div>

    <!-- DIVISÃO POR SUPERMERCADOS -->
    <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #eee; margin-bottom:15px; font-size:13px;">
      <b style="color:#495057; display:block; margin-bottom:8px; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">🛒 Gasto Acumulado por Estabelecimento:</b>
      ${Object.keys(mercadoTotais).length === 0 ? '<p style="color:#aaa; margin:0; font-size:12px; text-align:center;">Nenhum gasto registado ainda.</p>' : ''}
      ${Object.keys(mercadoTotais).map(m => `
        <div style="display:flex; justify-content:space-between; padding:3px 0; border-bottom:1px dashed #f0f0f0;">
          <span>🏪 <b>${m}:</b></span>
          <span style="font-weight:700; color:#333;">€${mercadoTotais[m].toFixed(2)}</span>
        </div>
      `).join('')}
    </div>

    <!-- LISTA DE ARTIGOS COMPRADOS À ESPERA DE VALOR -->
    <b style="color:#495057; display:block; margin-bottom:8px; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">📝 Dar Baixa e Colocar Preço nos Artigos Comprados:</b>
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      ${S.cartList.length === 0 ? `
        <p style="color:#888; font-size:13px; text-align:center; background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; margin:0;">
          🛒 O carrinho de faturas está vazio.<br><small style="color:#aaa;">Vai à aba Compras e clica nos itens que meteste no carrinho físico para eles aparecerem aqui.</small>
        </p>
      ` : ''}
      
      ${S.cartList.map(item => {
        const idKey = item.type === 'pantry' ? item.realIdx : item.id;
        return `
          <div style="background:#fff; padding:10px; border-radius:8px; border:1px solid #eee; display:flex; align-items:center; justify-content:space-between; gap:6px;">
            <div style="flex:1;">
              <span style="font-size:13px; font-weight:600; color:#222;">${item.name}</span>
              <small style="display:block; color:#6c757d; font-size:10px; text-transform:uppercase;">${item.cat}</small>
            </div>
            <div style="display:flex; align-items:center; gap:4px;">
              <select id="market-cart-${idKey}" style="padding:4px; font-size:12px; border:1px solid #ccc; border-radius:4px;">
                <option value="Lidl">Lidl</option>
                <option value="Mercadona">Mercadona</option>
                <option value="Continente">Continente</option>
                <option value="Pingo Doce">Pingo Doce</option>
                <option value="Outro">Outro</option>
              </select>
              <input type="number" id="price-cart-${idKey}" placeholder="0.00€" step="0.01" style="width:60px; padding:4px; font-size:12px; border:1px solid #ccc; border-radius:4px; text-align:center;">
              <button onclick="finalizePriceAndCheckout('${idKey}', '${item.type}', '${item.name}', '${item.cat}', ${item.realIdx || 0})" style="background:#28a745; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;">✅</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- REGISTO CRONOLÓGICO HISTÓRICO -->
    <b style="color:#495057; display:block; margin-bottom:8px; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">📜 Histórico Recente de Artigos Pagos:</b>
    <div style="display:flex; flex-direction:column; gap:6px;">
      ${[...monthlyInvoices].reverse().slice(0, 10).map(item => `
        <div style="background:#fff; padding:8px 12px; border-radius:6px; border:1px solid #eee; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
          <div>
            <b style="color:#222;">${item.details || 'Fatura Geral'}</b>
            <small style="display:block; color:#888; font-size:10px;">🏪 ${item.market || 'Geral'} — 📅 ${item.date}</small>
          </div>
          <span style="font-weight:700; color:#28a745;">+ €${(Number(item.total) || 0).toFixed(2)}</span>
        </div>
      `).join('')}
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
      <button onclick="saveInstagramInspiracionClassic()" style="background:#556b2f; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%; font-size:13px;">Guardar Receita</button>
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
              <button onclick="toggleSelectInstagramRecipe('${item.id}')" style="background:${isSelected ? '#dc3545':'#556b2f'}; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">
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
