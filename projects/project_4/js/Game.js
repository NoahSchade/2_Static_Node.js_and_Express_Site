let newPhrase = new Phrase;
let letter = document.querySelectorAll('.letter');
const hide = document.querySelector('.hide');
let previousRandomNumber = '';
let randomNumber = '';

class Game {
    // This constructor stores the number of missed guesses,
    // the phrases, the Phrase class and a random phrase.
    constructor() {
        this.missed = 0;
        this.phrases = [];
        this.activePhrase = null;
    }

    // This method creates phrases and assigns them to the phrase and phrases properties.
    createPhrases() {
        newPhrase.phrase = [];
        newPhrase.phrase.push('I like beer');
        newPhrase.phrase.push('I cannot tell');
        newPhrase.phrase.push('We went along');
        newPhrase.phrase.push('It is nighttime');
        newPhrase.phrase.push('I am on my way');
        this.phrases = newPhrase.phrase;
        return newPhrase.phrase;
    }

    // Returns a random phrase while preventing the same phrase from appearing twice in a row.
    getRandomPhrase() {
        this.createPhrases();
        previousRandomNumber = randomNumber;
        randomNumber = Math.floor(Math.random() * this.phrases.length);
        while(previousRandomNumber === randomNumber) {
            randomNumber = Math.floor(Math.random() * this.phrases.length);
        }
        return this.phrases[randomNumber];
    }

    // Checks whether a key is pressed or clicked.
    // Styles the key when letter is selected.
    // Disables the key when letter is selected. 
    // Removes a heart if the player chose the wrong letter.
    // Checks if player won every time a correct letter is chosen.
    // Checks if player lost every time an incorrect letter is chosen
    handleInteraction(e) {
        if(e === 'mousedown') {
            let key = event.target;
            let keyContent = event.target.textContent;
            key.disabled = true;
            if(keyFound === false) {
                key.classList.add("wrong");
                key.style.backgroundColor = "red";
                key.style.color = "white";
                this.removeLife();
            } else {
                newPhrase.showMatchedLetter(keyContent, e);
                key.classList.add("chosen");
                key.style.backgroundColor = "rgb(0, 204, 0)";
                key.style.color = "white";
                this.checkForWin();
            }
            keyFound = false;
        }

        if(e === 'keypress') {
            let x = String.fromCharCode(event.which || event.keyCode).toLowerCase();
            let allKey = document.querySelectorAll('.key');
            for(let i = 0; i < allKey.length; i++) {
                let key = allKey[i];
                let disabledKey = key.getAttribute("disabled");
                if (key.textContent === x) {
                    let keyContent = key.textContent;
                    key.disabled = true;
                if (keyFound === false && disabledKey === null) {
                    key.classList.add("wrong");
                    key.style.backgroundColor = "red";
                    key.style.color = "white";
                    this.removeLife();
                    key.disabled = true;
                } else if (keyFound === true && disabledKey === null) {
                    newPhrase.showMatchedLetter(keyContent, e);
                    key.classList.add("chosen");
                    key.style.backgroundColor = "rgb(0, 204, 0)";
                    key.style.color = "white";
                    this.checkForWin();
                }
                 keyFound = false;
                }       
            }
        }
    } 

    // Removes a heart and stops the game if there are no more hearts.
    removeLife() {
        let liveHeart = document.body.querySelectorAll(".tries img[src = '/projects/project_4/images/liveHeart.png']");
        let heart = document.body.querySelectorAll(".tries img");

        if(liveHeart.length !== 0) {
            heart[liveHeart.length - 1].setAttribute("src", "/projects/project_4/images/lostHeart.png");
            this.missed++;
            if (this.missed === heart.length) {
                this.gameOver();
            }
        }
    }

    // Checks if player won the game and stops the game if all the correct letters are selected.
    checkForWin() { 
        let hide = document.querySelectorAll('.hide.letter');
        if(hide.length === 0) {
            this.gameOver();
        }
    }

    // Stops the game. Shows a different message and background color depending on wether player won or lost.
    gameOver() {
        const overlay = document.body.querySelector('#overlay');
        const game_over_massage = document.body.querySelector('#game-over-message');
        let heart = document.body.querySelectorAll(".tries img");
        
        for(let i = 0; i < heart.length; i++) {
            heart[i].style.display = "none";
        }

        if(this.missed === heart.length) {
            overlay.className = 'lose';
            game_over_massage.innerHTML = 'You lost!';
        } else {
            overlay.className = 'win';
            game_over_massage.innerHTML = 'You won!';
        }

        overlay.style.display = '';
        this.missed = 0;
    }
    
    // Begins game by resetting it, styling the onscreen keys, removing the overlay, selecting a random phrase and hiding it.
    startGame() {
        let phraseUl = document.querySelector('#phrase ul');
        let key = document.querySelectorAll('.key');
        let lostHeart = document.querySelectorAll('[src = "/projects/project_4/images/lostHeart.png"]');
        let heart = document.body.querySelectorAll(".tries img");

        for(let i = 0; i < heart.length; i++) {
            heart[i].style.display = '';
        }

        phraseUl.innerHTML = '';
        
        for(let i = 0; i < key.length; i++) {
            key[i].className = "key";
            key[i].disabled = false;
            key[i].style.backgroundColor = 'black';
            key[i].style.color = 'red';
            key[i].style.borderColor = 'red';
        }

        for(let i = 0; i < lostHeart.length; i++) {
            lostHeart[i].setAttribute("src", "/projects/project_4/images/liveHeart.png");
        }

        document.body.querySelector('#overlay').style.display = 'none';
        const phrase = new Phrase;
        this.activePhrase = phrase;
        const savePhrase = this.activePhrase.setRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.activePhrase = savePhrase;

        document.body.querySelector('#overlay').style.backgroundColor = "";
        document.body.querySelector('.title').style.color = "";
        document.body.querySelector('#btn__reset').style.color = "";
        document.body.querySelector('#btn__reset').style.borderColor = "";
        document.body.querySelector('#btn__reset').style.backgroundColor = "";
    }
}
