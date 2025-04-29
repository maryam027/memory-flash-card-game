const emojis = ["🍎", "🍎", "🥝", "🥝", "🥥", "🥥", "🍇", "🍇"];
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

  function resetFlip() {
    [firstCard, secondCard] = [null, null]; // reset first and second cards 
    lockBoard = false; // unlock the board 
  }
  
  function unflipCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetFlip();
  }
  
  function endRound() {
    clearInterval(timer);
    const message = document.getElementById('message');
    if (currentRound < 3) {
      message.textContent = `Round ${currentRound} Complete! Moving to next round...`;
      setTimeout(() => {
        currentRound++;
        document.getElementById('round').textContent = `Round: ${currentRound}`;
        startGame();
        message.textContent = "";
      }, 2000);
    } else {
      message.textContent = "Congratulations! You completed all rounds!";
    }
  }

   
  function startTimer() {
    clearInterval(timer);
    seconds = 0;
    timer = setInterval(() => {
      seconds++;
      document.getElementById('timer').textContent = `Time: ${seconds}s`;
    }, 1000);
  }
  
  function resetBoard() {
    matchCount = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }
  
  document.getElementById('reset-button').addEventListener('click', () => {
    clearInterval(timer);
    currentRound = 1;
    document.getElementById('round').textContent = `Round: ${currentRound}`;
    document.getElementById('message').textContent = "";
    startGame();
  });
  
  window.onload = startGame;