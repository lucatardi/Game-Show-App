/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

function clickOnStart() {
    // reset part
    document.querySelector("#phrase > ul").innerHTML = "";
    document.querySelectorAll('.key').forEach(element => {
            element.classList.remove('chosen');
            element.classList.remove('wrong');
            element.disabled = false;
            console.log(element)
        }
    );
    document.querySelectorAll('.tries > img[src="images/lostHeart.png"]')
    .forEach(element => {
        element.src = "images/liveHeart.png";
    });
    // end reset part
    game = new Game();
    game.startGame();
}

function clickOnLetter(event) {
    if(event.target.innerText.length === 1) {
        game.handleInteraction(event.target);

    };
}

document.querySelector('#btn__reset').addEventListener(
    'click', clickOnStart
);

document.querySelector("#qwerty").addEventListener(
    'click', clickOnLetter
);
