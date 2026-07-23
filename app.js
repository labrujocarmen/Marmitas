/* app.js — PARTE 1 */
'use strict';

const DEFAULT_RECIPES = [
  { id: 'f_desfiado', name: 'Frango desfiado tradicional', cat: 'Almoço/Marmita', bimby: 'Programe 5 seg/Vel 4 Invertida para desfiar o frango cozido.', airfryer: '', calories: 280, protein: 35, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_mexicano', name: 'Frango mexicano', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_oriental', name: 'Frango oriental', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 330, protein: 35, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_xadrez', name: 'Frango xadrez', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 340, protein: 36, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_caril', name: 'Frango de caril', cat: 'Almoço/Marmita', bimby: 'Prepare o molho de caril na vel 2 a 90°C.', airfryer: '', calories: 350, protein: 34, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_cremoso', name: 'Frango cremoso', cat: 'Almoço/Marmita', bimby: 'Misture o queijo creme na vel 4.', airfryer: '', calories: 290, protein: 33, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_strogonoff', name: 'Strogonoff saudável', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 300, protein: 35, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_mediterran', name: 'Frango mediterrânico', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Cozinhe a 190°C por 15 min.', calories: 295, protein: 34, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_mostarda', name: 'Frango mostarda', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_limao', name: 'Frango com limão', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Grelhe a 180°C por 12 min.', calories: 270, protein: 35, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_espinafres', name: 'Frango com espinafres', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 285, protein: 36, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_portuguesa', name: 'Frango à portuguesa', cat: 'Almoço/Marmita', bimby: 'Refogue cebola e pimento 5 min/Varoma.', airfryer: '', calories: 320, protein: 34, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_barbecue', name: 'Frango barbecue', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Asse por 15 min a 180°C.', calories: 315, protein: 35, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_forno', name: 'Frango ao forno', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Asse frango e batata-doce a 200°C por 20 min.', calories: 340, protein: 33, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] },
  { id: 'f_cogumelos', name: 'Frango com cogumelos', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 290, protein: 35, isSuggestion: true, ings: [{name:'Peito de Frango', qty: 500, unit:'g'}] }
];

let S = null;
let saveTimer = null;
/* app.js — PARTE 2 */
const EXTRA_RECIPES = [
  { id: 'm_feij_1', name: 'Frango grelhado + arroz + feijão preto + brócolos', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Grelhe o frango a 180°C por 12 min.', isSuggestion: true, ings: [] },
  { id: 'm_feij_2', name: 'Picadinho de carne + arroz + feijão carioca + cenoura', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_feij_3', name: 'Carne de panela + arroz + feijão vermelho + couve', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_feij_4', name: 'Almôndegas caseiras + arroz + feijão + feijão-verde', cat: 'Almoço/Marmita', bimby: 'Faça o molho na vel 2.', airfryer: 'Asse as almôndegas a 200°C por 10 min.', isSuggestion: true, ings: [] },
  { id: 'm_feij_5', name: 'Frango desfiado + arroz + feijão tropeiro light', cat: 'Almoço/Marmita', bimby: 'Desfie o frango vel 4 invertida.', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_feij_6', name: 'Salmão com arroz e legumes', cat: 'Almoço/Marmita', bimby: 'Cozzinhe os legumes na Varoma.', airfryer: 'Cozzinhe o salmão a 180°C por 10 min.', isSuggestion: true, ings: [] },
  { id: 'm_feij_7', name: 'Bife acebolado + arroz + feijão + abóbora assada', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Asse a abóbora a 200°C por 15 min.', isSuggestion: true, ings: [] },
  { id: 'm_feij_8', name: 'Iscas de fígado + arroz + feijão + salada', cat: 'Almoço/Marmita', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_feij_9', name: 'Chili de carne + arroz', cat: 'Almoço/Marmita', bimby: 'Cozzinhe a carne com o feijão 15 min/100°C/vel colher.', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_feij_10', name: 'Feijoada magra + arroz + couve', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_feij_11', name: 'Frango ao molho + arroz + feijão + curgete ou cenoura', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_1', name: 'Carne picada com batata, cenoura e arroz', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_2', name: 'Bacalhau com grão, espinafres e cebola', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_3', name: 'Picadinho de carne com legumes e puré de batata', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_4', name: 'Peru estufado com ervilhas e arroz', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_5', name: 'Empadão de carne com puré de batata e legumes', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_6', name: 'Carne de porco à alentejana versão saudável', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_7', name: 'Lombo de porco assado com legumes e batata', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_8', name: 'Lasanha de curgete com carne picada', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_9', name: 'Bacalhau espiritual light', cat: 'Almoço/Marmita', bimby: 'Prepare o creme na Bimby.', airfryer: 'Gratine a 200°C.', isSuggestion: true, ings: [] },
  { id: 'm_extra_10', name: 'Almôndegas de peru com puré e brócolos', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_11', name: 'Frango com mostarda e mel, arroz e legumes', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_12', name: 'Jardineira de carne', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_13', name: 'Arroz de pato versão leve', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_14', name: 'Escondidinho de carne com puré de batata-doce', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_15', name: 'Frango tikka masala light com arroz basmati', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_16', name: 'Carne à bolonhesa com massa integral', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'm_extra_17', name: 'Bacalhau à Gomes de Sá saudável', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'l_skyr', name: 'Iogurte Skyr + frutos vermelhos', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'l_queijo', name: 'Queijo fresco + tomate', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'l_atum', name: 'Sandes de atum + salada + tomate + pepino', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'l_frango', name: 'Sandes de frango desfiado + rúcula + cenoura ralada', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: [] },
  { id: 'l_burger', name: 'Hambúrguer caseiro + salada + batata + airfryer', cat: 'Lanches', bimby: '', airfryer: 'Batatas a 200°C por 15 min.', isSuggestion: true, ings: [] },
  { id: 'l_salmao', name: 'Sandes com cream cheese e salmão fumado + rúcula', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: [] }
];
/* app.js — PARTE 3 */
function getInitialPantry() {
  const list = [
    { name: 'Bife', cat: 'CARNE' }, { name: 'Costeletas de porco', cat: 'CARNE' }, { name: 'Hambúrguer', cat: 'CARNE' }, { name: 'Camarão', cat: 'CARNE' }, { name: 'Linguiça', cat: 'CARNE' }, { name: 'Carne moída', cat: 'CARNE' }, { name: 'Carne rabadilha para assar', cat: 'CARNE' }, { name: 'Filé de peixe', cat: 'CARNE' }, { name: 'Peito de frango', cat: 'CARNE' }, { name: 'Frango', cat: 'CARNE' },
    { name: 'Kiwi', cat: 'LEGUMES e FRUTAS' }, { name: 'Limão', cat: 'LEGUMES e FRUTAS' }, { name: 'Morango congelado', cat: 'LEGUMES e FRUTAS' }, { name: 'Melancia', cat: 'LEGUMES e FRUTAS' }, { name: 'Alface', cat: 'LEGUMES e FRUTAS' }, { name: 'Couve flor', cat: 'LEGUMES e FRUTAS' }, { name: 'Alho', cat: 'LEGUMES e FRUTAS' }, { name: 'Pimentões', cat: 'LEGUMES e FRUTAS' }, { name: 'Beringela', cat: 'LEGUMES e FRUTAS' }, { name: 'Cenoura', cat: 'LEGUMES e FRUTAS' }, { name: 'Batata', cat: 'LEGUMES e FRUTAS' }, { name: 'tomate cereja', cat: 'LEGUMES e FRUTAS' }, { name: 'salsinha', cat: 'LEGUMES e FRUTAS' }, { name: 'Milho', cat: 'LEGUMES e FRUTAS' }, { name: 'Cogumelos', cat: 'LEGUMES e FRUTAS' }, { name: 'Cebola', cat: 'LEGUMES e FRUTAS' }, { name: 'Brócolis', cat: 'LEGUMES e FRUTAS' }, { name: 'Tomate', cat: 'LEGUMES e FRUTAS' },
    { name: 'Queijo ralado', cat: 'LATICÍNIOS' }, { name: 'Queijo camembert', cat: 'LATICÍNIOS' }, { name: 'Requeijão', cat: 'LATICÍNIOS' }, { name: 'Queijo para a quiche', cat: 'LATICÍNIOS' }, { name: 'Banha de porco', cat: 'LATICÍNIOS' }, { name: 'Ovo', cat: 'LATICÍNIOS' }, { name: 'Manteiga', cat: 'LATICÍNIOS' }, { name: 'Leite integral', cat: 'LATICÍNIOS' }, { name: 'leite condensado', cat: 'LATICÍNIOS' }, { name: 'Iogurte (Mercadona)', cat: 'LATICÍNIOS' }, { name: 'Iogurte natural', cat: 'LATICÍNIOS' }, { name: 'Creme de leite fresco', cat: 'LATICÍNIOS' }, { name: 'Nescafe pingo doce', cat: 'LATICÍNIOS' }, { name: 'Leite magro', cat: 'LATICÍNIOS' }, { name: 'Presunto pinto doce', cat: 'LATICÍNIOS' }, { name: 'Queijos', cat: 'LATICÍNIOS' }, { name: 'Fiambre Pinto doce', cat: 'LATICÍNIOS' },
    { name: 'Desingordurante', cat: 'LIMPEZA' }, { name: 'Desentupidor', cat: 'LIMPEZA' }, { name: 'Sabão lavar roupa (Mercadona)', cat: 'LIMPEZA' }, { name: 'Lixívia', cat: 'LIMPEZA' }, { name: 'Sabonete', cat: 'LIMPEZA' }, { name: 'Pasta de dente', cat: 'LIMPEZA' }, { name: 'Detergente', cat: 'LIMPEZA' }, { name: 'Listerine', cat: 'LIMPEZA' }, { name: 'Desodorante', cat: 'LIMPEZA' }, { name: 'Amaciante', cat: 'LIMPEZA' }, { name: 'Saco de lixo', cat: 'LIMPEZA' }, { name: 'Papel higiénico Mercadona (2pcts)', cat: 'LIMPEZA' }, { name: 'Sabonete líquido para banheiro', cat: 'LIMPEZA' }, { name: 'Desinfetante', cat: 'LIMPEZA' }, { name: 'Lixívia para vaso', cat: 'LIMPEZA' }, { name: 'Papel toalha', cat: 'LIMPEZA' },
    { name: 'Massa de pizza', cat: 'CONGELADOS' }, { name: 'Batata congelada', cat: 'CONGELADOS' },
    { name: 'Molho barbecue', cat: 'MOLHOS e TEMPEROS' }, { name: 'Azeite', cat: 'MOLHOS e TEMPEROS' }, { name: 'Alho em pó', cat: 'MOLHOS e TEMPEROS' }, { name: 'Cebola em pó', cat: 'MOLHOS e TEMPEROS' }, { name: 'Sal', cat: 'MOLHOS e TEMPEROS' }, { name: 'Mostarda', cat: 'MOLHOS e TEMPEROS' }, { name: 'Vinagre', cat: 'MOLHOS e TEMPEROS' }, { name: 'Azeitonas para o bacalhau e petisco', cat: 'MOLHOS e TEMPEROS' }, { name: 'Salaminhos', cat: 'MOLHOS e TEMPEROS' }, { name: 'Catchup zero Mercadona', cat: 'MOLHOS e TEMPEROS' }, { name: 'Azeitonas anchovas (Mercadona)', cat: 'MOLHOS e TEMPEROS' }, { name: 'Pimenta do reino', cat: 'MOLHOS e TEMPEROS' }, { name: 'Óleo', cat: 'MOLHOS e TEMPEROS' }, { name: 'Maionese', cat: 'MOLHOS e TEMPEROS' }, { name: 'Tarrine Mercadona', cat: 'MOLHOS e TEMPEROS' }, { name: 'Molho de tomate', cat: 'MOLHOS e TEMPEROS' },
    { name: 'Cerveja', cat: 'BEBIDAS' }, { name: 'Água', cat: 'BEBIDAS' }, { name: 'Água das pedras', cat: 'BEBIDAS' }, { name: 'Refri', cat: 'BEBIDAS' },
    { name: 'Fubá', cat: 'GRÃOS E FARINHA' }, { name: 'Feijão', cat: 'GRÃOS E FARINHA' }, { name: 'Macarrão', cat: 'GRÃOS E FARINHA' }, { name: 'Arroz', cat: 'GRÃOS E FARINHA' }, { name: 'Açúcar', cat: 'GRÃOS E FARINHA' }, { name: 'Farinha de trigo', cat: 'GRÃOS E FARINHA' }, { name: 'Farinha de mandioca', cat: 'GRÃOS E FARINHA' }, { name: 'Batata palha', cat: 'GRÃOS E FARINHA' },
    { name: 'Wrap', cat: 'PÃES E BISCOITOS' }, { name: 'Pão Rustik', cat: 'PÃES E BISCOITOS' }, { name: 'Biscoito maria', cat: 'PÃES E BISCOITOS' }, { name: 'Pão rabanadas', cat: 'PÃES E BISCOITOS' }, { name: 'Biscoitos tabua frios', cat: 'PÃES E BISCOITOS' }, { name: 'Pão de forma', cat: 'PÃES E BISCOITOS' }, { name: 'torradas', cat: 'PÃES E BISCOITOS' },
    { name: 'Saco areia gato', cat: 'GATO' }, { name: 'Areia gato', cat: 'GATO' }, { name: 'Comida gato', cat: 'GATO' },
    { name: 'Atum', cat: 'ENLATADOS' }, { name: 'Chocolate branco e preto', cat: 'ENLATADOS' }, { name: 'Chili', cat: 'ENLATADOS' }, { name: 'Leite moça', cat: 'ENLATADOS' }, { name: 'Goiabada', cat: 'ENLATADOS' }, { name: 'Creme de leite light', cat: 'ENLATADOS' }, { name: 'Vela', cat: 'ENLATADOS' }
  ];
  return list.map(item => ({ ...item, has: true }));
}

function defaultState() {
  return {
    settings: { people: 3, marmitaDays: 5 },
    currentWeek: 1,
    myRecipes: [], 
    selectedLunches: [], 
    pantryStock: getInitialPantry(),
    shoppingList: [],
    invoices: [], 
    instagramInspirations: [], 
    tab: 'dashboard'
  };
}

function initAppState() {
  const saved = localStorage.getItem('Marmitas_Pro_Final_v5');
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
  saveTimer = setTimeout(() => localStorage.setItem('Marmitas_Pro_Final_v5', JSON.stringify(S)), 300);
}

function getAllRecipes() {
  return [...(S.myRecipes || []), ...DEFAULT_RECIPES, ...EXTRA_RECIPES];
}

function monthSpend() {
  const ym = new Date().toISOString().slice(0,7);
  if (!S.invoices) return 0;
  return S.invoices.filter(i => i && i.date && i.date.startsWith(ym)).reduce((sum, i) => sum + i.total, 0);
}
/* app.js — PARTE 4 */
window.switchTab = function(tab) { S.tab = tab; render(); };

window.registerInvoice = function() {
  const val = parseFloat(prompt("Valor total do talão do supermercado (€):"));
  if (isNaN(val) || val <= 0) return;
  S.invoices.push({ id: 'inv_'+Date.now(), date: new Date().toISOString().slice(0,10), total: val });
  save(); render();
};

// Gerador Automático Semanal solicitado
window.generateWeeklyMenu = function() {
  const all = getAllRecipes();
  if (all.length === 0) return;
  // Mistura e escolhe 4 pratos de sugestão aleatórios
  const shuffled = [...all].sort(() => 0.5 - Math.random());
  S.selectedLunches = shuffled.slice(0, 4).map(r => r.id);
  save(); render();
  alert("✨ Menu da semana gerado com sucesso!");
};

// Função para Incluir Nova Receita ou Alterar Existente
window.addNewRecipe = function() {
  const name = prompt("Nome da Receita:");
  if (!name) return;
  const cat = prompt("Categoria (ex: Almoço/Marmita, Lanches):", "Almoço/Marmita") || "Almoço/Marmita";
  const bimby = prompt("Modo Bimby (deixe em branco se não aplicável):") || "";
  const airfryer = prompt("Modo Airfryer (deixe em branco se não aplicável):") || "";
  
  const newRec = { id: 'my_' + Date.now(), name, cat, bimby, airfryer, isSuggestion: false, ings: [] };
  S.myRecipes.push(newRec);
  save(); render();
};

window.deleteCustomRecipe = function(id) {
  if (confirm("Tem a certeza que deseja apagar esta receita?")) {
    S.myRecipes = S.myRecipes.filter(r => r.id !== id);
    S.selectedLunches = S.selectedLunches.filter(x => x !== id);
    save(); render();
  }
};

// O Instagram como no modelo antigo: Guarda o Nome, Categoria e Link
window.addInstagramLink = function() {
  const name = prompt("Nome da receita do Instagram (ex: Pão de queijo):");
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

window.toggleSelectRecipe = function(id) {
  const idx = S.selectedLunches.indexOf(id);
  if (idx > -1) S.selectedLunches.splice(idx, 1);
  else S.selectedLunches.push(id);
  save(); render();
};
function renderDashboard() {
  const totalGasto = monthSpend();
  
  // Impede falhas caso as configurações das macros estejam vazias
  if (!S.settings) S.settings = {};
  if (!S.settings.kcalTu) S.settings.kcalTu = 1200;
  if (!S.settings.kcalEle) S.settings.kcalEle = 1800;
  if (!S.settings.protTu) S.settings.protTu = 135;
  if (!S.settings.protEle) S.settings.protEle = 200;

  // Recalcula o peso em kg com base nas macros ativas
  const carneNecessaria = ((S.settings.protTu * 6) + (S.settings.protEle * 6)) / 1000;
  const hidratosNecessarios = ((80 * 6) + (100 * 6)) / 1000;

  // NOVO MOTOR DO GERADOR: Sorteia 2 Frangos, 1 Carne, 1 Peixe e 2 Lanches sem repetir à toa
  window.generateWeeklyMenu = function() {
    const all = getAllRecipes();
    const frangos = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'frango' || r.name.toLowerCase().includes('frango')));
    const carnes = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'carne' || r.name.toLowerCase().includes('carne') || r.name.toLowerCase().includes('vaca') || r.name.toLowerCase().includes('porco') || r.name.toLowerCase().includes('almôndegas') || r.name.toLowerCase().includes('picadinho') || r.name.toLowerCase().includes('chili') || r.name.toLowerCase().includes('lombo') || r.name.toLowerCase().includes('jardineira') || r.name.toLowerCase().includes('empadão') || r.name.toLowerCase().includes('pato')));
    const peixes = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'peixe' || r.name.toLowerCase().includes('peixe') || r.name.toLowerCase().includes('bacalhau') || r.name.toLowerCase().includes('salmão') || r.name.toLowerCase().includes('atum')));
    const lanches = all.filter(r => r.cat === 'Lanches' || r.proteinType === 'lanche');

    let escolha = [];
    if (frangos.length >= 2) {
      const fSh = [...frangos].sort(() => 0.5 - Math.random());
      escolha.push(fSh[0].id, fSh[1].id);
    }
    if (carnes.length >= 1) {
      const cSh = [...carnes].sort(() => 0.5 - Math.random());
      escolha.push(cSh[0].id);
    }
    if (peixes.length >= 1) {
      const pSh = [...peixes].sort(() => 0.5 - Math.random());
      escolha.push(pSh[0].id);
    }
    
    if (lanches.length >= 2) {
      const lSh = [...lanches].sort(() => 0.5 - Math.random());
      S.selectedSnacks = [lSh[0].id, lSh[1].id];
    }

    // Se o sorteio misto correr bem, baralha os 4 pratos finais pelos dias
    if(escolha.length > 0) {
      S.selectedLunches = escolha.sort(() => 0.5 - Math.random());
    }
    save(); render();
    alert("✨ Ementa Semanal Equilibrada Gerada (Frango, Carne, Peixe e Lanches)!");
  };

  // Botão solicitado para alterar as macros tuas e dele diretamente no ecrã
  window.changeMacrosPrompt = function() {
    S.settings.kcalTu = parseInt(prompt("As tuas Calorias Diárias (Kcal):", S.settings.kcalTu)) || 1200;
    S.settings.protTu = parseInt(prompt("A tua Proteína por Marmita (g):", S.settings.protTu)) || 135;
    S.settings.kcalEle = parseInt(prompt("Calorias Diárias Dele (Kcal):", S.settings.kcalEle)) || 1800;
    S.settings.protEle = parseInt(prompt("Proteína Dele por Marmita (g):", S.settings.protEle)) || 200;
    save(); render();
  };

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const allRecs = getAllRecipes();
  
  return `
    <!-- 🩸 GUIA DE SAÚDE LIPEDEMA -->
    <div style="background:#fff0f6; border-left:5px solid #d62976; padding:15px; border-radius:8px; margin-bottom:15px;">
      <small style="color:#c2185b; font-weight:bold; display:block;">%🩺 GUIA DE SAÚDE & LIPEDEMA</small>
      <p style="margin:5px 0; font-size:12px; color:#555;">Alimentos ricos em potássio e antioxidantes anti-inflamatórios:</p>
      <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:5px;">
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:10px; padding:2px 6px; border-radius:4px;">Kiwi / Frutos Vermelhos / Abacate</span>
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:10px; padding:2px 6px; border-radius:4px;">Espinafres / Brócolos / Tomate</span>
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:10px; padding:2px 6px; border-radius:4px;">Salmão / Sardinha / Azeite</span>
      </div>
    </div>

    <!-- PAINEL DE METAS E BOTAO EDITÁVEL DE MACROS -->
    <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #eee;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <small style="color:#6c757d; font-weight:bold;">⚖️ METAS SEMANAIS DA FAMÍLIA</small>
        <button onclick="changeMacrosPrompt()" style="background:#f0f0f0; border:1px solid #ccc; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">⚙️ Alterar Macros</button>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
        <div style="background:#f1f3f5; padding:8px; border-radius:6px; text-align:center;">
          <b style="font-size:12px; display:block;">👩‍🍳 Tu (${S.settings.kcalTu} Kcal)</b>
          <span style="font-size:13px; font-weight:bold; color:#007bff;">${S.settings.protTu}g Proteína</span>
        </div>
        <div style="background:#f1f3f5; padding:8px; border-radius:6px; text-align:center;">
          <b style="font-size:12px; display:block;">👨‍🦱 Marido (${S.settings.kcalEle} Kcal)</b>
          <span style="font-size:13px; font-weight:bold; color:#6f42c1;">${S.settings.protEle}g Proteína</span>
        </div>
      </div>
    </div>

    <!-- GUIA DE COMPRAS DE MATÉRIA-PRIMA -->
    <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:15px; border:1px solid #eee; font-size:12px; line-height:1.5;">
      <b>📦 MATÉRIA-PRIMA PARA AS 12 MARMITAS:</b><br>
      🥩 Proteínas Totais: <span style="color:#28a745; font-weight:bold;">${carneNecessaria.toFixed(1)} kg</span> limpos.<br>
      🍚 Hidratos Totais: <span style="color:#007bff; font-weight:bold;">${hidratosNecessarios.toFixed(1)} kg</span> de base.
    </div>

    <!-- CONTROLO FINANCEIRO -->
    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:12px; border-radius:8px; margin-bottom:15px;">
      <h3 style="margin:0; font-size:14px; color:#28a745;">Gasto Real do Mês: €${totalGasto.toFixed(2)}</h3>
      <button onclick="registerInvoice()" style="background:#28a745; color:#fff; border:none; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; width:100%; margin-top:6px; font-size:12px;">Registar Talão</button>
    </div>

    <!-- CALENDÁRIO SEMANAL EXCLUSIVO DE SEGUNDA A SEXTA -->
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; box-shadow:0 2px 4px rgba(0,0,0,0.03);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0; color:#333; font-size:14px;">📅 Marmitas da Semana (Segunda a Sexta)</h3>
        <button onclick="generateWeeklyMenu()" style="background:#6f42c1; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;">✨ Gerar Menu Bruto</button>
      </div>
      
      ${S.selectedLunches.length === 0 ? '<p style="color:#888; font-size:12px; margin:0;">Clica em "Gerar Menu Bruto" para montar a semana.</p>' : ''}
      
      ${dias.map((dia, idx) => {
        const lunchId = S.selectedLunches[idx % S.selectedLunches.length];
        const snackId = S.selectedSnacks ? S.selectedSnacks[idx % S.selectedSnacks.length] : null;
        const lunchRec = allRecs.find(x => x.id === id ? id === lunchId : x.id === lunchId);
        const snackRec = allRecs.find(x => x.id === id ? id === snackId : x.id === snackId);

        return `
          <div style="padding:10px 0; border-bottom:1px solid #f5f5f5; font-size:13px;">
            <b style="color:#007bff; display:block; margin-bottom:2px;">📅 ${dia}:</b>
            <div style="padding-left:10px; color:#333;">
              🍱 Almoço: <b>${lunchRec ? lunchRec.name : 'Não definido'}</b><br>
              🥛 Lanche: <span style="color:#555;">${snackRec ? snackRec.name : 'Não definido'}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderRecipes() {
  const all = getAllRecipes();
  
  // Filtra as receitas em tempo real com base no que digitares na barra
  const query = (S.searchQuery || '').toLowerCase().trim();
  const filtered = all.filter(r => r.name.toLowerCase().includes(query) || (r.cat || '').toLowerCase().includes(query));

  // Função para pesquisar letra a letra sem travar a escrita do telemóvel
  window.executeSearch = function(txt) {
    S.searchQuery = txt;
    save(); render();
    setTimeout(() => {
      const input = document.getElementById('recipe-search-bar');
      if (input) { input.focus(); input.setSelectionRange(txt.length, txt.length); }
    }, 50);
  };

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <h3 style="margin:0; color:#333;">❤️ Receitas Favoritas (${filtered.length})</h3>
      <button onclick="addNewRecipe()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">➕ Incluir Nova</button>
    </div>

    <!-- BARRA DE PESQUISA SIMPLES SOLICITADA -->
    <div style="margin-bottom:15px;">
      <input type="text" id="recipe-search-bar" placeholder="🔍 Pesquisar receita (ex: frango, lanche, carne)..." value="${S.searchQuery || ''}" oninput="executeSearch(this.value)" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
    </div>

    ${filtered.map(r => `
      <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.01);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:14px; color:#222; max-width:70%; display:block;">${r.name}</b>
          <div style="display:flex; gap:5px;">
            <button onclick="toggleSelectRecipe('${r.id}')" style="background:${S.selectedLunches.includes(r.id) || (S.selectedSnacks && S.selectedSnacks.includes(r.id)) ? '#dc3545':'#28a745'}; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
              ${S.selectedLunches.includes(r.id) || (S.selectedSnacks && S.selectedSnacks.includes(r.id)) ? 'Remover' : 'Escolher'}
            </button>
            ${!r.isSuggestion && !r.isFromInstagram ? `<button onclick="deleteCustomRecipe('${r.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px;">❌</button>` : ''}
          </div>
        </div>
        <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
          <span style="background:#e9ecef; color:#495057; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">${r.cat}</span>
          ${r.bimby ? '<span style="background:#20c997; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🤖 Bimby</span>' : ''}
          ${r.airfryer ? '<span style="background:#fd7e14; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🍟 Airfryer</span>' : ''}
        </div>
        
        ${r.link ? `<div style="margin-top:8px;"><a href="${r.link}" target="_blank" style="color:#d62976; font-size:12px; font-weight:bold; text-decoration:none;">➡️ Ver Vídeo do Instagram</a></div>` : ''}

        <!-- DETALHES DE INGREDIENTES E PREPARO SEMPRE VISÍVEIS -->
        <div style="background:#f8f9fa; padding:10px; font-size:12px; border-radius:6px; margin-top:8px; border:1px solid #f0f0f0; color:#444; line-height:1.4;">
          <p style="margin:0 0 6px 0;"><b>🛒 Ingredientes:</b> ${r.ings || 'Peito de frango, vegetais e temperos a gosto.'}</p>
          <p style="margin:0;"><b>👩‍🍳 Passo a Passo:</b> ${r.steps || 'Grelhar ou estufar os ingredientes com os vossos temperos favoritos.'}</p>
        </div>
      </div>
    `).join('')}
  `;
}

function renderPantry() {
  const groups = {};
  S.pantryStock.forEach(item => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push(item);
  });

  return `
    <h3 style="margin-top:0; color:#333;">🗄️ Organização da Despensa</h3>
    <p style="color:#6c757d; font-size:12px; margin-bottom:15px;">Toca em "Tenho" ou "Falta" para gerir o armário da cozinha.</p>
    ${Object.keys(groups).map(cat => `
      <div style="margin-bottom:20px;">
        <b style="color:#495057; font-size:12px; text-transform:uppercase; display:block; margin-bottom:8px; letter-spacing:0.5px;">${cat}</b>
        ${groups[cat].map(item => {
          const globalIdx = S.pantryStock.findIndex(x => x.name === item.name);
          return `
            <div style="padding:10px; border-radius:6px; margin-bottom:5px; border:1px solid #f0f0f0; background:#fff; display:flex; justify-content:space-between; align-items:center;">
              <span style="text-decoration: ${item.has ? 'none' : 'line-through'}; color: ${item.has ? '#333' : '#aaa'}; font-weight:600; font-size:13px;">${item.name}</span>
              <button onclick="togglePantry(${globalIdx})" style="background:${item.has ? '#28a745':'#dc3545'}; color:#fff; border:none; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
                ${item.has ? '✅ Tenho' : '❌ Falta'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `).join('')}
  `;
}
/* app.js — PARTE 6 */

function renderInstagram() {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">📸 Links do Instagram</h3>
      <button onclick="addInstagramLink()" style="background:#d62976; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">🔗 Guardar Link</button>
    </div>
    
    <div style="background:#fff; padding:10px; border-radius:8px; border:1px solid #eee;">
      ${S.instagramInspirations.map(item => `
        <div style="padding:12px 0; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:14px; color:#333;">
            <b>${item.name}</b> - <span style="color:#6c757d;">${item.category}</span> - 
            <a href="${item.link}" target="_blank" style="color:#d62976; font-weight:bold; text-decoration:none;">Link</a>
          </div>
          <button onclick="deleteInstagramLink('${item.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px;">❌</button>
        </div>
      `).join('')}
      ${S.instagramInspirations.length === 0 ? '<p style="color:#888; font-size:13px; margin:0; padding:10px 0;">Nenhuma inspiração guardada. Clica em "Guardar Link".</p>' : ''}
    </div>
  `;
}

function render() {
  const root = document.getElementById('app-root') || document.body;
  if (!root) return;

  let view = renderDashboard();
  if (S.tab === 'recipes') view = renderRecipes();
  if (S.tab === 'pantry') view = renderPantry();
  if (S.tab === 'shopping') view = renderShopping();
  if (S.tab === 'instagram') view = renderInstagram();

  root.innerHTML = `
    <nav style="display:grid; grid-template-columns: repeat(5, 1fr); background:#111; color:#fff; font-size:11px; text-align:center; font-weight:bold; border-bottom:3px solid #007bff; font-family:sans-serif;">
      <div onclick="switchTab('dashboard')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='dashboard'?'#007bff':''};">📋 Painel</div>
      <div onclick="switchTab('recipes')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='recipes'?'#007bff':''};">📖 Receitas</div>
      <div onclick="switchTab('pantry')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='pantry'?'#007bff':''};">🗄️ Stock</div>
      <div onclick="switchTab('shopping')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='shopping'?'#007bff':''};">🛒 Compras</div>
      <div onclick="switchTab('instagram')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='instagram'?'#007bff':''};">📸 Insta</div>
    </nav>
    <div style="padding:15px; max-width:600px; margin:0 auto; font-family:sans-serif; background:#f8f9fa; min-height:100vh; box-sizing:border-box;">
      ${view}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initAppState);
if (document.readyState === "complete" || document.readyState === "interactive") { initAppState(); }
