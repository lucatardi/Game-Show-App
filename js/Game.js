/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor() {
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
     }

     createPhrases() {
         return [
             new Phrase('blow up', 'The terrorists tried to ___ the railroad station', 'explode'),
             new Phrase('bring up', 'My mother ___ that little matter of my prison record again.', 'mention a topic'),
             new Phrase('bring up', "It isn't easy to ___ children nowadays.", 'raise children'),
             new Phrase('call off', "They ___ this afternoon's meeting", 'cancel'),
             new Phrase('do over', "___ this homework ___.", 'repeat a job'),
             new Phrase('fill out', "___ this application form and mail it in.", 'complete a form'),
             new Phrase('fill up', "She ___ the grocery cart with free food.", 'fill to capacity'),
             new Phrase('find out', "My sister ___ that her husband had been planning a surprise party for her.", 'discover'),
             new Phrase('give away', "The filling station was ___ free gas.", 'give something to someone else for free'),
             new Phrase('give back', "My brother borrowed my car. I have a feeling he's not about to ___ it ___.", 'return an object'),
             new Phrase('hand in', "The students ___ their papers and left the room.", 'submit something (assignment)'),
             new Phrase('hang up', "She ___ the phone before she hung up her clothes.", 'put something on hook or receiver'),
             new Phrase('hold up', "I hate to ___ the meeting, but I have to go to the bathroom.", 'delay'),
             new Phrase('hold up', "Three masked gunmen ___ the Security Bank this afternoon.", 'rob'),
             new Phrase('leave out', "You ___ the part about the police chase down Asylum Avenue.", 'omit')
         ];
     }

     getRandomPhrase() {
        const phrases = this.phrases;
        return phrases[Math.floor(Math.random()*phrases.length)];
     }

     startGame() {
         document.querySelector("#overlay").style.visibility = "hidden";
         this.activePhrase = this.getRandomPhrase();
         this.activePhrase.addPhraseToDisplay();
     }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */  
    checkForWin() {
        let checker = true;
        document.querySelectorAll(".letter").forEach(element => {
            if(element.classList.contains('hide')) {
                checker = false;
            }
        });
        return checker;
    }

    removeLife() {
        document.querySelector('.tries > img[src="images/liveHeart.png"]')
        .src = "images/lostHeart.png";
        this.missed ++;
        if(this.missed > 4) {
            this.gameOver();
        }
    }

    gameOver(gameWon) {
        const screen = document.querySelector("#overlay");
        const message = document.querySelector('#game-over-message');
        if(gameWon) {
            screen.className = "win";
            message.innerHTML = `<span class="key-words">${this.activePhrase.phrase}</span>
             means <span class="key-words">${this.activePhrase.meaning}</span>`;
        } else {
            screen.className = "lose";
            message.innerHTML = `The answer was <span class="key-words">${this.activePhrase.phrase}</span>
             which means <span class="key-words">${this.activePhrase.meaning}</span>`;
        }
        screen.style.visibility = "visible";
    }

    handleInteraction(button) {
        button.disabled = true;
        let buttonText = button.innerText;
        if(this.activePhrase.checkLetter(buttonText)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(buttonText);
            let youWon = this.checkForWin();
            if(youWon) {
                this.gameOver(youWon);
            }
        } else {
            button.classList.add("wrong");
            this.removeLife();
        }
    }
 }