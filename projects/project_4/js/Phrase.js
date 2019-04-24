let keyFound = false;

class Phrase {
    // This constructor stores the phrases.
    constructor(phrase) {
        this.phrase = phrase;
    }

    // Adds the phrase to the display.
    addPhraseToDisplay() {
        for (let i = 0; i < this.phrase.length; i++) {
            let li = document.createElement("li");
            let listLetter = document.body.querySelector('#phrase ul').appendChild(li);
            if(this.phrase[i] !== ' ') {
                listLetter.classList.add('hide');
                listLetter.classList.add('letter');
                listLetter.classList.add(this.phrase[i].toLowerCase());
                let t = document.createTextNode(this.phrase[i]);
                li.appendChild(t);
            } else {
                listLetter.classList.add('hide');
                listLetter.classList.add('space');
                let t = document.createTextNode(this.phrase[i]);
                li.appendChild(t);
            }
            
        }
    }

    // Sets a random phrase to the phrase property.
    setRandomPhrase() {
        const game = new Game;
        this.phrase = game.getRandomPhrase();
        return this.phrase;
    }
    

    // Checks to see whether the letter pressed or clicked matches the phrase.
    checkLetter(holder, e) {
        let keyContent;
        let x = String.fromCharCode(event.which || event.keyCode).toLowerCase();
        if(e === 'mousedown') {
            keyContent = event.target.textContent;
        } else if(e === 'keypress') {
            let allKey = document.querySelectorAll('.key');
            for(let i = 0; i < allKey.length; i++) {
                if (x === allKey[i].textContent) {
                    keyContent = allKey[i].textContent;
                }
            }
        }
        for(let i = 0; i < holder.length; i++) {
            if (keyContent === holder[i]) {
                keyFound = true;
            }
        }
    }

    // Shows the matched letter.
    showMatchedLetter(letter) {
        const letterClass = document.body.querySelectorAll('.letter.' + letter);
        for(let i = 0; i < letterClass.length; i++) {
            letterClass[i].className = `show letter ${letter}`;
        }
    }

    
}