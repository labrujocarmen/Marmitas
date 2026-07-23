/* app.js — Versão Final com Proteção Anti-Ecrã em Branco */
'use strict';

const DEFAULT_RECIPES = [
  { id: 'sug_1', name: 'Frango de Caril Saudável', cat: 'frango', volume: 2, bimby: 'Pique a cebola 5 seg/vel 5. Refogue com azeite 3 min/120°C/vel 1.', airfryer: 'Não aplicável', calories: 380, protein: 40, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'sug_2', name: 'Almôndegas de Vaca no Forno', cat: 'bovina', volume: 2, bimby: 'Pique a carne se necessário.', airfryer: 'Cozinhe a 180°C por 12-15 minutes.', calories: 420, protein: 35, isSuggestion: true, ings: [{name:'Carne Picada Vaca', qty: 400, unit:'g'}] },
  { id: 'sug_3', name: 'Bacalhau Espiritual Light', cat: 'peixe', volume: 2, bimby: 'Faça o molho branco na velocidade 4 a 90°C.', airfryer: 'Gratine a 200°C por 8 minutos.', calories: 310, protein: 28, isSuggestion: true, ings: [{name:'Bacalhau Desfiado', qty: 400, unit:'g'}] }
];

let S = null;
let saveTimer = null;

function defaultState() {
  return {
    settings: { people: 3, marmitaDays: 5 },
    currentWeek: 1,
    myRecipes: [], 
    selectedLunches: [], 
    pantryStock: [
      { name: 'Arroz Cigala', has: true },
      { name: 'Azeite Oliveira da Serra', has: false },
      { name: 'Massa Integral', has: true }
    ],
    shoppingList: [
      { id: 'i1', name: 'Detergente da roupa', cat: 'Limpeza', done: false },
      { id: 'i2', name: 'Comida do gato', cat: 'Gato', done: false }
    ],
    invoices: [], 
    instagramInspirations: [], 
    tab: 'dashboard'
  };
}

function initAppState() {
  // Usamos uma chave totalmente nova para ignorar o histórico corrompido do telemóvel
  const saved = localStorage.getItem('Marmitas_Pro_Final_v1');
  if (saved) {
    try { 
      S = JSON.parse(saved); 
    } catch(e) { 
      S = defaultState(); 
    }
  } else {
    S = defaultState();
  }
  
  // Salvaguardas obrigatórias contra propriedades em falta (Evita ecrã em branco)
  if (!S || typeof S !== 'object') S = defaultState();
  if (!S.myRecipes) S.myRecipes = [];
  if (!S.selectedLunches) S.selectedLunches = [];
  if (!S.pantryStock) S.pantryStock = [];
  if (!S.shoppingList) S.shoppingList = [];
  if (!S.invoices) S.invoices = [];
  if (!S.instagramInspirations) S.instagramInspirations = [];
  if (!S.tab) S.tab = 'dashboard';

  render();
}

function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => localStorage.setItem('Marmitas_Pro_Final_v1', JSON.stringify(S)), 300);
}

function getAllRecipes() {
  return [...(S.myRecipes || []), ...DEFAULT_RECIPES];
}

function monthSpend() {
  const ym = new Date().toISOString().slice(0,7);
  if (!S.invoices) return 0;
  return S.invoices.filter(i => i && i.date && i.date.startsWith(ym)).reduce((sum, i) => sum + i.total, 0);
}

/* ===================== FUNÇÕES DE AÇÃO GLOBAIS ===================== */
window.switchTab = function(tab) { S.tab = tab; render(); };

window.registerInvoice = function() {
  const val = parseFloat(prompt("Valor total do talão do supermercado (€):"));
  if (isNaN(val) || val <= 0) return;
  S.invoices.push({ id: 'inv_'+Date.now(), date: new Date().toISOString().slice(0,10), total: val });
  save(); render();
};

window.addNewRecipe = function() {
  const name = prompt("Nome da Receita:");
  if (!name) return;
  const bimby = prompt("Modo Bimby (deixe em branco se não aplicável):") || "";
  const airfryer = prompt("Modo Airfryer (deixe em branco se não aplicável):") || "";
  const calories = parseInt(prompt("Calorias por porção:", "0")) || 0;
  const protein = parseInt(prompt("Proteínas (g):", "0")) || 0;
  
  const newRec = { id: 'my_' + Date.now(), name, bimby, airfryer, calories, protein, isSuggestion: false, ings: [] };
  S.myRecipes.push(newRec);
  save(); render();
};

window.addInstagramLink = function() {
  const link = prompt("Cole o link da publicação do Instagram:");
  if (!link) return;
  const desc = prompt("Nota rápida (ex: Ideia de frango crocante):") || "Inspiração sem título";
  S.instagramInspirations.push({ id: 'ig_'+Date.now(), link, desc });
  save(); render();
};

