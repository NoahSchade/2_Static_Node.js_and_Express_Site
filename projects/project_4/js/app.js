const game = new Game;

// Hide the hearts.
let heart = document.body.querySelectorAll(".tries img");
for(let i = 0; i < heart.length; i++) {
    heart[i].style.display = 'none';
}

// When button is pressed, start the game.
document.getElementById("btn__reset").addEventListener("mousedown", function(){
    game.startGame();
});


const keys = document.querySelectorAll(".section .keyrow .key");

// When a key is clicked, execute the checkLetter and handleInteraction methods.
document.getElementById("qwerty").addEventListener("mousedown", function() {
    for(let i = 0; i < keys.length; i++) {
        if(event.target === keys[i]) {
            const mousedown = 'mousedown';
            newPhrase.checkLetter(game.activePhrase.toLowerCase(), mousedown);
            game.handleInteraction(mousedown);
        }
    }
});

// When a key is pressed, execute the checkLetter and handleInteraction methods.
document.addEventListener("keypress", function() {
    if(document.querySelector('#overlay').style.display === 'none') {
        const keypress = 'keypress';
        newPhrase.checkLetter(game.activePhrase.toLowerCase(), keypress);
        game.handleInteraction(keypress);    
    } 
});

// Prevent the user from seeing the hidden letters if they try to select the boxes.
document.body.style="user-select: none";

// App styles have been personalized.
document.body.querySelector('#overlay').style.backgroundColor = "black";
document.body.querySelector('.title').style.color = "red";
document.body.querySelector('#btn__reset').style.color = "red";
document.body.querySelector('#btn__reset').style.borderColor = "red";
document.body.querySelector('#btn__reset').style.backgroundColor = "black";
document.querySelector('.header').style.color = "red";
document.body.style.backgroundColor = "black";


// Change color of the hearts.
let liveHeart = document.querySelectorAll('img[src = "/projects/project_4/images/liveHeart.png"]');
for (let i = 0; i < liveHeart.length; i++) {
    liveHeart[i].style.filter = "hue-rotate(130deg)";
}

