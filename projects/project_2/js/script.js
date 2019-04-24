// Creates a variable to select the students.
let people = document.querySelectorAll(".student-item");

// Creates a div element to contain the search bar input field and button.
const divForSearch = document.createElement("DIV");
// Sets the div element's class to "student-search".
divForSearch.setAttribute("class", "student-search");
// Creates a variable to select the element with a class of "page-header". This element contains the title and search bar as children.
const page_header = document.querySelector(".page-header");
// The div element becomes a child of the "page_header". 
page_header.appendChild(divForSearch);
// An input field element is created. 
let input = document.createElement("INPUT");
// A placeholder is added to the input field.
input.setAttribute("placeholder", "Search for students...");
// The input gets a type attribute with a value of search.
input.setAttribute("type", "search");
// The input gets an id attribute with a value of "mySearch".
input.setAttribute("id", "mySearch");
// The div element gets an input field as its child.
divForSearch.appendChild(input);
// A button is created and appended to the div element.
const button = document.createElement("BUTTON");
divForSearch.appendChild(button);
// The button gets a left margin with 4 pixels.
document.querySelector("button").style.marginLeft = "4px";
// The "Search" text is added to the button. 
let search = document.createTextNode("Search");
button.appendChild(search);

// All students are given a class of "matched".
for(let i = 0; i < people.length; i++) {
    people[i].classList.add("matched");
}

// Calls three functions.
appendPageLinks();
unhighlight();
highlight();

// This function checks to see if the student's name matches what is typed into the searchbar and displays those that are a match.
const searching = function() {
    let mySearch = document.querySelector("#mySearch").value;
    let name;
    let match1;
    let match2;
    let y = 0;
    for(let i = 0; i < document.querySelectorAll(".student-details").length; i++) {
        name = document.querySelectorAll(".student-details h3")[i].textContent;
        let variable = mySearch;
        let regex = new RegExp("^" + variable + ".*");
        match1 = mySearch.match(regex);
        match2 = name.match(regex);
        document.querySelectorAll(".student-item")[i].style.display = "none";
        if(match1 && match2) {
            if(y < 10) {
                document.querySelectorAll(".student-item")[i].style.display = "block";
                document.querySelectorAll(".student-item")[i].classList.add("matched");
            } else if (y >= 10){
                document.querySelectorAll(".student-item")[i].style.display = "none";
                document.querySelectorAll(".student-item")[i].classList.add("matched");
            }
            y++
        } else {
            document.querySelectorAll(".student-item")[i].classList.remove("matched");
        }
    }
}

// This function displays the students that matched the search and matched the pagination button selected.
function showPage(num) {
    let people = document.querySelectorAll(".student-item");
    let chosenNumber = num;
    let number = (chosenNumber * 10);

       for (let i = 0; i < people.length; i++) {
           document.querySelectorAll(".student-item")[i].style.display = "none";
       }
    
       for (let i = number; i < (number + 10); i++) {
          if (i < people.length) {
              if (document.querySelectorAll(".matched")[i]) {
                document.querySelectorAll(".matched")[i].style.display = "block";
              }
          }
       }
   }

// When the search button is clicked, execute the "aSearching" function.
button.addEventListener("click", aSearching, false);
// When a key is pressed and released when the search bar is selected, execute the "aSearching" function.
document.querySelectorAll("#mySearch")[0].addEventListener("keyup", aSearching, false);
// When the search button is clicked, execute the "appendPageLinks" function.
button.addEventListener("click", appendPageLinks, false);
// When a key is pressed and released and the search bar is selected, execute the "appendPageLinks" function.
document.querySelectorAll("#mySearch")[0].addEventListener("keyup", appendPageLinks, false);


// This function creates pagination buttons and prints out a "No matches found" message if there are no students found.
function appendPageLinks() {
    let paginationLength = document.querySelectorAll(".pagination").length;
    const selectUl = document.querySelectorAll(".pagination ul");
    if (selectUl.length >= 1) {document.querySelectorAll(".pagination ul")[0].parentNode.removeChild(document.querySelectorAll(".pagination ul")[0]);}
    if (paginationLength >= 1) {document.querySelectorAll(".pagination")[0].parentNode.removeChild(document.querySelectorAll(".pagination")[0])}
    const div = document.createElement("DIV");
    div.classList.add("pagination");
    document.querySelector(".page").appendChild(div);
 
    const ul = document.createElement("UL");
    document.querySelector(".pagination").appendChild(ul);
 
    let x = document.querySelectorAll(".matched");
    let z = 0;
    for (let i = x.length - 1; i >= 0; i-=10) {
       z++;
 
       let li = document.createElement("LI");
       ul.appendChild(li);
       li.style.margin = "0 2px 0 2px";
 
       let a = document.createElement("A");
       li.appendChild(a);
       
       
       ul.firstChild.firstChild.setAttribute("class","active");
 
       number = document.createTextNode(z);
       a.appendChild(number);
       
 
 
       li.style.cursor = "pointer";
    
    }

    if(!document.querySelector(".pagination ul li a")) { 
        const noMatchesFound = document.createElement("DIV");
        noMatchesFound.innerHTML = "No matches found!";
        document.querySelector(".student-list").appendChild(noMatchesFound);
        noMatchesFound.classList.add("noMatchesFound");
        if(document.querySelectorAll(".noMatchesFound").length > 1) {
            document.querySelector(".noMatchesFound").parentNode.removeChild(document.querySelector(".noMatchesFound"));
        }
    } else {
        if(document.querySelector(".noMatchesFound")) {
            document.querySelector(".noMatchesFound").parentNode.removeChild(document.querySelector(".noMatchesFound"));
        }
    }

}

// Removes the blue background color of the pagination button when another pagination button is clicked. 
function unhighlight() {
    let link = document.querySelectorAll(".pagination ul li a");
    for(let i = 0; i < link.length; i++) {
        link[i].addEventListener("click", linkInactive, false);
        function linkInactive() {
            for(let i = 0; i < link.length; i++) {
                link[i].classList.remove("active");
            }
        }
    }
}
    

// Adds a blue background color to the pagination button clicked and executes the showPage button.
    function highlight() {
        let link = document.querySelectorAll(".pagination ul li a");
        for(let i = 0; i < link.length; i++) {
            link[i].addEventListener("click", linkActive, false);
            function linkActive() {
                link[i].classList.add("active");
                showPage(i);
            }
        }
    }

    // When a key is pressed and released and the searchbar is selected, execute the unhighlight function.
    document.querySelector("#mySearch").addEventListener("keyup", unhighlight, false);
    // When the search button is clicked, execute the unhighlight function.
    button.addEventListener("click", unhighlight, false);

    // When a key is pressed and released and the searchbar is selected, execute the highlight function.
    document.querySelector("#mySearch").addEventListener("keyup", highlight, false);
    // When the search button is clicked, execute the highlight function.
    button.addEventListener("click", highlight, false);

// This function adds a class of "active" to the pagination button clicked and displays the students that matched the search and matched the pagination button clicked.
function aSearching() {
    searching();
    let link = document.querySelectorAll(".pagination ul li a");
    for(let i = 0; i < link.length; i++) {
        link[i].addEventListener("click", linkActive, false);
        function linkActive() {
            link[i].classList.add("active");
            showPage(i);
        }  
    }
}

// Calls the aSearching function.
aSearching()