window.addCustomShoppingItem = function() {
  const name = prompt("O que precisas de comprar para casa?");
  if (!name) return;
  const cat = prompt("Categoria (ex: Limpeza, Gato, Mercearia):", "Geral") || "Geral";
  S.shoppingList.push({ id: 'item_'+Date.now(), name, cat, done: false });
  save(); render();
};

window.toggleShoppingItem = function(id) {
  const item = S.shoppingList.find(i => i.id === id);
  if (item) { 
    item.done = !item.done; 
    save(); 
    setTimeout(render, 200);
  }
};

window.togglePantry = function(index) {
  S.pantryStock[index].has = !S.pantryStock[index].has;
  save(); render();
};

window.toggleSelectRecipe = function(id) {
  const idx = S.selectedLunches.indexOf(id);
  if (idx > -1) S.selectedLunches.splice(idx, 1);
  else S.selectedLunches.push(id);
  save(); render();
};

/* ===================== COMPONENTES VISUAIS (HTML) ===================== */
function renderDashboard() {
  return `
    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:15px; border-radius:8px; margin-bottom:15px;">
      <small style="color:#6c757d; font-weight:bold; display:block;">💰 GASTOS DESTE MÊS</small>
      <h2 style="margin:5px 0 10px 0; color:#28a745;">€${monthSpend().toFixed(2)}</h2>
      <button onclick="registerInvoice()" style="background:#28a745; color:#fff; padding:8px 12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; width:100%;">Registar Fatura Total</button>
    </div>
    <div style="background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05); border:1px solid #eee;">
      <h3 style="margin-top:0; color:#333;">🍱 Menu Planeado para a Semana</h3>
      ${S.selectedLunches.length === 0 ? '<p style="color:#888; font-size:13px;">Nenhuma receita selecionada para esta semana. Vá ao menu "Livro" para escolher.</p>' : ''}
      <ul style="padding-left:20px; margin:0;">
        ${S.selectedLunches.map(id => {
          const r = getAllRecipes().find(x => x.id === id);
          return r ? `<li style="padding:6px 0; color:#333; font-weight:500;">${r.name}</li>` : '';
        }).join('')}
      </ul>
    </div>
  `;
}

function renderRecipes() {
  const all = getAllRecipes();
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">📖 Livro de Receitas</h3>
      <button onclick="addNewRecipe()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">➕ Nova Receita</button>
    </div>
    ${all.map(r => `
      <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:12px; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:15px; color:#222;">${r.name}</b>
          <button onclick="toggleSelectRecipe('${r.id}')" style="background:${S.selectedLunches.includes(r.id)?'#dc3545':'#28a745'}; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">
            ${S.selectedLunches.includes(r.id) ? 'Remover' : 'Escolher'}
          </button>
        </div>
        <div style="margin-top:8px; display:flex; gap:5px; flex-wrap:wrap;">
          <span style="background:#e9ecef; color:#495057; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">${r.isSuggestion ? '💡 Sugestão' : '⭐ Minha'}</span>
          ${r.bimby ? '<span style="background:#20c997; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🤖 Bimby</span>' : ''}
          ${r.airfryer ? '<span style="background:#fd7e14; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🍟 Airfryer</span>' : ''}
          ${r.calories ? `<span style="background:#fff3cd; color:#856404; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🔥 ${r.calories} kcal</span>` : ''}
        </div>
        ${r.bimby || r.airfryer ? `
          <div style="background:#f8f9fa; padding:8px; font-size:12px; border-radius:4px; margin-top:8px; border-top:1px dashed #eee; color:#555;">
            ${r.bimby ? `<b>Bimby:</b> ${r.bimby}<br>` : ''}
            ${r.airfryer ? `<b>Airfryer:</b> ${r.airfryer}` : ''}
          </div>
        ` : ''}
      </div>
    `).join('')}
  `;
}

function renderPantry() {
  return `
    <h3 style="margin-top:0; color:#333;">🗄️ O que tenho em casa</h3>
    <p style="color:#6c757d; font-size:12px; margin-bottom:15px;">Gere o stock básico da tua dispensa antes de cozinhares.</p>
    ${S.pantryStock.map((item, idx) => `
      <div style="padding:12px 0; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; background:#fff; padding:10px; border-radius:6px; margin-bottom:6px; border:1px solid #f0f0f0;">
        <span style="text-decoration: ${item.has ? 'none' : 'line-through'}; color: ${item.has ? '#333' : '#aaa'}; font-weight:600; font-size:14px;">${item.name}</span>
        <button onclick="togglePantry(${idx})" style="background:${item.has ? '#28a745':'#6c757d'}; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">
          ${item.has ? '✅ Tenho' : '❌ Falta'}
        </button>
      </div>
    `).join('')}
  `;
}

function renderShopping() {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">🛒 Lista de Compras</h3>
      <button onclick="addCustomShoppingItem()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">➕ Adicionar Artigo</button>
    </div>
    
