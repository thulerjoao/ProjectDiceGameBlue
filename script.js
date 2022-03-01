var prompt = require("prompt-sync")();

const { Console } = require('console');
const { Transform } = require('stream');

let jogadas = [];
let jogador;
let nRodadas = 0;
let nJogadores;
let j = 1;
let entradaNula;

//a função 'tabela' receber um array de objetos e retorna uma tabela sem poluição como no 'console.table()'
function tabela(input) {  
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  let result = '';
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  }
  console.log(result);
}

//função para ordenar array de acordo com o vencedor de cada rodada.
function ordenarArray(array) {
  array.sort(function (a, b) {
  return a.Jogada_Atual < b.Jogada_Atual? -1: a.Jogada_Atual > b.Jogada_Atual? 1 : 0;}).reverse();
}
console.log(`***** JOGO DOS DADOS *****\n`);

nRodadas = parseInt(prompt(`Quantas rodadas você quer fazer? `));
console.clear();
while (nRodadas < 1 || isNaN(nRodadas)) {
  console.clear();
  console.log(`!!! ATENÇÃO !!!\n`);
  nRodadas = parseInt(prompt(`Digite um número maior que 0 para quantidade de rodadas: `));
  console.clear();
}

nJogadores = parseInt(prompt(`Quantos jogadores irão participar? `));
console.clear();
while (nJogadores < 1 || isNaN(nJogadores)) {
  console.clear();
  console.log(`!!! ATENÇÃO !!!\n`);
  nJogadores = parseInt(prompt(`Digite um número maior que 0 para quantidade de jogadores: `));
  console.clear();
}
console.clear();
console.log(`Teremos ${nJogadores} jogadores participando de ${nRodadas} rodadas! \n`);

// A código a seguir é utilizado apenas na primeira rodada, poisvai coletar o nome dos jogadores:
for (i = 0; i < nJogadores; i++) {console.log(`Primeira Rodada - \n`);
  jogador = prompt(`Qual o nome do ${i + 1}º jogador? `).toUpperCase();
  while (jogador == ""){
    console.clear();
    console.log(`!!! ATENÇÃO !!!\n`);
    jogador = prompt(`Não é possível introduzir jogadores em vazio. Digite um nome: `);
    console.clear();
  }
  //FUNÇÃO PARA CRIAR UM ARRAY DE OBJETOS COM NOME E JOGADA DE CADA JOGADOR: 
  function Jogadores(nome, jogadas = Math.floor(Math.random() * 6) + 1) {
    this.Jogador = nome;
    this.Jogada_Atual = jogadas;
    this.Placar = 0;
  }
  let pessoa = new Jogadores(jogador);
  jogadas.push(pessoa);
  console.clear();
}
console.log("Os dados da primeira rodada rolam e temos um resultado:\n");
ordenarArray(jogadas);

if (jogadas[0].Jogada_Atual == jogadas[1].Jogada_Atual) {
  console.log(`A primeira jogada empatou e não tivemos um vencedor.\n`);
} else {
  console.log(`O jogador ${jogadas[0].Jogador.toUpperCase()} tirou ${jogadas[0].Jogada_Atual} e levou a melhor!\n`);
  jogadas[0].Placar++;
}
console.log(`Confira os resultados da 1ª rodada: `);
tabela(jogadas);


entradaNula = prompt(`Os dados estão rolando novamente!\n \nAperte [ENTER] para iniciar a próxima rodada/finalizar: `);
console.clear;
console.log(nRodadas.lenght);

// Segue o código referente a todas as rodadas após a primeira
while (j < nRodadas) {
  console.clear();
  console.log(`Rodada ${j + 1} - \n`);
  for (i = 0; i < nJogadores; i++) {
    jogadas[i].Jogada_Atual = Math.floor(Math.random() * 6) + 1;
    i++;
  }
  ordenarArray(jogadas);
  if (jogadas[0].Jogada_Atual == jogadas[1].Jogada_Atual) {
    console.log(`A rodada empatou e não tivemos um vencedor.`);
  } else {
    console.log(
      `O jogador ${jogadas[0].Jogador.toUpperCase()} tirou ${jogadas[0].Jogada_Atual} e ganhou a ${j + 1}º rodada!`);
    jogadas[0].Placar++;
  }
  console.log(`\nConfira os resultados da ${j+1}ª rodada: `);
  tabela(jogadas);
  entradaNula = prompt(`Aperte [ENTER] para rolar os dados mais uma vez/finalizar: `);
  j++;
}
//Parte final onde é anunciado o grande campeão
console.clear();
console.log("***** FIM DE JOGO!!! ***** \n");
jogadas.sort(function (a, b) {
    return a.Placar < b.Placar ? -1 : a.Placar > b.Placar ? 1 : 0;
  }).reverse(); //Aqui foi ordenado o array de acordo com os que venceram mais rodadas

console.log(`Segue o placar atualizado na ordem dos vencedores: `);
tabela(jogadas);
if(jogadas[0].Placar==jogadas[1].Placar){
  console.log(`O jogo empatou e não tivemos um vencedor...`);
}else{ 
  console.log(`\nE O GRANDE VENCEDOR FOI ${jogadas[0].Jogador.toUpperCase()}!!!`);
}
