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
/* app.js — PARTE 5 */
function renderDashboard() {
  const totalGasto = monthSpend();
  
  // Garante que todas as configurações de macros existem na memória ou assume o padrão
  if (!S.settings) S.settings = {};
  if (!S.settings.kcalTu) S.settings.kcalTu = 1200;
  if (!S.settings.kcalEle) S.settings.kcalEle = 1800;
  if (!S.settings.protTu) S.settings.protTu = 135; 
  if (!S.settings.protEle) S.settings.protEle = 200; 
  if (!S.settings.carboTu) S.settings.carboTu = 80;   // Teu carboidrato padrão por marmita
  if (!S.settings.carboEle) S.settings.carboEle = 100; // Carboidrato dele padrão por marmita

  // AGORA OS HIDRATOS SÃO DINÂMICOS: recalculam automaticamente com base no que definires
  const carneNecessaria = ((S.settings.protTu * 6) + (S.settings.protEle * 6)) / 1000; 
  const hidratosNecessarios = ((S.settings.carboTu * 6) + (S.settings.carboEle * 6)) / 1000; 

  // Função do botão atualizada para incluir também a edição dos hidratos/carbos
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

  return `
    <!-- 🩸 BLOCO DE SAÚDE: ALIMENTAÇÃO LIPEDEMA -->
    <div style="background:#fff0f6; border-left:5px solid #d62976; padding:15px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
      <small style="color:#c2185b; font-weight:bold; display:block;">%🩺 GUIA DE SAÚDE & LIPEDEMA</small>
      <p style="margin:5px 0; font-size:12px; color:#555; line-height:1.4;">
        Para controlar a inflamação e a retenção, foca em alimentos ricos em <b>potássio e antioxidantes</b>. 
        Tenta incluir no teu stock semanal:
      </p>
      <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:11px; padding:2px 6px; border-radius:4px; font-weight:500;">🥝 Kiwi / Frutos Vermelhos</span>
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:11px; padding:2px 6px; border-radius:4px; font-weight:500;">🥑 Abacate / Espinafres</span>
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:11px; padding:2px 6px; border-radius:4px; font-weight:500;">🥦 Brócolos / Beterraba</span>
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:11px; padding:2px 6px; border-radius:4px; font-weight:500;">🐟 Salmão / Sardinha</span>
        <span style="background:#fff; border:1px solid #f8bbd0; color:#c2185b; font-size:11px; padding:2px 6px; border-radius:4px; font-weight:500;">🫒 Azeite / Tomate</span>
      </div>
    </div>

    <!-- 📊 PAINEL DE METAS METABÓLICAS COM BOTÃO DE CONFIGURAÇÃO -->
    <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #eee; box-shadow:0 2px 4px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <small style="color:#6c757d; font-weight:bold; text-transform:uppercase; letter-spacing:0.5px;">⚖️ METAS SEMANAIS DA FAMÍLIA</small>
        <button onclick="changeMacrosPrompt()" style="background:#f0f0f0; border:1px solid #ccc; padding:3px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">⚙️ Alterar</button>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:10px;">
        <div style="background:#f1f3f5; padding:10px; border-radius:6px; text-align:center;">
          <b style="font-size:13px; color:#333; display:block;">👩‍🍳 A tua Ementa</b>
          <span style="font-size:16px; font-weight:bold; color:#007bff;">${S.settings.kcalTu} Kcal</span>
          <small style="display:block; font-size:10px; color:#666; margin-top:4px;">🍗 ${S.settings.protTu}g Prot<br>🥦 40% Legumes<br>🍚 ${S.settings.carboTu}g Hidratos</small>
        </div>
        <div style="background:#f1f3f5; padding:10px; border-radius:6px; text-align:center;">
          <b style="font-size:13px; color:#333; display:block;">👨‍🦱 Marido (6 Marmitas)</b>
          <span style="font-size:16px; font-weight:bold; color:#6f42c1;">${S.settings.kcalEle} Kcal</span>
          <small style="display:block; font-size:10px; color:#666; margin-top:4px;">🥩 ${S.settings.protEle}g Prot<br>🥦 40% Legumes<br>🍚 ${S.settings.carboEle}g Hidratos</small>
        </div>
      </div>
    </div>

    <!-- 🛒 WIDGET DE GESTÃO DE COMPRAS EM MASSA -->
    <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #eee; box-shadow:0 2px 4px rgba(0,0,0,0.04);">
      <small style="color:#6c757d; font-weight:bold; display:block; text-transform:uppercase; letter-spacing:0.5px;">📦 GUIA DE COMPRAS DE MATÉRIA-PRIMA</small>
      <p style="margin:5px 0 12px 0; font-size:12px; color:#666;">Para garantires <b>12 marmitas</b> variadas com 2 a 3 tipos de proteína diferentes:</p>
      <div style="font-size:13px; color:#333; line-height:1.6;">
        🔸 <b>Proteínas Totais:</b> Compra pelo menos <span style="color:#28a745; font-weight:bold;">${carneNecessaria.toFixed(1)} kg</span> de carne/peixe limpos.<br>
        🔸 <b>Hidratos Totais:</b> Prepara aprox. <span style="color:#007bff; font-weight:bold;">${hidratosNecessarios.toFixed(1)} kg</span> de base (Arroz/Batata/Feijão).<br>
        🔸 <b>Legumes Totais:</b> Garante uma proporção de 40% de vegetais ao vapor ou assados.
      </div>
    </div>

    <!-- 💰 CONTROLO MONETÁRIO SIMPLIFICADO -->
    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:15px; border-radius:8px; margin-bottom:15px;">
      <small style="color:#6c757d; font-weight:bold; display:block;">💰 GASTOS REAIS REGISTADOS DESTE MÊS</small>
      <h2 style="margin:5px 0 10px 0; color:#28a745;">€${totalGasto.toFixed(2)}</h2>
      <button onclick="registerInvoice()" style="background:#28a745; color:#fff; padding:8px 12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; width:100%; font-size:13px;">Registar Fatura do Lidl / Continente / Mercadona</button>
    </div>

    <!-- 🍱 SELEÇÃO SEMANAL -->
    <div style="background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05); border:1px solid #eee;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h3 style="margin:0; color:#333; font-size:15px;">🍱 Menu Escolhido para a Semana</h3>
        <button onclick="generateWeeklyMenu()" style="background:#6f42c1; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✨ Gerar Menu Aleatório</button>
      </div>
      ${S.selectedLunches.length === 0 ? '<p style="color:#888; font-size:13px; margin:0;">Nenhum prato escolhido. Clica em "Gerar Menu Aleatório" para rodar as tuas sugestões sem repetir carnes.</p>' : ''}
      <ul style="padding-left:20px; margin:0; font-size:14px;">
        ${S.selectedLunches.map(id => {
          const r = getAllRecipes().find(x => x.id === id);
          return r ? `<li style="padding:4px 0; color:#333; font-weight:500;">${r.name}</li>` : '';
        }).join('')}
      </ul>
    </div>
  `;
}

