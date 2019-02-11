/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase, example, meaning) {
        this.phrase = phrase.toLowerCase();
        this.example = example;
        this.meaning = meaning;
    }

    addPhraseToDisplay() {
        let phraseArray = this.phrase.split('');
        let innerHTML = phraseArray.reduce((acc, letter) => letter === ' ' ? 
            acc + `<li class="space"> </li> \n` : 
            acc + `<li class="hide letter ${letter}">${letter}</li> \n`
        , "");
        document.querySelector("#phrase > ul").innerHTML = innerHTML;
        document.querySelector('#example').innerText = this.example;
        document.querySelector('#banner').innerText = this.meaning;
    }
    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }
    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        document.querySelectorAll('.letter').forEach(element => {
            if(element.classList.contains(letter)) {
                element.classList.remove('hide');
                element.classList.add('show');
            }
        });
    }
 }