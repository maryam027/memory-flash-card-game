const emojis = ["🍎", "🍎", "🥝", "🥝", "🥥", "🥥", "🍇", "🍇","🍊", "🍊","🍋","🍋"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchCount = 0;
let currentRound = 1;
let timer;
let seconds = 0;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }
  function startGame() {
    resetBoard();
    generateCards();
    startTimer();
  }
  function generateCards() {
    let newEmojis = [...emojis];
    if (currentRound === 2) {
      newEmojis.push("🍒", "🍒", "🍉", "🍉");
    } else if (currentRound === 3) {
      newEmojis.push("🍏", "🍏", "🍓", "🍓", "🍍", "🍍","🥭","🥭");
    }
    cards = shuffle(newEmojis); // shuffle all the cards 
    const board = document.getElementById('game-board');
    board.innerHTML = ""; // clear the board 
    cards.forEach(symbol => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }