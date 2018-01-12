const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
let missed = 0; //                                                   const ???
// FIrst Step
const startGame = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");

startGame.addEventListener("click", () => {
  changeScreen("play"); // different option
});
// Second Step
const phrases = [
  "visit my github page",
  "i live in dublin",
  "my name is luca",
  "i am a web developer",
  "i love coding"
];
// Third step
function getRandomPhraseAsArray(arr) {
  const index = Math.floor(Math.random() * arr.length);
  const charactersList = arr[index].split("");
  return charactersList;
}
// Fourth step
function addPhraseToDisplay(arr) {
  arr.forEach((letter) => {
    const li = document.createElement("li");
    li.textContent = letter;
    phrase.appendChild(li);
    if (li.textContent !== " ") {
      li.classList.add("letter");
    }
  });
}

// Fifth step
function checkLetter(btn) {
  const letterArray = document.getElementsByClassName("letter");
  let letterShowed = null;
  for(let i = 0; i < letterArray.length; i++) {
    const li = letterArray[i];
    if (li.textContent == btn.textContent) {
      li.classList.add("show");
      letterShowed = li.textContent;
    }
  }
  return letterShowed;
}

function deleteTries(missed) {
  const targetTries = document.getElementsByClassName("tries")[missed].children[0];
  targetTries.setAttribute("src","images/lostHeart.png");
}

function checkWin() {
  const showList = document.getElementsByClassName("show");
  const letterList = document.getElementsByClassName("letter");
  if (showList.length == letterList.length) {
    changeScreen("win");
  } else if (missed > 4) {
    changeScreen("lost");
  }
}

function changeScreen(how) {
  if (how == "win") {
    overlay.style.display = "";
    overlay.children[0].textContent = "You Won";
    overlay.children[1].textContent = "Restart Game";
    resetPlay();
  } else if (how == "lost") {
    overlay.style.display = "";
    overlay.children[0].textContent = "You Lost";
    overlay.children[1].textContent = "Restart Game";
    resetPlay();
  } else {
    overlay.style.display = "none";
    overlay.children[0].textContent = "Wheel of Success";
    overlay.children[1].textContent = "Start Game";
    resetPlay()
  }
}

function resetPlay() {
  missed = 0;

  const tries = document.getElementsByClassName("tries");
  for(let i = 0; i < tries.length; i++) {
    tries[i].setAttribute("src","images/liveHeart.png");
  }

  const buttonList = document.getElementsByTagName("BUTTON");

  while(phrase.firstChild) {
    phrase.removeChild(phrase.firstChild);
  }

  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].removeAttribute("disabled");
    buttonList[i].classList.remove("chosen");
  }
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}

qwerty.addEventListener("click", (event) => {
  const button = event.target;
  if (button.className !== "chosen" & button.tagName == "BUTTON") {
    button.classList.add("chosen");
    button.setAttribute("disabled", "true");
    const letterFound = checkLetter(button);
    if (letterFound == null) {
      deleteTries(missed);
      missed += 1;
    }
    checkWin();
  }
});
