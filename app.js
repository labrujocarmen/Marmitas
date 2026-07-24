/* app.js — PARTE 1 ATUALIZADA (Ingredientes e Passos Completos) */
'use strict';

const DEFAULT_RECIPES = [
  { id: 'f_desfiado', name: 'Frango desfiado tradicional', cat: 'Almoço/Marmita', bimby: 'Programe 5 seg/Vel 4 Invertida para desfiar o frango cozido.', airfryer: '', calories: 280, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Alho, Cebola, Louro, Azeite, Sal', steps: 'Cozza o frango em água com sal e louro. Escorra, desfie na Bimby e refogue ligeiramente com azeite, alho e cebola picada.' },
  { id: 'f_mexicano', name: 'Frango mexicano', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Pimentões coloridos, Milho, Feijão preto, Polpa de Tomate, Cominhos', steps: 'Corte o frango em cubos e salteie. Adicione os pimentões em tiras, o milho, o feijão e a polpa de tomate. Tempere com cominhos e deixe apurar.' },
  { id: 'f_oriental', name: 'Frango oriental', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 330, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Cogumelos, Alho-francês, Molho de Soja, Sementes de Sésamo', steps: 'Salteie o frango em tiras finas com o alho-francês e os cogumelos. Refresque com o molho de soja e finalize com sementes de sésamo.' },
  { id: 'f_xadrez', name: 'Frango xadrez', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 340, protein: 36, isSuggestion: true, ings: 'Peito de Frango (500g), Pimentões verdes e vermelhos, Cebola, Amendoim, Molho de Soja', steps: 'Corte o frango e os legumes em cubos grandes. Salteie tudo em lume forte, junte o molho de soja e finalize com os amendoins.' },
  { id: 'f_caril', name: 'Frango de caril', cat: 'Almoço/Marmita', bimby: 'Prepare o molho de caril na vel 2 a 90°C.', airfryer: '', calories: 350, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Leite de Coco Light, Caril em pó, Cebola, Alho', steps: 'Refogue a cebola and o alho. Adicione o frango em cubos e o caril. Junte o leite de coco e deixe cozinhar em lume brando até apurar.' },
  { id: 'f_cremoso', name: 'Frango cremoso', cat: 'Almoço/Marmita', bimby: 'Misture o queijo creme na vel 4.', airfryer: '', calories: 290, protein: 33, isSuggestion: true, ings: 'Peito de Frango (500g), Queijo creme light (tipo Quark ou Philadelphia), Espinafres', steps: 'Cozinhe o frango. Adicione os espinafres até murcharem e envolva o queijo creme em lume muito brando para criar o molho.' },
  { id: 'f_strogonoff', name: 'Strogonoff saudável', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 300, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Cogumelos frescos, Mostarda, Polpa de Tomate, Iogurte Natural', steps: 'Salteie o frango e os cogumelos. Junte a polpa de tomate e a mostarda. Desliga o lume e envolve o iogurte natural.' },
  { id: 'f_mediterran', name: 'Frango mediterrânico', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Cozinhe a 190°C por 15 min.', calories: 295, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Tomate cereja, Azeitonas pretas, Azeite, Orégãos', steps: 'Disponha o frango, os tomates e as azeitonas num pirex ou cesto da Airfryer. Regue com azeite, polvilhe orégãos e asse.' },
  { id: 'f_mostarda', name: 'Frango mostarda', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 310, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Mostarda antiga em grão, Alho, Alecrim', steps: 'Marine o frango com alho e mostarda. Grelhe na frigideira antiaderente com um ramo de alecrim.' },
  { id: 'f_limao', name: 'Frango com limão', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Grelhe a 180°C por 12 min.', calories: 270, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Limão (sumo e raspa), Alho, Salsa fresca', steps: 'Grelhe o frango temperado com alho. No final da cozedura, regue com o sumo de limão fresco e polvilhe com salsa.' },
  { id: 'f_espinafres', name: 'Frango com espinafres', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 285, protein: 36, isSuggestion: true, ings: 'Peito de Frango (500g), Espinafres frescos, Alho, Azeite', steps: 'Salteie o alho em azeite, adicione os cubos de frango e, quando estiverem quase prontos, junte os espinafres até murcharem.' },
  { id: 'f_portuguesa', name: 'Frango à portuguesa', cat: 'Almoço/Marmita', bimby: 'Refogue cebola e pimento 5 min/Varoma.', airfryer: '', calories: 320, protein: 34, isSuggestion: true, ings: 'Peito de Frango (500g), Cebola, Pimento vermelho, Tomate maduro, Louro', steps: 'Faça uma base de estufado com a cebola, pimento e tomate. Adicione o frango e a folha de louro e coza em lume brando.' },
  { id: 'f_barbecue', name: 'Frango barbecue', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Asse por 15 min a 180°C.', calories: 315, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Molho barbecue zero açúcares, Alho em pó', steps: 'Pincele os peitos de frango com o molho barbecue e asse na Airfryer até dourarem.' },
  { id: 'f_forno', name: 'Frango ao forno', cat: 'Almoço/Marmita', bimby: '', airfryer: 'Asse frango e batata-doce a 200°C por 20 min.', calories: 340, protein: 33, isSuggestion: true, ings: 'Peito de Frango (500g), Batata-doce, Brócolis, Azeite, Paprika', steps: 'Corte tudo em cubos, envolva em azeite e paprika e leve ao forno ou cesto da Airfryer até ficar estaladiço.' },
  { id: 'f_cogumelos', name: 'Frango com cogumelos', cat: 'Almoço/Marmita', bimby: '', airfryer: '', calories: 290, protein: 35, isSuggestion: true, ings: 'Peito de Frango (500g), Cogumelos laminados, Alho-francês, Azeite', steps: 'Salteie o alho-francês em azeite, junte o frango e os cogumelos e cozinhe até perderem a água.' }
];

let S = null;
let saveTimer = null;
/* app.js — PARTE 2 (Metade A) */
const EXTRA_RECIPES = [
  { id: 'm_feij_1', name: 'Frango grelhado + arroz + feijão preto + brócolos', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: 'Grelhe o frango a 180°C por 12 min.', isSuggestion: true, ings: 'Peito de frango, Arroz, Feijão preto, Brócolos', steps: 'Grelhe o frango temperado na Airfryer. Coza o arroz, o feijão e os brócolos e monte as marmitas dividindo as porções.' },
  { id: 'm_feij_2', name: 'Picadinho de carne + arroz + feijão carioca + cenoura', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne moída (vaca), Arroz, Feijão carioca, Cenoura', steps: 'Refogue a carne com cebola e alho, junte as cenouras às rodelas e cozinhe. Sirva acompanhado com arroz e feijão.' },
  { id: 'm_feij_3', name: 'Carne de panela + arroz + feijão vermelho + couve', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne de vaca para estufar, Arroz, Feijão vermelho, Couve', steps: 'Cozinhe a carne lentamente com temperos até desfiar. Salteie a couve em tiras finas com alho para acompanhar.' },
  { id: 'm_feij_4', name: 'Almôndegas caseiras + arroz + feijão + feijão-verde', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: 'Faça o molho na vel 2.', airfryer: 'Asse as almôndegas a 200°C por 10 min.', isSuggestion: true, ings: 'Carne picada de vaca, Molho de tomate, Arroz, Feijão, Feijão-verde', steps: 'Molde as almôndegas, asse na Airfryer e junte ao molho de tomate. Coza o feijão-verde e monte o prato.' },
  { id: 'm_feij_5', name: 'Frango desfiado + arroz + feijão tropeiro light', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: 'Desfie o frango vel 4 invertida.', airfryer: '', isSuggestion: true, ings: 'Frango desfiado, Arroz, Feijão, Farinha de mandioca (pouca), Couve', steps: 'Misture o feijão cozido com alho, couve em tiras finas e um salpico de farinha. Sirva com o frango desfiado e arroz.' },
  { id: 'm_feij_6', name: 'Salmão com arroz e legumes', cat: 'Almoço/Marmita', proteinType: 'peixe', bimby: 'Cozinhe os legumes na Varoma.', airfryer: 'Cozinhe o salmão a 180°C por 10 min.', isSuggestion: true, ings: 'Filé de Salmão, Arroz, Legumes variados (Cenoura, Brócolos)', steps: 'Grelhe o salmão temperado na Airfryer e monte a marmita acompanhado com arroz e os legumes cozidos a vapor.' },
  { id: 'm_feij_7', name: 'Bife acebolado + arroz + feijão + abóbora assada', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: 'Asse a abóbora a 200°C por 15 min.', isSuggestion: true, ings: 'Bife de vaca, Cebola, Arroz, Feijão, Abóbora em cubos', steps: 'Faça uma cebolada rápida na frigideira sobre o bife. Asse os cubos de abóbora na Airfryer e junte ao arroz e feijão.' },
  { id: 'm_feij_8', name: 'Iscas de fígado + arroz + feijão + salada', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Bife de fígado, Alho, Vinagre, Arroz, Feijão, Alface, Tomate', steps: 'Marine as iscas em alho e vinagre. Salteie rapidamente na frigideira para não endurecer e sirva com salada e arroz.' },
  { id: 'm_feij_9', name: 'Chili de carne + arroz', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: 'Cozinhe a carne com o feijão 15 min/100°C/vel colher.', airfryer: '', isSuggestion: true, ings: 'Carne picada de vaca, Feijão vermelho, Molho de tomate, Pimentões, Arroz', steps: 'Cozinhe a carne picada com os pimentões e polpa de tomate. Adicione o feijão no final e sirva bem quente com arroz.' },
  { id: 'm_feij_10', name: 'Feijoada magra + arroz + couve', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Feijão preto, Carnes limpas e magras de porco/vaca, Couve, Arroz', steps: 'Cozzinhe o feijão com cortes magros de carne. Sirva acompanhado com arroz seco e couve salteada em tiras.' },
  { id: 'm_feij_11', name: 'Frango ao molho + arroz + feijão + curgete ou cenoura', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: '', isSuggestion: true, ings: 'Frango em pedaços, Molho de tomate, Arroz, Feijão, Curgete', steps: 'Estufe o frango no molho de tomate caseiro juntamente com pedaços de curgete tenra até apurar.' },
  { id: 'm_extra_1', name: 'Carne picada com batata, cenoura e arroz', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne moída, Batata, Cenoura, Arroz', steps: 'Cozinhe a carne picada num refogado leve e junte pedaços de batata e cenoura até estarem macios.' },
  { id: 'm_extra_2', name: 'Bacalhau com grão, espinafres e cebola', cat: 'Almoço/Marmita', proteinType: 'peixe', bimby: '', airfryer: '', isSuggestion: true, ings: 'Bacalhau desfiado, Grão de bico, Espinafres, Cebola, Azeite', steps: 'Envolva o bacalhau cozido com o grão de bico, cebola picada e folhas de espinafres salteadas em alho e azeite.' },
  { id: 'm_extra_3', name: 'Picadinho de carne com legumes e puré de batata', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne em cubos, Legumes mistos (Ervilhas, Cenoura), Puré de batata', steps: 'Cozinhe a carne com os legumes num molho leve e monte as marmitas com o puré cremoso ao lado.' },
  { id: 'm_extra_4', name: 'Peru estufado com ervilhas e arroz', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne de peru em cubos, Ervilhas, Cebola, Arroz', steps: 'Estufe os cubos de peru com cebola e ervilhas em lume brando. Acompanhe com arroz branco solto.' },
/* app.js — PARTE 2 (Metade B) */
  { id: 'm_extra_5', name: 'Empadão de carne com puré de batata e legumes', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne picada refogada, Puré de batata, Legumes mistos', steps: 'Faça camadas de puré e carne picada num pirex. Pincele o topo com gema de ovo e leve ao forno a dourar.' },
  { id: 'm_extra_6', name: 'Carne de porco à alentejana versão saudável', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: 'Cozinhe os cubos de carne a 200°C na Airfryer.', isSuggestion: true, ings: 'Carne de porco limpa, Ameijoas, Batatas em cubos', steps: 'Corte as batatas em cubos e faça na Airfryer. Salteie a carne numa frigideira antiaderente e junte as ameijoas no final.' },
  { id: 'm_extra_7', name: 'Lombo de porco assado com legumes e batata', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Lombo de porco, Batatas, Cenoura, Brócolos', steps: 'Asse o lombo com ervas aromáticas e alho. Sirva fatiado com as batatas e os legumes assados.' },
  { id: 'm_extra_8', name: 'Lasanha de curgete com carne picada', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Curgete em fatias longas, Carne picada, Molho de tomate', steps: 'Substitua as placas de massa por fatias finas de curgete. Monte em camadas alternadas com a carne e leve a assar.' },
  { id: 'm_extra_9', name: 'Bacalhau espiritual light', cat: 'Almoço/Marmita', proteinType: 'peixe', bimby: 'Prepare o creme na Bimby.', airfryer: 'Gratine a 200°C.', isSuggestion: true, ings: 'Bacalhau desfiado, Cenoura ralada, Pão integral, Leite magro', steps: 'Envolva o bacalhau com a cenoura e o creme de pão amolecido em leite. Leve a gratinar na Airfryer.' },
  { id: 'm_extra_10', name: 'Almôndegas de peru com puré e brócolos', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Almôndegas de peru, Puré de batata, Brócolos ao vapor', steps: 'Cozinhe as almôndegas num molho de tomate leve e monte a marmita juntamente com o puré e brócolos.' },
  { id: 'm_extra_11', name: 'Frango com mostarda e mel, arroz e legumes', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: '', isSuggestion: true, ings: 'Peito de frango, Mostarda antiga, Mel (fio leve), Arroz, Legumes', steps: 'Pincele o frango com o molho de mostarda e mel e grelhe. Sirva com arroz seco e legumes salteados.' },
  { id: 'm_extra_12', name: 'Jardineira de carne', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne de vaca em cubos, Batatas, Ervilhas, Cenoura, Louro', steps: 'Um estufado tradicional de panela único rico em legumes cozinhados lentamente com a carne.' },
  { id: 'm_extra_13', name: 'Arroz de pato versão leve', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Pato desfiado sem pele, Arroz, Rodelas de chouriço de peru', steps: 'Cozza o pato e desfie. Use a água limpa para cozer o arroz e leve ao forno para secar com o chouriço de peru.' },
  { id: 'm_extra_14', name: 'Escondidinho de carne com puré de batata-doce', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne moída refogada, Puré de batata-doce', steps: 'Disponha a carne picada temperada no fundo do pirex e cubra inteiramente com o puré de batata-doce antes de assar.' },
  { id: 'm_extra_15', name: 'Frango tikka masala light com arroz basmati', cat: 'Almoço/Marmita', proteinType: 'frango', bimby: '', airfryer: '', isSuggestion: true, ings: 'Frango em cubos, Iogurte natural, Tomate, Especiarias Tikka, Arroz basmati', steps: 'Marine o frango no iogurte com as especiarias e cozinhe no molho de tomate. Acompanhe com arroz basmati.' },
  { id: 'm_extra_16', name: 'Carne à bolonhesa com massa integral', cat: 'Almoço/Marmita', proteinType: 'carne', bimby: '', airfryer: '', isSuggestion: true, ings: 'Carne moída, Polpa de tomate, Cebola, Massa integral', steps: 'Cozinhe a carne picada com a polpa de tomate e cebola. Misture tudo com a massa integral cozida al dente.' },
  { id: 'm_extra_17', name: 'Bacalhau à Gomes de Sá saudável', cat: 'Almoço/Marmita', proteinType: 'peixe', bimby: '', airfryer: '', isSuggestion: true, ings: 'Bacalhau desfiado, Batatas em rodelas, Ovo cozido, Cebola, Azeite', steps: 'Faça um refogado leve de cebola em azeite, misture com as batatas cozidas e o bacalhau. Decore com ovo.' },
  { id: 'l_skyr', name: 'Iogurte Skyr + frutos vermelhos', cat: 'Lanches', proteinType: 'lanche', bimby: '', airfryer: '', isSuggestion: true, ings: 'Iogurte Skyr natural, Frutos vermelhos (Morangos, Framboesas)', steps: 'Coloque o skyr fresco numa taça e adicione os frutos vermelhos por cima para um lanche rápido.' },
  { id: 'l_queijo', name: 'Queijo fresco + tomate', cat: 'Lanches', proteinType: 'lanche', bimby: '', airfryer: '', isSuggestion: true, ings: 'Queijo fresco magro, Tomate médio, Sal, Orégãos', steps: 'Fatie o queijo fresco e o tomate. Disponha num prato e tempere com uma pitada de sal e orégãos.' },
  { id: 'l_atum', name: 'Sandes de atum + salada + tomate + pepino', cat: 'Lanches', proteinType: 'lanche', bimby: '', airfryer: '', isSuggestion: true, ings: 'Atum ao natural, Pão Rustik, Alface, Tomate, Pepino', steps: 'Escorra o atum e monte a sandes adicionando as folhas de alface, rodelas de tomate e pepino fresco.' },
  { id: 'l_frango', name: 'Sandes de frango desfiado + rúcula + cenoura ralada', cat: 'Lanches', proteinType: 'lanche', bimby: '', airfryer: '', isSuggestion: true, ings: 'Frango desfiado cozido, Pão de forma integral, Rúcula, Cenoura ralada', steps: 'Recheie as fatias de pão com o frango desfiado fresco, a rúcula e a cenoura ralada fina.' },
  { id: 'l_burger', name: 'Hambúrguer caseiro + salada + batata + airfryer', cat: 'Lanches', proteinType: 'lanche', bimby: '', airfryer: 'Batatas a 200°C por 15 min.', isSuggestion: true, ings: 'Hambúrguer de frango, Batata, Alface, Tomate', steps: 'Cozinhe o hambúrguer e os palitos de batata na Airfryer com um fio de azeite. Sirva com salada.' },
  { id: 'l_salmao', name: 'Sandes com cream cheese e salmão fumado + rúcula', cat: 'Lanches', proteinType: 'lanche', bimby: '', airfryer: '', isSuggestion: true, ings: 'Pão ou Wrap, Queijo creme light, Salmão fumado, Rúcula', steps: 'Unte o pão com o queijo creme, deite as fatias de salmão fumado por cima e finaliza com a rúcula.' }
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
  // Transforma os teus links salvos do Instagram em receitas válidas para o plano semanal
  const igRecipes = (S.instagramInspirations || []).map(ig => ({
    id: ig.id, 
    name: `📸 ${ig.name}`, // Adiciona um emoji para saberes no painel que veio do Insta/Internet
    cat: ig.category || 'Lanches', 
    proteinType: 'lanche', // Define como lanche por padrão
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

  // Junta as tuas receitas criadas à mão, os links do Insta, e todas as sugestões do sistema
  return [...(S.myRecipes || []), ...igRecipes, ...(typeof DEFAULT_RECIPES !== 'undefined' ? DEFAULT_RECIPES : []), ...(typeof EXTRA_RECIPES !== 'undefined' ? EXTRA_RECIPES : [])];
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
  
  // Separa as refeições por tipo de proteína para garantir um menu misto real
  const frangos = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'frango' || r.name.toLowerCase().includes('frango')));
  const carnes = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'carne' || r.name.toLowerCase().includes('carne') || r.name.toLowerCase().includes('vaca') || r.name.toLowerCase().includes('porco') || r.name.toLowerCase().includes('almôndegas') || r.name.toLowerCase().includes('picadinho') || r.name.toLowerCase().includes('chili') || r.name.toLowerCase().includes('lombo') || r.name.toLowerCase().includes('jardineira') || r.name.toLowerCase().includes('empadão') || r.name.toLowerCase().includes('pato')));
  const peixes = all.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'peixe' || r.name.toLowerCase().includes('peixe') || r.name.toLowerCase().includes('bacalhau') || r.name.toLowerCase().includes('salmão') || r.name.toLowerCase().includes('atum')));
  const lanches = all.filter(r => r.cat === 'Lanches' || r.proteinType === 'lanche');

  let escolhaAlmocos = [];
  
  // Sorteia 2 pratos de frango
  if (frangos.length >= 2) {
    const fSh = [...frangos].sort(() => 0.5 - Math.random());
    escolhaAlmocos.push(fSh[0].id, fSh[1].id);
  } else if (frangos.length > 0) {
    escolhaAlmocos.push(frangos[0].id);
  }

  // Sorteia 1 pratos de carne vermelha/limpa
  if (carnes.length >= 1) {
    const cSh = [...carnes].sort(() => 0.5 - Math.random());
    escolhaAlmocos.push(cSh[0].id);
  }

  // Sorteia 1 prato de peixe saudavel
  if (peixes.length >= 1) {
    const pSh = [...peixes].sort(() => 0.5 - Math.random());
    escolhaAlmocos.push(pSh[0].id);
  }

  // Preenche os lanches em falta no teu calendário de segunda a sexta
  if (lanches.length >= 2) {
    const lSh = [...lanches].sort(() => 0.5 - Math.random());
    S.selectedSnacks = [lSh[0].id, lSh[1].id, lSh[0].id, lSh[1].id, lSh[0].id];
  } else if (lanches.length > 0) {
    S.selectedSnacks = Array(5).fill(lanches[0].id);
  }

  // Baralha os 4 almoços escolhidos para não ficarem sempre na mesma ordem de dias
  if (escolhaAlmocos.length > 0) {
    S.selectedLunches = escolhaAlmocos.sort(() => 0.5 - Math.random());
  }

  save(); 
  render();
  alert("✨ Menu da semana gerado com sucesso (Almoços e Lanches mistos)!");
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

window.toggleSelectInstagramRecipe = function(id) {
  // Cria uma gaveta limpa na memória para as ideias extra da internet
  if (!S.selectedInstagramExtras) S.selectedInstagramExtras = [];

  const idx = S.selectedInstagramExtras.indexOf(id);
  if (idx > -1) {
    S.selectedInstagramExtras.splice(idx, 1); // Se clicares outra vez, remove da lista
  } else {
    S.selectedInstagramExtras.push(id); // Adiciona às ideias da semana
  }
  
  save(); 
  render(); 
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

      <!-- 💡 IDEIAS EXTRA ESCOLHIDAS DO INSTA -->
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

    // Garante que existe um filtro de categoria na memória (por padrão 'todos')
  if (!S.currentRecipeFilter) S.currentRecipeFilter = 'todos';

  // 1. Aplica o filtro da barra de pesquisa por texto
  const query = (S.searchQuery || '').toLowerCase().trim();
  let filtered = all.filter(r => r.name.toLowerCase().includes(query) || (r.cat || '').toLowerCase().includes(query));

  // 2. Aplica a separação inteligente por proteínas e lanches que solicitou
  const currentF = S.currentRecipeFilter;
  if (currentF !== 'todos') {
    if (currentF === 'frango') {
      filtered = filtered.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'frango' || r.name.toLowerCase().includes('frango')));
    } else if (currentF === 'carne') {
      filtered = filtered.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'carne' || r.name.toLowerCase().includes('carne') || r.name.toLowerCase().includes('vaca') || r.name.toLowerCase().includes('porco') || r.name.toLowerCase().includes('almôndegas') || r.name.toLowerCase().includes('picadinho') || r.name.toLowerCase().includes('chili') || r.name.toLowerCase().includes('lombo') || r.name.toLowerCase().includes('jardineira') || r.name.toLowerCase().includes('empadão')));
    } else if (currentF === 'peixe') {
      filtered = filtered.filter(r => r.cat === 'Almoço/Marmita' && (r.proteinType === 'peixe' || r.name.toLowerCase().includes('peixe') || r.name.toLowerCase().includes('bacalhau') || r.name.toLowerCase().includes('salmão') || r.name.toLowerCase().includes('atum')));
    } else if (currentF === 'lanches') {
      filtered = filtered.filter(r => r.cat === 'Lanches' || r.proteinType === 'lanche');
    }
  }

  // Ações internas da barra de pesquisa e dos botões de filtro
  window.setRecipeFilter = function(filterName) {
    S.currentRecipeFilter = filterName;
    save(); render();
  };

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
      <button onclick="addNewRecipe()" style="background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:12px;">➕ Incluir Receita</button>
    </div>

    <!-- 🔍 BARRA DE PESQUISA SIMPLES POR TEXTO -->
    <div style="margin-bottom:12px;">
      <input type="text" id="recipe-search-bar" placeholder="🔍 Digita para pesquisar receita (ex: caril, sandes)..." value="${S.searchQuery || ''}" oninput="executeSearch(this.value)" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box;">
    </div>

    <!-- 🏷️ BOTÕES DE SEPARAÇÃO POR ABAS -->
    <div style="display:flex; gap:4px; overflow-x:auto; padding-bottom:8px; margin-bottom:15px; -webkit-overflow-scrolling:touch;">
      <button onclick="setRecipeFilter('todos')" style="background:${currentF==='todos'?'#007bff':'#eee'}; color:${currentF==='todos'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer; white-space:nowrap;">✨ Todos</button>
      <button onclick="setRecipeFilter('frango')" style="background:${currentF==='frango'?'#20c997':'#eee'}; color:${currentF==='frango'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer; white-space:nowrap;">🍗 Frango</button>
      <button onclick="setRecipeFilter('carne')" style="background:${currentF==='carne'?'#6f42c1':'#eee'}; color:${currentF==='carne'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer; white-space:nowrap;">🥩 Carne</button>
      <button onclick="setRecipeFilter('peixe')" style="background:${currentF==='peixe'?'#17a2b8':'#eee'}; color:${currentF==='peixe'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer; white-space:nowrap;">🐟 Peixe</button>
      <button onclick="setRecipeFilter('lanches')" style="background:${currentF==='lanches'?'#fd7e14':'#eee'}; color:${currentF==='lanches'?'#fff':'#333'}; border:none; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:bold; cursor:pointer; white-space:nowrap;">🥛 Lanches</button>
    </div>

    ${filtered.length === 0 ? '<p style="color:#888; font-size:12px; text-align:center; padding:20px 0;">Nenhuma receita encontrada nesta aba.</p>' : ''}

    ${filtered.map(r => `
      <div style="background:#fff; padding:12px; border-radius:8px; margin-bottom:12px; border:1px solid #ddd; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="font-size:14px; color:#222; max-width:70%; display:block;">${r.name}</b>
          <div style="display:flex; gap:5px;">
            <button onclick="toggleSelectRecipe('${r.id}')" style="background:${S.selectedLunches.includes(r.id) || (S.selectedSnacks && S.selectedSnacks.includes(r.id)) ? '#dc3545':'#28a745'}; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
              ${S.selectedLunches.includes(r.id) || (S.selectedSnacks && S.selectedSnacks.includes(r.id)) ? 'Remover' : 'Escolher'}
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
  // Converte a lista atual para ordem inversa (as mais recentes aparecem no topo)
  const list = [...(S.instagramInspirations || [])].reverse();

  // Função interna para guardar diretamente a partir das caixas de texto do ecrã
  window.saveInstagramInspiracionClassic = function() {
    const linkInput = document.getElementById('insp-url-input');
    const nameInput = document.getElementById('insp-name-input');
    const catInput = document.getElementById('insp-cat-input');

    const link = linkInput ? linkInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';
    const category = catInput ? catInput.value.trim() : 'Lanche';

    if (!name || !link) {
      alert("Por favor, preencha o Nome e o Link da receita!");
      return;
    }

    // Regista na memória mantendo a data de hoje como tinhas no modelo antigo
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
    <!-- FORMULÁRIO FIXO NO TOPO - IGUAL AO TEU ANTIGO VISUAL -->
    <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
      <div style="margin-bottom:10px;">
        <label style="display:block; font-size:12px; font-weight:bold; color:#495057; margin-bottom:4px;">Link do Instagram ou Site</label>
        <input type="url" id="insp-url-input" placeholder="https://instagram.com/p/…" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      <div style="margin-bottom:10px;">
        <label style="display:block; font-size:12px; font-weight:bold; color:#495057; margin-bottom:4px;">Nome da Receita / Notas</label>
        <input type="text" id="insp-name-input" placeholder="ex: wrap de frango com molho de iogurte" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      <div style="margin-bottom:12px;">
        <label style="display:block; font-size:12px; font-weight:bold; color:#495057; margin-bottom:4px;">Categoria</label>
        <input type="text" id="insp-cat-input" value="Lanche" placeholder="Lanche ou Almoço/Marmita" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px; box-sizing:border-box; font-size:13px;">
      </div>
      <button onclick="saveInstagramInspiracionClassic()" style="background:#556b2f; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%; font-size:13px; text-transform:uppercase;">
        📌 Guardar inspiração
      </button>
    </div>

    <!-- LISTA EMPILHADA IGUAL AO FORMATO DA TUA SEGUNDA IMAGEM -->
    <div style="display:flex; flex-direction:column; gap:10px;">
      ${list.map(item => {
        // Substitui a linha antiga da isSelected dentro do teu S.instagramInspirations.map por esta:
const isSelected = S.selectedInstagramExtras && S.selectedInstagramExtras.includes(item.id);
 || (S.selectedSnacks && S.selectedSnacks.includes(item.id));
        return `
          <div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #eee; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
              <span style="font-weight:700; color:#222; font-size:14px; flex:1; padding-right:10px;">
                ${item.name} <small style="color:#6c757d; font-weight:normal;">(${item.category})</small>
              </span>
              <span style="font-size:11px; color:#aaa; white-space:nowrap;">${item.date || ''}</span>
            </div>
            
            <div style="margin-top:4px;">
              <a href="${item.link}" target="_blank" style="color:#008080; font-size:12px; word-break:break-all; text-decoration:none; font-weight:500;">${item.link}</a>
            </div>

            <div style="display:flex; gap:8px; margin-top:10px; align-items:center;">
              <button onclick="toggleSelectInstagramRecipe('${item.id}', '${item.category}')" style="background:${isSelected ? '#dc3545':'#556b2f'}; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:12px; font-weight:bold; cursor:pointer;">
                ${isSelected ? '✕ Remover do Menu' : '🍽️ Escolher para a Semana'}
              </button>
              <button onclick="deleteInstagramLink('${item.id}')" style="background:none; border:none; color:#dc3545; cursor:pointer; font-size:14px; margin-left:auto; padding:5px;">✕</button>
            </div>
          </div>
        `;
      }).join('')}
      
      ${list.length === 0 ? '<div style="text-align:center; color:#888; font-size:13px; padding:20px;">📌 Sem inspirações ainda.</div>' : ''}
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
      <!-- ATUALIZADO: De Livro para Receitas -->
      <div onclick="switchTab('recipes')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='recipes'?'#007bff':''};">📖 Receitas</div>
      <!-- ATUALIZADO: De Stock para Despensa -->
      <div onclick="switchTab('pantry')" style="padding:14px 2px; cursor:pointer; background:${S.tab==='pantry'?'#007bff':''};">🗄️ Despensa</div>
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