function renderRecipes() {
  const all = getAllRecipes();
  
  // Filtra as receitas em tempo real com base na barra de pesquisa
  const query = (S.searchQuery || '').toLowerCase().trim();
  const filtered = all.filter(r => r.name.toLowerCase().includes(query) || (r.cat || '').toLowerCase().includes(query));

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">❤️ Receitas Favoritas (${filtered.length})</h3>
      <button onclick="addNewRecipe()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">➕ Incluir Receita</button>
    </div>
    
    ${filtered.map(r => `
      <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:12px; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:14px; color:#222; max-width:70%; display:block;">${r.name}</b>
          <div style="display:flex; gap:5px;">
            <button onclick="toggleSelectRecipe('${r.id}')" style="background:${S.selectedLunches.includes(r.id)?'#dc3545':'#28a745'}; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
              ${S.selectedLunches.includes(r.id) ? 'Remover' : 'Escolher'}
            </button>
            ${!r.isSuggestion && !r.isFromInstagram ? `<button onclick="deleteCustomRecipe('${r.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px;">❌</button>` : ''}
          </div>
        </div>
        
        <div style="margin-top:8px; display:flex; gap:5px; flex-wrap:wrap;">
          <span style="background:#e9ecef; color:#495057; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">${r.cat}</span>
          ${r.isSuggestion ? '<span style="background:#e2f0d9; color:#155724; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">💡 Sistema</span>' : ''}
          ${r.isFromInstagram ? '<span style="background:#fce4ec; color:#c2185b; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">📸 Insta</span>' : ''}
          ${r.bimby ? '<span style="background:#20c997; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🤖 Bimby</span>' : ''}
          ${r.airfryer ? '<span style="background:#fd7e14; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🍟 Airfryer</span>' : ''}
        </div>
        
        ${r.link ? `<div style="margin-top:8px;"><a href="${r.link}" target="_blank" style="color:#d62976; font-size:12px; font-weight:bold; text-decoration:none;">➡️ Ver Vídeo da Receita</a></div>` : ''}

        <!-- 🛒 SECÇÃO DE INGREDIENTES SEMPRE VISÍVEL -->
        <div style="background:#f8f9fa; padding:10px; font-size:12px; border-radius:6px; margin-top:10px; border:1px solid #f0f0f0; color:#444; line-height:1.4;">
          <div style="margin-bottom:4px;">
            <b>🛒 Ingredientes necessários:</b>
            <span style="color:#555;">
              ${r.ings && typeof r.ings === 'string' ? r.ings : ''}
              ${r.ings && Array.isArray(r.ings) ? r.ings.map(i => `${i.name} (${i.qty}${i.unit})`).join(', ') : ''}
              ${!r.ings || (Array.isArray(r.ings) && r.ings.length === 0) ? 'Peito de frango, vegetais e temperos básicos a gosto.' : ''}
            </span>
          </div>
          ${r.steps ? `<div><b>👩‍🍳 Modo de Fazer:</b> <span style="color:#555;">${r.steps}</span></div>` : ''}
        </div>

        ${r.bimby || r.airfryer ? `
          <div style="background:#eefaf6; padding:8px; font-size:12px; border-radius:4px; margin-top:8px; border:1px solid #d1ebd9; color:#2b573e;">
            ${r.bimby ? `<b>🤖 Instruções Bimby:</b> ${r.bimby}<br>` : ''}
            ${r.airfryer ? `<b>🍟 Instruções Airfryer:</b> ${r.airfryer}` : ''}
          </div>
        ` : ''}
      </div>
    `).join('')}
  `;
}

function renderPantry() {
  const groups = {};
  
  // Agrupa os itens guardando com precisão o seu índice de mapeamento do array real
  S.pantryStock.forEach((item, index) => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push({ ...item, realIndex: index });
  });

  return `
    <h3 style="margin-top:0; color:#333;">🗄️ Organização da Despensa</h3>
    <p style="color:#6c757d; font-size:12px; margin-bottom:15px;">Toca em "Tenho" ou "Falta" para gerir o armário da cozinha.</p>
    ${Object.keys(groups).map(cat => `
      <div style="margin-bottom:20px;">
        <b style="color:#495057; font-size:12px; text-transform:uppercase; display:block; margin-bottom:8px; letter-spacing:0.5px;">${cat}</b>
        ${groups[cat].map(item => `
          <div style="padding:10px; border-radius:6px; margin-bottom:5px; border:1px solid #f0f0f0; background:#fff; display:flex; justify-content:space-between; align-items:center;">
            <span style="text-decoration: ${item.has ? 'none' : 'line-through'}; color: ${item.has ? '#333' : '#aaa'}; font-weight:600; font-size:13px;">${item.name}</span>
            <button onclick="togglePantry(${item.realIndex})" style="background:${item.has ? '#28a745':'#dc3545'}; color:#fff; border:none; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
              ${item.has ? '✅ Tenho' : '❌ Falta'}
            </button>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

/* app.js — PARTE 6 */
function renderShopping() {
  const missingFromPantry = S.pantryStock.filter(x => !x.has);

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
      <h3 style="margin:0; color:#333;">🛒 Lista de Compras</h3>
      <button onclick="addCustomShoppingItem()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:13px;">➕ Artigo Extra</button>
    </div>
    
    <b style="color:#495057; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">🚨 Falta na Despensa (Aviso Automático):</b>
    <div style="background:#fff; padding:10px; border-radius:8px; border:1px solid #eee; margin-bottom:20px;">
      ${missingFromPantry.length === 0 ? '<p style="color:#28a745; font-size:12px; margin:0; font-weight:bold;">✅ Armário abastecido! Nada em falta.</p>' : ''}
      <ul style="padding-left:15px; margin:0; font-size:13px; color:#c82333;">
        ${missingFromPantry.map(i => `<li style="padding:3px 0; font-weight:600;">${i.name} <small style="color:#6c757d;">(${i.cat})</small></li>`).join('')}
      </ul>
    </div>

    <b style="color:#495057; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">🏡 Outras Coisas / Lista do Supermercado:</b>
    <div style="background:#fff; padding:5px 12px; border-radius:8px; border:1px solid #eee;">
      ${S.shoppingList.map(item => `
        <div style="padding:10px 0; border-bottom:1px solid #f5f5f5; display:flex; align-items:center; gap:10px;">
          <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleShoppingItem('${item.id}')" style="transform: scale(1.2); cursor:pointer;"> 
          <span style="text-decoration:${item.done ? 'line-through' : 'none'}; color:${item.done ? '#aaa' : '#333'}; font-weight:500; font-size:14px;">${item.name}</span> 
          <span style="background:#e9ecef; color:#495057; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:bold; margin-left:auto;">${item.cat}</span>
        </div>
      `).join('')}
      ${S.shoppingList.length === 0 ? '<p style="color:#888; font-size:12px; padding:10px 0; margin:0;">Nenhum artigo extra adicionado.</p>' : ''}
    </div>
  `;
}

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
      <div onclick="switchTab('recipes')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='recipes'?'#007bff':''};">📖 Livro</div>
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
