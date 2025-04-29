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
  function flipCard() {
    if (lockBoard) return;//stops the player from flipping another card
    if (this.classList.contains('flipped')) return; //Prevents the same card from being clicked twice. If it's already flipped
  
    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    lockBoard = true;
  
    checkForMatch();//check whether the first and second cards are the same.
  }
  function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      matchCount += 2;
      resetFlip();//Resets firstCard, secondCard, and unlocks the board.
      if (matchCount === cards.length) {
        endRound();//Moves to the next round or finishes the game.
      }
    } else {
      setTimeout(unflipCards, 1000); // Flips the unmatched cards back to their hidden state, after 1 second.
    }
  }