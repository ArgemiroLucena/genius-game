// Declaração dos Arrays
let order = [];
let clickedOrder = [];
let score = 0;
let gameover = 1;
let scorefinal = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Função para gerar as cores em ordem aleatória
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Função para acender a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 500);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 250);
}

// Função para checkar se a cor foi clicada corretamente
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            document.getElementById('status').innerHTML = "Você errou!";
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        document.getElementById('status').innerHTML = "Você acertou!";
        document.getElementById('score').innerHTML = `Pontuação Atual: ${score}`;
        nextLevel();
    }
}

// Função para capturar o clique do usuário
let clickColor = (color) => {
    if (gameover == 1) {
        alert(`Você tem que clicar em Iniciar Jogo`);
    } else {
        clickedOrder[clickedOrder.length] = color;
        createColorElement(color).classList.add('selected');
        setTimeout(() => {
            createColorElement(color).classList.remove('selected');
            checkOrder();
        },250);
    }
}

// Função que retorna a cor clicada
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// Função para gerar o próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Função para fim de jogo
let gameOver = () => {
    scorefinal = score - 1;
    gameover = 1;
    document.getElementById('game-over').innerHTML = "Game Over! Inicie um novo jogo!";
    document.getElementById('score').innerHTML = `Pontuação Final: ${scorefinal}`;
}

// Função para iniciar o jogo
let playGame = () => {
    document.getElementById('status').innerHTML = "O jogo começou!";
    document.getElementById('game-over').innerHTML = null;
    gameover = 0;
    score = 0;
    scorefinal = 0;
    order = [];
    clickedOrder = [];
    document.getElementById('score').innerHTML = `Pontuação Atual: ${score}`;

    nextLevel();
}

// Eventos de captura de clique nas cores
green.onclick = () => clickColor(0);
red.onclick = () => clickColor(1);
yellow.onclick = () => clickColor(2);
blue.onclick = () => clickColor(3);