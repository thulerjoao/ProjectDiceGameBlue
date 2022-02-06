var prompt = require("prompt-sync")();

const jogadas = [];
let jogador;
let nRodadas = 0;
let nJogadores;
let j = 1;
let entradaNula;
let novamente = 1;

//função para ordenar array de acordo com o vencedor de cada rodada.
function ordenarArray(array) {
  array
    .sort(function (a, b) {
      return a.jogadaAtual < b.jogadaAtual
        ? -1
        : a.jogadaAtual > b.jogadaAtual
        ? 1
        : 0;
    })
    .reverse();
}

while(novamente == 'sim' || novamente == 's' || novamente == 1){

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
console.log(
  `Teremos ${nJogadores} jogadores participando de ${nRodadas} rodadas! \n`
);

// A parte do código a seguir é apenas para primeira rodada, que vai coletar o nome dos jogadores
for (i = 0; i < nJogadores; i++) {console.log(`Primeira Rodada - \n`);
  jogador = prompt(`Qual o nome do ${i + 1} jogador? `);
  while (jogador == "") {
    jogador = prompt(`Não é possível introduzir jogadores em vazio. Digite um nome: `);
    console.clear();
  }

  function Jogadores(nome, jogadas = Math.floor(Math.random() * 6) + 1) {
    this.nome = nome;
    this.jogadaAtual = jogadas;
    this.placar = 0;
  }
  let pessoa = new Jogadores(jogador);
  jogadas.push(pessoa);
  console.clear();
}
console.log("Os dados da primeira rodada já rolam e temos um resultado.\n");
ordenarArray(jogadas);

if (jogadas[0].jogadaAtual == jogadas[1].jogadaAtual) {
  console.log(`A primeira jogada empatou e não tivemos um vencedor.\n`);
} else {
  console.log(`O jogador ${jogadas[0].nome} tirou [${jogadas[0].jogadaAtual}] e ganhou!\n`);
  jogadas[0].placar++;
}
console.log(`Confira: `);
console.log(jogadas);

entradaNula = prompt(`Os dados estão rolando novamente!\n \nAperte [ENTER] para iniciar a próxima rodada/finalizar: `);
console.clear;
console.log(nRodadas.lenght);

// Segue o código referente a todas as rodadas após a primeira
while (j < nRodadas) {
  console.clear();
  console.log(`Rodada ${j + 1} - \n`);
  for (i = 0; i < nJogadores; i++) {
    jogadas[i].jogadaAtual = Math.floor(Math.random() * 6) + 1;
    i++;
  }
  ordenarArray(jogadas);
  if (jogadas[0].jogadaAtual == jogadas[1].jogadaAtual) {
    console.log(`A rodada empatou e não tivemos um vencedor.`);
  } else {
    console.log(
      `O jogador ${jogadas[0].nome} tirou [${jogadas[0].jogadaAtual}] e ganhou a ${j + 1}º rodada!`);
    jogadas[0].placar++;
  }
  console.log(`Confira: `);
  console.log(jogadas);
  entradaNula = prompt(`Aperte [ENTER] para rolar os dados mais uma vez/finalizar: `);
  j++;
}
//Parte final onde é anunciado o grande campeão
console.clear();
console.log("***** FIM DE JOGO!!! ***** \n");
jogadas
  .sort(function (a, b) {
    return a.placar < b.placar ? -1 : a.placar > b.placar ? 1 : 0;
  })
  .reverse(); //Aqui foi ordenado o array de acordo com os que venceram mais rodadas

console.log(`Segue o placar atualizado na ordem dos vencedores: `);
console.log(jogadas);
console.log(`\nE O GRANDE VENCEDOR FOI ${jogadas[0].nome.toUpperCase()}!!!`);


novamente = prompt(`\nDeseja jogar novamente? [s] ou [n]: `).toLowerCase();
console.clear();
while(novamente != 'sim' && novamente != 's' && novamente != 1 
            && novamente != 'não' && novamente != 'nao'&& novamente != 'n' && novamente != 0){
        console.clear();
        console.log(`!!! ATENÇÃO !!! \n`);
        novamente = prompt(`Entrada inválida. Digite [s] para recomeçar ou [n] para finalizar: `).toLowerCase();
        console.clear();
    }

}
