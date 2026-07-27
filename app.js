/* app.js — VERSÃO COMPLETA E FUNCIONAL */
'use strict';

const DEFAULT_RECIPES = [
  { id: 'f_desfiado', name: 'Frango desfiado tradicional', cat: 'Almoço/Marmita', bimby: 'Programe 5 seg/Vel 4 Invertida para desfiar o frango cozido.', airfryer: '', calories: 280, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Sal, Água', steps: 'Cozinhe o frango e desfie.' },
  { id: 'f_mexicano', name: 'Frango mexicano', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Pimentões coloridos, Milho, Cebola', steps: 'Refogue tudo junto.' },
  { id: 'f_oriental', name: 'Frango oriental', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 330, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Molho de soja, Gengibre', steps: 'Salteie rapidamente.' },
  { id: 'f_xadrez', name: 'Frango xadrez', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 340, protein: 36, isSuggestion: true, ings: 'Peito de Frango (500g), Pimenta, Castanha', steps: 'Refogue com os temperos.' },
  { id: 'f_caril', name: 'Frango de caril', cat: 'Almoço/Marmita', bimby: 'Prepare o molho de caril na vel 2 a 90°C.', airfryer: '', calories: 350, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Caril, Leite de coco', steps: 'Cozinhe no molho.' },
  { id: 'f_cremoso', name: 'Frango cremoso', cat: 'Almoço/Marmita', bimby: 'Misture o queijo creme na vel 4.', airfryer: '', calories: 290, protein: 33, isSuggestion: true, ings: 'Peito de Frango (500g), Queijo creme, Nata', steps: 'Refogue e tempere.' },
  { id: 'f_strogonoff', name: 'Strogonoff saudável', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 300, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Cogumelos, Iogurte grego', steps: 'Faça o molho cremoso.' },
  { id: 'f_mediterran', name: 'Frango mediterrânico', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Cozinhe a 190°C por 15 min.', calories: 295, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Tomate, Azeitona', steps: 'Asse com temperos.' },
  { id: 'f_mostarda', name: 'Frango mostarda', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Mostarda, Mel', steps: 'Marinada e cozinhe.' },
  { id: 'f_limao', name: 'Frango com limão', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Grelhe a 180°C por 12 min.', calories: 270, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Limão, Alho', steps: 'Grelhe com limão fresco.' }
];

const EXTRA_RECIPES = [
    {
    id: 'rita_rosbife_pure',
    name: 'Rosbife na Air Fryer com puré de abóbora e vagem chamuscada',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: 'Prepare o puré na Bimby: 25 min/90°C/Vel 1, depois triture.',
    airfryer: 'Rosbife a 200°C por 15 min. Vagem a 200°C por 8 min.',
    isSuggestion: true,
    ings: 'Lagarto de vaca (500g), Abóbora limpa (400g), Vagem francesa (200g), Azeite, Alho, Alecrim, Sal, Pimenta',
    steps: 'Tempere o lagarto com azeite, alho, alecrim, sal e pimenta. Sele na Air Fryer. Asse a abóbora temperada e triture para fazer o puré. Salteie ou asse as vagens na Air Fryer até ficarem levemente tostadas/chamuscadas.'
  },
  {
    id: 'rita_rosbife_lagarto',
    name: 'Rosbife de lagarto na Air Fryer da Rita Lobo',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: '',
    airfryer: 'Asse a 200°C por 12-15 min para o ponto rosado.',
    isSuggestion: true,
    ings: 'Lagarto de vaca (500g), Azeite, Sal, Pimenta-preta moída',
    steps: 'Retire a carne do frio 30 minutos antes. Pincele com azeite e tempere generosamente com sal e pimenta. Pré-aqueça a Air Fryer e asse a carne virando a meio do tempo. Deixe descansar 10 minutos antes de fatiar fino.'
  },
  {
    id: 'rita_almondega_tomate',
    name: 'Almôndega com molho de tomate na Air Fryer da Rita Lobo',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: 'Pode preparar o molho de tomate na Bimby.',
    airfryer: 'Cozinhe as almôndegas a 180°C por 10 min.',
    isSuggestion: true,
    ings: 'Carne picada de vaca ou mistura (400g), Cebola, Alho, Polpa de tomate (1 lata), Azeite, Sal, Ervas aromáticas',
    steps: 'Tempere a carne com cebola e alho picados e sal. Molde as almôndegas e leve à Air Fryer até dourarem. À parte, apure o molho de tomate numa panela. Junte as almôndegas ao molho e envolva bem antes de enfrascar.'
  },
  {
    id: 'rita_escondidinho_polenta',
    name: 'Escondidinho de carne e polenta com abóbora',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: 'Prepare a polenta cremosa na Bimby.',
    airfryer: 'Pode usar para gratinar o queijo no topo a 200°C por 5 min.',
    isSuggestion: true,
    ings: 'Carne picada refogada (400g), Sêmola de milho para polenta, Abóbora cozida e esmagada (200g), Molho de tomate, Queijo ralado',
    steps: 'Refogue a carne com o molho de tomate. Prepare a polenta misturando a sêmola com água, sal e o puré de abóbora até ficar cremosa. Num pirex, monte a base de carne e cubra com a polenta de abóbora. Polvilhe queijo e leve a dourar.'
  },
  {
    id: 'rita_escondidinho_mandioca',
    name: 'Escondidinho de mandioca com costela desfiada',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: '',
    airfryer: '',
    isSuggestion: true,
    ings: 'Costela de vaca cozida e desfiada (400g), Mandioca cozida (500g), Leite magro ou bebida vegetal, Cebola, Alho, Tomate picado, Azeite',
    steps: 'Refogue a costela desfiada com cebola, alho e tomate até ficar suculenta. Triture a mandioca cozida morna com um pouco de leite e azeite para fazer um puré firme. Num recipiente, disponha a carne e cubra com o puré de mandioca.'
  },
  {
    id: 'rita_bife_role',
    name: 'Bife rolê (bracciola)',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: '',
    airfryer: '',
    isSuggestion: true,
    ings: 'Bifes finos de vaca (4 unidades), Cenoura em tiras, Pimento em tiras, Bacon ou chouriço magro, Molho de tomate, Palitos de madeira',
    steps: 'Abra os bifes e tempere com sal. Coloque uma tira de cenoura, pimento e bacon no centro de cada um. Enrole e prenda com palitos. Sele os rolos numa panela quente com azeite, junte o molho de tomate e estufe tapado até a carne ficar macia.'
  },
  {
    id: 'rita_carne_panela',
    name: 'Carne de panela com batata e cenoura na pressão',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: '',
    airfryer: '',
    isSuggestion: true,
    ings: 'Carne de vaca para estufar (500g) in cubos, Batatas (3), Cenouras (2), Cebola, Alho, Polpa de tomate, Louro, Vinho branco',
    steps: 'Na panela de pressão, doure a carne no azeite. Adicione a cebola, o alho, o louro, a polpa de tomate e o vinho. Feche a pressão e cozinhe por 25 min. Abra, junte as batatas e cenouras em pedaços e cozinhe mais 5 a 7 min na pressão.'
  },
  {
    id: 'rita_geleia_morango',
    name: 'Geleia de morango caseira',
    cat: 'Lanches',
    proteinType: 'lanche',
    bimby: 'Programe 20 min/95°C/Vel 2 sem o copo de medida.',
    airfryer: '',
    isSuggestion: true,
    ings: 'Morangos frescos limpos (500g), Sumo de limão (1/2), Açúcar mascavado ou adoçante próprio para culinária (100g)',
    steps: 'Corte os morangos em pedaços. Coloque numa panela com o açúcar/adoçante e o sumo de limão. Deixe cozinhar em lume brando, mexendo de vez em quando e esmagando os frutos com a colher, até atingir o ponto de estrada e engrossar.'
  },
  {
    id: 'rita_frango_limao',
    name: 'Frango assado com limão-siciliano e ervas',
    cat: 'Almoço/Marmita',
    proteinType: 'frango',
    bimby: '',
    airfryer: 'Pode assar coxas ou peito a 180°C por 20 min.',
    isSuggestion: true,
    ings: 'Pedaços de frango (500g), Limão-siciliano (1), Alho, Alecrim, Tomilho, Azeite, Sal, Pimenta',
    steps: 'Corte o limão em rodelas. Marine o frango com o sumo de metade do limão, azeite, os dentes de alho esmagados, alecrim, tomilho, sal e pimenta. Disponha numa assadeira com as rodelas de limão e leve ao forno a 200°C até dourar.'
  },
  {
    id: 'rita_strogonofe_frango',
    name: 'Estrogonofe de frango tradicional',
    cat: 'Almoço/Marmita',
    proteinType: 'frango',
    bimby: '',
    airfryer: '',
    isSuggestion: true,
    ings: 'Peito de frango (500g) em cubos, Cogumelos laminados (200g), Cebola, Polpa de tomate, Mostarda, Pacote de natas light ou iogurte grego natural',
    steps: 'Refogue a cebola e doure os cubos de frango. Adicione os cogumelos e salteie. Junte a polpa de tomate e a mostarda, deixando apurar. Desligue o lume, envolva as natas light ou o iogurte grego morno e sirva com arroz seco.'
  },
  {
    id: 'rita_frango_milanesa',
    name: 'Frango à milanesa estaladiço',
    cat: 'Almoço/Marmita',
    proteinType: 'frango',
    bimby: '',
    airfryer: 'Asse a 200°C por 12-15 min até ficar dourado e crocante.',
    isSuggestion: true,
    ings: 'Bifes finos de peito de frango (400g), Ovo (1), Farinha de rosca integral ou Panko, Sal, Alho em pó, Paprika',
    steps: 'Tempere os bifes de frango com sal, alho em pó e paprika. Passe os bifes pelo ovo batido e de seguida pela farinha de rosca, pressionando bem para agarrar. Disponha no cesto da Air Fryer com um fio leve de azeite e asse.'
  },
  {
    id: 'rita_bife_parmegiana',
    name: 'Bife à parmegiana leve',
    cat: 'Almoço/Marmita',
    proteinType: 'carne',
    bimby: '',
    airfryer: 'Monte e gratine a 200°C por 5 min.',
    isSuggestion: true,
    ings: 'Bifes de vaca finos panados (4 unidades), Molho de tomate caseiro (200ml), Queijo mozarela ralado ou fatiado, Orégãos',
    steps: 'Prepare os bifes (pode fazê-los na Air Fryer estilo milanesa). Coloque-os num pirex ou bandeja, cubra cada bife com colheres generosas de molho de tomate quente e cubra com a mozarela. Polvilhe orégãos e leve a gratinar.'
  },

  { id: 'm_feij_1', name: 'Frango grelhado + arroz + feijão preto + brócolos', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: 'Grelhe o frango a 180°C por 12 min.', isSuggestion: true, ings: 'Frango, arroz, feijão preto, brócolos' },
  { id: 'm_feij_2', name: 'Picadinho de carne + arroz + feijão carioca + cenoura', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne picada, arroz, feijão carioca, cenoura' },
  { id: 'm_feij_3', name: 'Carne de panela + arroz + feijão vermelho + couve', cat: 'Almoço/Marmita', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne, arroz, feijão vermelho, couve' },
  { id: 'm_feij_4', name: 'Almôndegas caseiras + arroz + feijão + feijão-verde', cat: 'Almoço/Marmita', bimby: 'Faça o molho na vel 2.', airfryer: 'Asse as almôndegas a 200°C por 10 min.', isSuggestion: true, ings: 'Carne, pão ralado, ovo, arroz, feijão' },
  { id: 'm_feij_5', name: 'Frango desfiado + arroz + feijão tropeiro light', cat: 'Almoço/Marmita', bimby: 'Desfie o frango vel 4 invertida.', airfryer: '', isSuggestion: true, ings: 'Frango, arroz, feijão, linguiça' },
  { id: 'm_feij_6', name: 'Salmão com arroz e legumes', cat: 'Almoço/Marmita', bimby: 'Cozinhe os legumes na Varoma.', airfryer: 'Cozinhe o salmão a 180°C por 10 min.', isSuggestion: true, ings: 'Salmão, arroz, legumes variados' },
  { id: 'm_feij_7', name: 'Bife acebolado + arroz + feijão + abóbora assada', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Asse a abóbora a 200°C por 15 min.', isSuggestion: true, ings: 'Bife, cebola, arroz, feijão, abóbora' },
  { id: 'l_skyr', name: 'Iogurte Skyr + frutos vermelhos', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: 'Skyr, frutos vermelhos' },
  { id: 'l_queijo', name: 'Queijo fresco + tomate', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: 'Queijo fresco, tomate, azeite' },
  { id: 'l_atum', name: 'Sandes de atum + salada', cat: 'Lanches', bimby: '', airfryer: '', isSuggestion: true, ings: 'Atum, pão integral, salada, tomate' }
];

let S = null;
let saveTimer = null;

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
  return list.map(item => ({ ...item, has: true, status: 'tenho' }));
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
    tab: 'dashboard',
    cartList: []
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
  if (!S.cartList) S.cartList = [];

  render();
}

function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => localStorage.setItem('Marmitas_Pro_Final_v25', JSON.stringify(S)), 300);
}

function getAllRecipes() {
  const igRecipes = (S.instagramInspirations || []).map(ig => ({
    id: ig.id, 
    name: '📸 ' + ig.name,
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

window.setPantryStatus = function(index, newStatus) {
  if (!S.pantryStock || !S.pantryStock[index]) return;
  const item = S.pantryStock[index];
  
  item.status = newStatus;
  if (newStatus === 'tenho') {
    item.has = true;
  } else if (newStatus === 'falta') {
    item.has = false;
  } else if (newStatus === 'nao_usar') {
    item.has = true;
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

  const dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  const allRecs = getAllRecipes();

  return `
    <!-- 🩸 BLOCO DE SAÚDE: ALIMENTAÇÃO LIPEDEMA -->
    <div style="background:#fff0f6; border-left:5px solid #d62976; padding:15px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
      <small style="color:#c2185b; font-weight:bold; display:block;">🩺 GUIA DE SAÚDE & LIPEDEMA</small>
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
          <small style="display:block; font-size:10px; color:#666; margin-top:4px;">🍗 120g Prot<br>🥦 40% Legumes<br>🍚 ${S.settings.carboTu}g Hidratos</small>
        </div>
        <div style="background:#f1f3f5; padding:10px; border-radius:6px; text-align:center;">
          <b style="font-size:13px; color:#333; display:block;">👨‍🦱 Marido (6 Marmitas)</b>
          <span style="font-size:16px; font-weight:bold; color:#6f42c1;">${S.settings.kcalEle} Kcal</span>
          <small style="display:block; font-size:10px; color:#666; margin-top:4px;">🥩 200g Prot<br>🥦 40% Legumes<br>🍚 ${S.settings.carboEle}g Hidratos</small>
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

    <!-- 🍱 SELEÇÃO SEMANAL COM DIAS DA SEMANA -->
    <div style="background:#fff; padding:15px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.05); border:1px solid #eee;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0; color:#333; font-size:15px;">🍱 Menu Escolhido para a Semana</h3>
        <button onclick="generateWeeklyMenu()" style="background:#6f42c1; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">✨ Gerar Menu Aleatório</button>
      </div>
      
      ${(!S.selectedLunches || S.selectedLunches.length === 0) ? `
        <p style="color:#888; font-size:13px; margin:0;">Nenhum prato escolhido. Clica em "Gerar Menu Aleatório" para rodar as tuas sugestões sem repetir carnes.</p>
      ` : `
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          ${dias.map((dia, idx) => {
            const lunchId = S.selectedLunches[idx % S.selectedLunches.length];
            const snackId = S.selectedSnacks ? S.selectedSnacks[idx % S.selectedSnacks.length] : null;
            
            const lunchRec = allRecs.find(x => x.id === lunchId);
            const snackRec = allRecs.find(x => x.id === snackId);

            return `
              <div style="padding:10px; background:#f8f9fa; border-radius:6px; border-left:4px solid #6f42c1; font-size:13px;">
                <b style="color:#6f42c1; display:block; margin-bottom:4px; font-size:14px;">📅 ${dia}</b>
                <div style="color:#222; margin-bottom:3px;">
                  🍗 <b>Almoço:</b> ${lunchRec ? lunchRec.name : '<span style="color:#aaa;">Não definido</span>'}
                </div>
                <div style="color:#555;">
                  🥪 <b>Lanche:</b> ${snackRec ? snackRec.name : '<span style="color:#aaa;">Não definido</span>'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}

      <!-- 💡 IDEIAS EXTRA ESCOLHIDAS DO INSTA / INTERNET -->
      ${S.selectedInstagramExtras && S.selectedInstagramExtras.length > 0 ? `
        <div style="margin-top:15px; padding-top:15px; border-top:1px dashed #ddd;">
          <b style="color:#d62976; display:block; margin-bottom:8px; font-size:13px;">💡 Receitas Extra para Testar esta Semana:</b>
          <ul style="padding-left:20px; margin:0; font-size:13px; color:#333; line-height:1.6;">
            ${S.selectedInstagramExtras.map(id => {
              const itemInspiracion = (S.instagramInspirations || []).find(x => x.id === id);
              return itemInspiracion ? `
                <li style="font-weight:500; margin-bottom:4px;">
                  📸 ${itemInspiracion.name} <small style="color:#6c757d;">(${itemInspiracion.category})</small> 
                  — <a href="${itemInspiracion.link}" target="_blank" style="color:#d62976; font-weight:bold; text-decoration:none; font-size:11px;">Abrir Link ➡️</a>
                </li>
              ` : '';
            }).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}


function renderRecipes() {
  const all = getAllRecipes();
  if (!S.currentRecipeFilter) S.currentRecipeFilter = 'todos';

  const query = (S.searchQuery || '').toLowerCase().trim();
  let filtered = all.filter(r => r.name.toLowerCase().includes(query) || (r.cat || '').toLowerCase().includes(query));

  const currentF = S.currentRecipeFilter;
  if (currentF !== 'todos') {
    if (currentF === 'frango') {
      filtered = filtered.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'frango' || r.name.toLowerCase().includes('frango')));
    } else if (currentF === 'carne') {
      filtered = filtered.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'carne' || r.name.toLowerCase().includes('carne') || r.name.toLowerCase().includes('vaca') || r.name.toLowerCase().includes('porco') || r.name.toLowerCase().includes('picada') || r.name.toLowerCase().includes('almôndegas') || r.name.toLowerCase().includes('lombo') || r.name.toLowerCase().includes('empadão') || r.name.toLowerCase().includes('jardineira')));
    } else if (currentF === 'peixe') {
      filtered = filtered.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'peixe' || r.name.toLowerCase().includes('peixe') || r.name.toLowerCase().includes('bacalhau') || r.name.toLowerCase().includes('salmão') || r.name.toLowerCase().includes('atum') || r.name.toLowerCase().includes('pescada') || r.name.toLowerCase().includes('camarão')));
    } else if (currentF === 'lanches') {
      filtered = filtered.filter(r => r.cat === 'Lanches' || r.proteinType === 'lanche' || r.cat.toLowerCase().includes('lanche'));
    }
  }

  window.setRecipeFilter = function(filterName) { S.currentRecipeFilter = filterName; save(); render(); };
  window.executeSearch = function(txt) { S.searchQuery = txt; save(); render(); setTimeout(() => { const input = document.getElementById('recipe-search-bar'); if (input) { input.focus(); input.setSelectionRange(txt.length, txt.length); } }, 50); };

  return `
    <h3 style="margin-top:0; color:#333;">❤️ Livro de Receitas Favoritas</h3>

    <!-- 📝 NOVO FORMULÁRIO FIXO NO TOPO - MUITO MELHOR QUE POPUPS -->
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
      <b style="display:block; font-size:12px; font-weight:bold; color:#007bff; margin-bottom:8px; text-transform:uppercase;">➕ Criar e Incluir Nova Receita:</b>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
        <div>
          <label style="display:block; font-size:11px; font-weight:bold; color:#495057; margin-bottom:4px;">Nome do Prato</label>
          <input type="text" id="new-rec-name" placeholder="Ex: Risoto de cogumelos" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
        </div>
        <div>
          <label style="display:block; font-size:11px; font-weight:bold; color:#495057; margin-bottom:4px;">Tipo de Refeição</label>
          <select id="new-rec-cat" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px; height:34px;">
            <option value="Almoço/Marmita">Almoço / Marmita</option>
            <option value="Lanches">Lanches</option>
          </select>
        </div>
      </div>
      
      <div style="margin-bottom:10px;">
        <label style="display:block; font-size:11px; font-weight:bold; color:#495057; margin-bottom:4px;">Ingredientes Necessários</label>
        <input type="text" id="new-rec-ings" placeholder="Ex: Arroz arbóreo, cogumelos, cebola, parmesão" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      
      <div style="margin-bottom:12px;">
        <label style="display:block; font-size:11px; font-weight:bold; color:#495057; margin-bottom:4px;">Modo de Fazer / Passos</label>
        <input type="text" id="new-rec-steps" placeholder="Ex: Fazer um refogado, juntar o arroz e ir deitando caldo lentamente..." style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      
      <button onclick="addNewRecipe()" style="background:#007bff; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%; font-size:13px; text-transform:uppercase;">
        💾 Guardar Receita no Livro
      </button>
    </div>

    <!-- Barra de Pesquisa -->
    <div style="margin-bottom:12px;">
      <input type="text" id="recipe-search-bar" placeholder="🔍 Digita para pesquisar receita (ex: caril, sandes)..." value="${S.searchQuery || ''}" oninput="executeSearch(this.value)" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
    </div>

    <!-- Abas de Proteína -->
    <div style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; margin-bottom:15px;">
      <button onclick="setRecipeFilter('todos')" style="background:${currentF==='todos'?'#007bff':'#eee'}; color:${currentF==='todos'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer;">✨ Todos</button>
      <button onclick="setRecipeFilter('frango')" style="background:${currentF==='frango'?'#20c997':'#eee'}; color:${currentF==='frango'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer;">种类 🍗 Frango</button>
      <button onclick="setRecipeFilter('carne')" style="background:${currentF==='carne'?'#6f42c1':'#eee'}; color:${currentF==='carne'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer;">🥩 Carne</button>
      <button onclick="setRecipeFilter('peixe')" style="background:${currentF==='peixe'?'#17a2b8':'#eee'}; color:${currentF==='peixe'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer;">🐟 Peixe</button>
      <button onclick="setRecipeFilter('lanches')" style="background:${currentF==='lanches'?'#fd7e14':'#eee'}; color:${currentF==='lanches'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer;">🥛 Lanches</button>
    </div>

    ${filtered.length === 0 ? '<p style="color:#888; font-size:12px; text-align:center; padding:20px 0;">Nenhuma receita encontrada nesta aba.</p>' : ''}

    ${filtered.map(r => {
      const isSelected = (S.selectedLunches && S.selectedLunches.includes(r.id)) || (S.selectedSnacks && S.selectedSnacks.includes(r.id));
      // Verifica se a receita foi criada à mão (não é do sistema nem do Insta) para exibir o botão de apagar
      const isCustom = !r.isSuggestion && !r.isFromInstagram;

      return `
        <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:12px; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <b style="font-size:14px; color:#222;">${r.name}</b>
            <div style="display:flex; gap:6px; align-items:center;">
              <button onclick="toggleSelectRecipe('${r.id}')" style="background:${isSelected ? '#dc3545':'#28a745'}; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
                ${isSelected ? 'Remover' : 'Escolher'}
              </button>
              <!-- BOTÃO DE EXCLUIR: Só aparece nas receitas criadas por ti! -->
              ${isCustom ? `<button onclick="deleteCustomRecipe('${r.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px; padding:0 4px; font-weight:bold;">✕</button>` : ''}
            </div>
          </div>
          <div style="margin-top:8px; display:flex; gap:5px; flex-wrap:wrap;">
            <span style="background:#e9ecef; color:#495057; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">${r.cat}</span>
            ${r.isSuggestion ? '<span style="background:#e2f0d9; color:#155724; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">💡 Sistema</span>' : ''}
            ${r.isFromInstagram ? '<span style="background:#fce4ec; color:#c2185b; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">📸 Insta</span>' : ''}
            ${r.bimby ? '<span style="background:#20c997; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🤖 Bimby</span>' : ''}
            ${r.airfryer ? '<span style="background:#fd7e14; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:bold;">🍟 Airfryer</span>' : ''}
          </div>
          <div style="background:#f8f9fa; padding:10px; font-size:12px; border-radius:6px; margin-top:10px; border:1px solid #f0f0f0; line-height:1.4;">
            <div style="margin-bottom:4px;"><b>🛒 Ingredientes:</b> <span style="color:#555;">${r.ings || 'A gosto.'}</span></div>
            <div><b>👩‍🍳 Passo a Passo:</b> <span style="color:#555;">${r.steps || 'A gosto.'}</span></div>
          </div>
        </div>
      `;
    }).join('')}
  `;
}


/* DESPENSA */
function renderPantry() {
  const groups = {};
  
  S.pantryStock.forEach((item, index) => {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push({ ...item, realIndex: index });
  });

  return `
    <h3 style="margin-top:0; color:#333;">🗄️ Despensa</h3>
    <p style="color:#6c757d; font-size:12px; margin-bottom:15px;">Clica nos botões para mudar o estado do item:</p>
    ${Object.keys(groups).map(cat => `
      <div style="margin-bottom:20px;">
        <b style="color:#495057; font-size:12px; text-transform:uppercase; display:block; margin-bottom:8px; letter-spacing:0.5px;">${cat}</b>
        ${groups[cat].map(item => {
          let currentStatus = item.status || 'tenho';
          let textStyle = 'color: #333; text-decoration: none; font-weight:600;';

          if (currentStatus === 'falta') {
            textStyle = 'color: #c82333; text-decoration: none; font-weight:600;';
          } else if (currentStatus === 'nao_usar') {
            textStyle = 'color: #aaa; text-decoration: line-through; font-weight:normal;';
          }

          return `
            <div style="padding:10px; border-radius:6px; margin-bottom:5px; border:1px solid #f0f0f0; background:#fff; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <span style="${textStyle} font-size:13px;">${item.name}</span>
              <div style="display:flex; gap:4px;">
                <button onclick="setPantryStatus(${item.realIndex}, 'tenho')" style="background:#28a745; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">✅ Tenho</button>
                <button onclick="setPantryStatus(${item.realIndex}, 'falta')" style="background:#dc3545; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">❌ Falta</button>
                <button onclick="setPantryStatus(${item.realIndex}, 'nao_usar')" style="background:#6c757d; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">🚫 Não Usar</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `).join('')}
  `;
}

/* COMPRAS */
function renderShopping() {
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
        if (item.status !== 'falta' || alreadyInCart) return ''; 
        
        return `
          <div onclick="putItemInCartFromPantry(${index}, '${item.name}', '${item.cat}')" style="padding:12px; background:#fdf2f2; border:1px solid #f5c6cb; border-radius:6px; cursor:pointer; font-size:13px; color:#c82333; font-weight:600; display:flex; align-items:center; justify-content:space-between;">
            <span>🔸 ${item.name} <small style="color:#6c757d; font-weight:normal;">(${item.cat})</small></span>
            <span style="font-size:11px; color:#28a745; font-weight:normal;">🛒 Carrinho</span>
          </div>
        `;
      }).join('')}
    </div>

    <b style="color:#495057; font-size:11px; text-transform:uppercase; display:block; margin-bottom:8px;">🏡 Outras Coisas / Lista Extra:</b>
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; display:flex; flex-direction:column; gap:8px;">
      ${S.shoppingList.map(item => `
        <div onclick="putItemInCartFromExtra('${item.id}', '${item.name}', '${item.cat}')" style="padding:12px; background:#fff; border:1px solid #eee; border-radius:6px; cursor:pointer; font-size:13px; color:#333; font-weight:600; display:flex; align-items:center; justify-content:space-between;">
          <span>🔹 ${item.name} <small style="color:#6c757d; font-weight:normal;">(${item.cat})</small></span>
          <span style="font-size:11px; color:#28a745; font-weight:normal;">🛒 Carrinho</span>
        </div>
      `).join('')}
      ${S.shoppingList.length === 0 ? '<p style="color:#888; font-size:12px; margin:0;">Nenhum artigo extra adicionado.</p>' : ''}
    </div>
  `;
}

/* GASTOS */
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

  window.finalizePriceAndCheckout = function(cartIdOrIdx, type, name, cat, realIndexInPantry) {
    const priceInput = document.getElementById('price-cart-' + cartIdOrIdx);
    const marketSelect = document.getElementById('market-cart-' + cartIdOrIdx);
    const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
    const market = marketSelect ? marketSelect.value : 'Lidl';

    if (type === 'pantry') {
      S.pantryStock[realIndexInPantry].has = true;
    }

    if (price > 0) {
      S.invoices.push({
        id: 'inv_' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        market: market,
        total: price,
        details: name + ' (' + cat + ')'
      });
    }

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
      <button onclick="clearHistoryGastos()" style="background:#dc3545; color:#fff; border:none; padding:6px 10px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:11px;">🗑️ Limpar</button>
    </div>

    <div style="background:#eef9f0; border-left:5px solid #28a745; padding:15px; border-radius:8px; margin-bottom:15px; text-align:center;">
      <small style="color:#6c757d; font-weight:bold; display:block; text-transform:uppercase;">💰 INVESTIMENTO EM REFEIÇÕES DESTE MÊS</small>
      <h2 style="margin:5px 0 0 0; color:#28a745; font-size:26px;">€${totalMes.toFixed(2)}</h2>
    </div>

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

    <b style="color:#495057; display:block; margin-bottom:8px; text-transform:uppercase; font-size:11px; letter-spacing:0.5px;">📝 Dar Baixa e Colocar Preço nos Artigos Comprados:</b>
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      ${S.cartList.length === 0 ? `
        <p style="color:#888; font-size:13px; text-align:center; background:#fff; padding:15px; border-radius:8px; border:1px solid #eee; margin:0;">
          🛒 O carrinho de faturas está vazio.
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
              <button onclick="finalizePriceAndCheckout('${idKey}', '${item.type}', '${item.name}', '${item.cat}', ${item.realIdx || 0})" style="background:#28a745; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">✅</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>

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

/* INSTAGRAM */
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

window.addNewRecipe = function() {
  const nameInput = document.getElementById('new-rec-name');
  const catSelect = document.getElementById('new-rec-cat');
  const ingsInput = document.getElementById('new-rec-ings');
  const stepsInput = document.getElementById('new-rec-steps');

  const name = nameInput ? nameInput.value.trim() : '';
  const cat = catSelect ? catSelect.value : 'Almoço/Marmita';
  const ings = ingsInput ? ingsInput.value.trim() : 'Ingredientes a gosto.';
  const steps = stepsInput ? stepsInput.value.trim() : 'Preparar a gosto.';

  if (!name) {
    alert("Por favor, introduza pelo menos o Nome da receita!");
    return;
  }

  // Deteta a proteína automaticamente por palavras-chave para organizar as abas sozito
  let proteinType = 'frango'; 
  const lowName = name.toLowerCase();
  
  if (cat.toLowerCase().includes('lanche')) {
    proteinType = 'lanche';
  } else if (lowName.includes('carne') || lowName.includes('vaca') || lowName.includes('porco') || lowName.includes('picada') || lowName.includes('almôndegas') || lowName.includes('lombo') || lowName.includes('empadão') || lowName.includes('jardineira')) {
    proteinType = 'carne';
  } else if (lowName.includes('peixe') || lowName.includes('bacalhau') || lowName.includes('salmão') || lowName.includes('atum') || lowName.includes('pescada') || lowName.includes('camarão')) {
    proteinType = 'peixe';
  }

  // Guarda na tua gaveta pessoal de receitas criadas à mão
  if (!S.myRecipes) S.myRecipes = [];
  S.myRecipes.push({ 
    id: 'my_' + Date.now(), 
    name: name, 
    cat: cat, 
    proteinType: proteinType, 
    ings: ings, 
    steps: steps, 
    isSuggestion: false 
  });
  
  // Limpa as caixas de texto após guardar para ficar pronto para a próxima
  if (nameInput) nameInput.value = '';
  if (ingsInput) ingsInput.value = '';
  if (stepsInput) stepsInput.value = '';

  save(); 
  render();
  alert("✨ Nova receita guardada com sucesso e adicionada ao teu livro!");
};

// NOVA FUNÇÃO: Para poderes eliminar receitas criadas por ti se te enganares!
window.deleteCustomRecipe = function(id) {
  if (confirm("Tens a certeza que queres eliminar permanentemente esta receita do teu livro?")) {
    S.myRecipes = S.myRecipes.filter(r => r.id !== id);
    // Remove também das seleções da semana caso estivesse ativa
    if (S.selectedLunches) S.selectedLunches = S.selectedLunches.filter(x => x !== id);
    if (S.selectedSnacks) S.selectedSnacks = S.selectedSnacks.filter(x => x !== id);
    save(); 
    render();
  }
};

window.toggleSelectRecipe = function(id) {
  // Inicializa os arrays na memória caso ainda não existam
  if (!S.selectedLunches) S.selectedLunches = [];
  if (!S.selectedSnacks) S.selectedSnacks = [];

  // Puxa a lista unificada de todas as receitas da app (incluindo as do Insta)
  const all = getAllRecipes();
  const found = all.find(x => x.id === id);
  
  // Verifica se o prato pertence à categoria de lanches
  const isLanche = found && found.cat && found.cat.toLowerCase().includes('lanche');

  if (isLanche) {
    const idx = S.selectedSnacks.indexOf(id);
    if (idx > -1) {
      S.selectedSnacks.splice(idx, 1); // Se já estava selecionado, remove (volta a Verde)
    } else {
      S.selectedSnacks.push(id); // Se não estava, adiciona (muda para Vermelho)
    }
  } else {
    const idx = S.selectedLunches.indexOf(id);
    if (idx > -1) {
      S.selectedLunches.splice(idx, 1); // Se já estava selecionado, remove
    } else {
      S.selectedLunches.push(id); // Se não estava, adiciona
    }
  }

  save(); 
  render();
};

