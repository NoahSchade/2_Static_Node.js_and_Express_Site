// This variable is an array of objects that contain data about the quotes.
const quotes = [
  {
    "quote": "Remember, too, that all who succeed in life get off to a bad start, and pass through many heartbreaking struggles before they \"arrive\". The turning point in the lives of those who succeed usually comes at some moment of crisis,through which they are introduced to their \"other selves\".",
    "source": "Napoleon Hill",
    "citation": "Book, Think and Grow Rich",
    "year": "1937",
    "tags": "tags: Success/Failure"
  },
  {
    "quote": "One who has loved truly, can never lose entirely. Love is whimsical and temperamental. Its nature is ephemeral, and transitory. It comes when it pleases, and goes away without warning. Accept and enjoy it while it remains, but spend no time worrying about its departure. Worry will never bring it back.",
    "source": "Napoleon Hill",
    "citation": "Book, Think and Grow Rich",
    "year": "1937",
    "tags": "tags: Love"
  },
  {
    "quote": "Every adversity, every failure, every heartbreak, carries with it the seed of an equal or greater benefit",
    "source": "Napoleon Hill",
    "citation": "Book, Think and Grow Rich",
    "year": "1937",
    "tags": "tags: Adversity, Success/Failure"
  },
  {
    "quote": "Failure is simply the opportunity to begin again, this time more intelligently.",
    "source": "Henry Ford",
    "tags": "tags: Success/Failure"
  },
  {
    "quote": "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",
    "source": "Henry Ford",
    "tags": "tags: Adversity"
  },
  {
    "quote": "Success is stumbling from failure to failure with no loss of enthusiasm",
    "source": "Winston Churchill",
    "tags": "tags: Success/Failure"
  },
  {
    "quote": "Anyone who has never made a mistake has never tried anything new.",
    "source": "Albert Einstein",
    "tags": "tags: Adversity"
  },
];




/* Both the randomNumber and prevNumber variables store a random number. The "prevNumber" variable stands for "previous number". Only the "prevNumber" 
   variable stores the random number after the loop whereas the "randomNumber" variable generates a random number inside of the loop. The loop evaluates to true
   if the "randomNumber" is the same as the "prevNumber". If they are the same then the loop generates another random number until they are not the same number.
   This is done so the random number is different from the last random number. The reason for doing this is so when I click the "Show another quote" button, 
   I get a new random quote instead of the exact same quote twice in a row.
*/
let randomNumber;
let prevNumber;
function getRandomQuote(quotes){
  do {
    randomNumber = Math.floor(Math.random() * quotes.length);
  } while (randomNumber === prevNumber);
    prevNumber = randomNumber;
    return quotes[randomNumber];
}




/*
In the "printQuote" function, html text is stored in the variable called html.
This html is printed to the screen after "printQuote" function is called.
*/
  function printQuote(){
      let randomQuote = getRandomQuote(quotes);
      let html = `<p class="quote"> ${randomQuote['quote']} </p>
                  <p class="source"> ${randomQuote['source']}`;

                  if (randomQuote['citation']) {
                  html += `<span class="citation"> ${randomQuote['citation']} </span>`;
                  }
                  if (randomQuote['year']) {
                  html += `<span class="year"> ${randomQuote['year']} </span>`;
                  }
                  if (randomQuote['tags']) {
                    html += `<br><br><span class="tags"> ${randomQuote['tags']} </span>`;
                    }
                  html += "</p>";
                  document.getElementById("quote-box").innerHTML = html;


      // This code changes the background color depending on the quote.
      if (randomQuote === quotes[0]){
        document.body.style.backgroundColor = "#2980b9";
      }
      if (randomQuote === quotes[1]){
        document.body.style.backgroundColor = "#e74c3c";
      }
      if (randomQuote === quotes[2]){
        document.body.style.backgroundColor = "#2ecc71";
      }
      if (randomQuote === quotes[3]){
        document.body.style.backgroundColor = "#8e44ad";
      }
      if (randomQuote === quotes[4]){
        document.body.style.backgroundColor = "#f1c40f";
      }
      if (randomQuote === quotes[5]){
        document.body.style.backgroundColor = "#1abc9c";
      }
      if (randomQuote === quotes[5]){
        document.body.style.backgroundColor = "#2c3e50";
      }
      return html
    
  }

  

// This code changes the quote after 10 seconds.
setInterval(function(){ printQuote() }, 20000);

// This code changes the quote after the button is clicked.
document.getElementById('loadQuote').addEventListener("click", printQuote, false);