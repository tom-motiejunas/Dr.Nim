'use strict';

const coins = document.querySelectorAll('.button');
let playerTurn = true;
const reaction = document.querySelector('.reaction');
let randomNumber;
const computerScore = document.querySelector('.score');
const restartBtn = document.querySelector('.restart');
const exitBtn = document.querySelector('.exit');
const rules = document.querySelector('.rules');

exitBtn.addEventListener('click', function () {
  console.log('yes');
  rules.classList.add('hidden');
});

for (let i = 0; i < coins.length; i++) {
  if (playerTurn) {
    coins[i].addEventListener('click', function () {
      if (
        !coins[i].classList.contains('clicked') &&
        rules.classList.contains('hidden')
      ) {
        if (i === 0) {
          coins[i].classList.add('clicked');
          changeTurn();
          setTimeout(function () {
            changeTurn();
            computerMove(i, i + 1);
          }, 2000);
        } else if (i === 1) {
          coins[i - 1].classList.add('clicked');
          coins[i].classList.add('clicked');
          changeTurn();
          setTimeout(function () {
            changeTurn();
            computerMove(i, i + 1);
          }, 2000);
        } else if (i === 2) {
          coins[i - 2].classList.add('clicked');
          coins[i - 1].classList.add('clicked');
          coins[i].classList.add('clicked');
          changeTurn();
          setTimeout(function () {
            changeTurn();
            computerMove(i, i + 1);
          }, 2000);
        } else {
          if (coins[i - 3].classList.contains('clicked')) {
            coins[i - 2].classList.add('clicked');
            coins[i - 1].classList.add('clicked');
            coins[i].classList.add('clicked');
            changeTurn();
            randomMessage();
            setTimeout(function () {
              changeTurn();
              computerMove(i, i + 1);
            }, 2000);
          }
        }
      }
    });
  }
}

if (playerTurn === true) {
  reaction.textContent = "It's your turn";
}

const changeTurn = function () {
  if (playerTurn) {
    randomMessage();
    playerTurn = false;
  } else {
    reaction.textContent = "It's your turn";
    playerTurn = true;
  }
  for (let i = 0; i < coins.length; i++) {
    coins[i].disabled = !coins[i].disabled;
  }
};

const computerMove = function (startingPoint, value) {
  while (value > 4) {
    value -= 4;
  }
  value = 4 - value;
  console.log(value);
  for (let i = startingPoint; i <= startingPoint + value; i++) {
    coins[i].classList.add('clicked');
    if (i === 11) {
      reaction.textContent = 'Computer won!';
      computerScore.textContent = Number(computerScore.textContent) + 1;
      restartBtn.classList.remove('hidden');
    }
  }
};

const randomMessage = function () {
  randomNumber = Math.trunc(Math.random() * 7);
  switch (randomNumber) {
    case 0:
      reaction.textContent = 'Computer is intrigued by your move';
      break;
    case 1:
      reaction.textContent = 'Computer thinks it can outsmart you!';
      break;
    case 2:
      reaction.textContent = 'Computer now plays in 4 dimensions';
      break;
    case 3:
      reaction.textContent = "Computer says: 'beep boop'";
      break;
    case 4:
      reaction.textContent = 'Computer cries in corner';
      break;
    case 5:
      reaction.textContent = 'Computer stares at you aggresively';
      break;
    case 6:
      reaction.textContent = 'Computer thinks over life choices';
      break;
  }
};

restartBtn.addEventListener('click', function () {
  for (let i = 0; i < coins.length; i++) {
    coins[i].classList.remove('clicked');
  }
  reaction.textContent = "It's your turn";
  restartBtn.classList.add('hidden');
});
