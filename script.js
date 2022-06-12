const cards = document.querySelectorAll('.card'); /*Para chamar uma classe (vem como aray)*/
const vitoria = document.getElementById('vitoria');
const movimentosVitoria = document.getElementById('movimentosvitoria');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let winContador = 0;


//this adiciona classe flip ao elemento card que estou selecionando
function flipCard() {
    if(lockBoard) return; /*Se for verdadeira só retorna (nada acontece), 
    senão tabuleiro continua normal */
    if(this === firstCard) return; /*Caso eu clique 2x na mesma carta, não ocorre nada */
  
    this.classList.add('flip'); /*Usei no css (rotate Y 180) */
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    }
    console.log(winContador);
    secondCard = this;
    hasFlippedCard = false; /*Quando chamo this, preciso zerar o unflippedCard senão sempre comparo com a mesma coisa */
    checkForMatch();
}



function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card) {
        winContador ++;
        disableCards(); /*Se forem iguais desabilito clique na carta (não faz sentido eu clicar novamente nela)*/ 
        if (winContador==6){
            setTimeout(() => {
                vitoria.style.display = 'block';
                movimentosVitoria.innerHTML = movements;
            }, 1000);
        }
        return;
    }
    movimentosVitoria.innerHTML++;
    unflipCards();
    console.log(movements);
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    /*Se cartas não forem iguais, elas precisam virar novamente*/
    lockBoard =true; /*Quando carta for virar de volta, lockBoard precisa ser trupara ninguém clicar e ocorra a comparação novamente */
    setTimeout(() => {
        firstCard.classList.remove('flip');
        /*Tirando o flip ela não vira mais, volta ao que era antes */
        secondCard.classList.remove('flip');
        resetBoard(); /*Senão não conseguiria mais jogar*/
    }, 1000); /*Leva 1000ms para executar esta função*/
}

function resetBoard(){
    /*Crio um novo array com a propried de cada um dos índices do array que estou tratando */
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
/*Embaralha as cartas*/
    cards.forEach((card) => {
        /*Para cada card, itero com o forEach*/
        let randomPosition = Math.floor(Math.random() * 12);
        /*Expressão dará valores de 0 a 11
        (Random sorteia (12 * número.até.1)
        Math.floor arredonda expressão acima) */
        card.style.order = randomPosition;
    })
})(); /*Para função ser chamada toda vez que meu código começar rodar: Imediately Invocated Function (Encapsulo função em um parenteses e chamo ela normal) */

//forEach para percorrer cada card
cards.forEach((card) => { /*para cada card do forEach adiciono EventListener*/
    card.addEventListener('click',flipCard) /*para cada card clicado, ativa função flipCard*/
});