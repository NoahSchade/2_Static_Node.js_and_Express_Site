document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementsByTagName('header')[0];

  const warningBlankTextFieldDiv = document.createElement('div');
  const warningBlankTextFieldDivStyle = warningBlankTextFieldDiv.style;

  const warningDuplicateDiv = document.createElement('div');
  const warningDuplicateDivStyle = warningDuplicateDiv.style;

  const form = document.getElementById('registrar');
  const input = form.querySelector('input');

  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');



  filterLabel.textContent = "Only show those who are going";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const lis = ul.children;
      if(isChecked) {
        for (let i = 0; i < lis.length; i += 1) {
          let li = lis[i];
          const selector = li.querySelector('.select');
          if (selector.value === 'going') {
            li.style.display = '';
            selector.style.display = 'none';
          } else {
            li.style.display = 'none';
          }
        }
      } else {
        for (let i = 0; i < lis.length; i += 1) {
          let li = lis[i];
          const selector = li.querySelector('.select');
          li.style.display = '';
          selector.style.display = '';
        }
      }
  });


  function supportsLocalStorage() {
    try {
    return 'localStorage' in window && window['localStorage'] !== null;   //Check to see if browser supports localStorage
    } catch(e) {
      return false;
    }
  }

  function getRecentSearches() {
    var searches = localStorage.getItem('recentSearches'); // Get the recentSearches key's value within the localStorage object.
    if(searches) {  // If there is a value in the recentSearches key in the localStorage object.
      return JSON.parse(searches); // Transform the recentSearches key's value from a string to an object. Return the value.
    } else {
      return [];  // If there is no value in the recentSearches key then return an empty array.
    }
  }


  function saveSearchString(str) { // saveSearchString takes in one argument.
    var searches = getRecentSearches(); // searches is the object that's returned from the recentSearches key's value within the localStorage object after it's been transformed from a string to an object.
    if(!str || searches.indexOf(str) > -1) { // If the argument passed is not a string or if there is a value in the object that matches the argument.
      return false;
    }
    searches.push({}); // add the argument to the end of the searches object value key pairs.
    searches[searches.length - 1]['name'] = str;
    localStorage.setItem('recentSearches', JSON.stringify(searches)); //add the new edited searches object as a string to the localStorage object with a key of 'recentSearches'.
    return true;
  }


  function createLI(text, status, notes) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');
    const textOfSpan = appendToLI('span', 'textContent', text);
    const listCount = document.querySelector('#invitedList').childElementCount;
    const textOfSpanContent = textOfSpan.textContent;
    const select = appendToLI('select');
    select.setAttribute("class", "select");
    select.appendChild(createElement('option','textContent', 'Invited')).setAttribute("value", "invited");
    select.appendChild(createElement('option','textContent', 'Going')).setAttribute("value", "going");
    select.appendChild(createElement('option','textContent', 'Not Going')).setAttribute("value", "not going");
    select.value = status;
    textfield = appendToLI('div')
      .appendChild(createElement('textarea', 'placeholder', 'notes'));
    textfield.textContent = notes;
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === ''){
      warningBlankTextFieldDivStyle.display = 'block';
      input.value = '';
    } else {
      warningBlankTextFieldDivStyle.display = 'none';
      input.value = '';
      saveSearchString(text);
      const li = createLI(text);
      ul.appendChild(li);
      const listCount = document.querySelector('#invitedList').childElementCount;
      const textarea = document.getElementsByTagName('textarea');
        for (let i = 0; i < listCount; i++) {
            textarea[i].style.marginTop = '10px';
        }
    }
    const listCount = document.querySelector('#invitedList').childElementCount;
    let names = document.querySelectorAll('#invitedList li span');
    for (let i = 0; i < listCount - 1; i++) {
      if(names[1] === undefined) {

      } else {
        if (text === names[i].textContent) {
          warningDuplicateDivStyle.display = 'block';
          ul.removeChild(ul.lastChild);
          recentSearches = localStorage.getItem("recentSearches");
          recentSearchesObj = JSON.parse(recentSearches);
          delete recentSearchesObj[recentSearchesObj.length - 1];
          const filtered = recentSearchesObj.filter(Boolean);
          recentSearchesStr = JSON.stringify(filtered);
          localStorage.setItem('recentSearches', recentSearchesStr);
        }
      }
    }
  });

  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          const spanText = li.querySelector('span').textContent;
          function myFunction(item, index) {
            if (item['name'] === spanText) {
              delete recentSearchesObj[index];
            };
          }

          recentSearches = localStorage.getItem("recentSearches");
          recentSearchesObj = JSON.parse(recentSearches);

          recentSearchesObj.forEach(myFunction);

          const filtered = recentSearchesObj.filter(Boolean);
          recentSearchesStr = JSON.stringify(filtered);
          localStorage.setItem('recentSearches', recentSearchesStr);
          ul.removeChild(li);

        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          if (input.value === "") {
            // `element` is the element you want to wrap
          var parent = input.parentNode;
          var wrapper = document.createElement('div');
          // set the wrapper as child (instead of the element)
          parent.replaceChild(wrapper, input);
          // set element as child of wrapper
          wrapper.appendChild(span);
          wrapper.appendChild(input);

          input.setAttribute("class", "tooltip");
          span.setAttribute("class", "tooltiptext");

          span.textContent = "tooltip";
          } else {
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            button.textContent = 'edit';

            const spanText = span.textContent;
            function myFunction2(item, index) {
              var p = e.target.parentElement;
              const target = e.target;
              var indexTarget = Array.prototype.indexOf.call(ul.children, p);

              if (index === indexTarget) {
                 recentSearchesObj[index]['name'] = spanText;
              };
            }

            recentSearches = localStorage.getItem("recentSearches");
            recentSearchesObj = JSON.parse(recentSearches);

            recentSearchesObj.forEach(myFunction2);

            const filtered = recentSearchesObj.filter(Boolean);
            recentSearchesStr = JSON.stringify(filtered);
            localStorage.setItem('recentSearches', recentSearchesStr);
          }
        }
      };

      // select and run action in button's name
      nameActions[action]();
      }
    });


    header.appendChild(warningBlankTextFieldDiv);
    warningBlankTextFieldDivStyle.display = 'none';
    warningBlankTextFieldDivStyle.backgroundColor = 'red';
    warningBlankTextFieldDivStyle.height = '50px';
    warningBlankTextFieldDivStyle.width = '60%';
    warningBlankTextFieldDivStyle.textAlign = 'center';
    warningBlankTextFieldDivStyle.lineHeight = '50px';
    warningBlankTextFieldDivStyle.position = 'relative';
    warningBlankTextFieldDivStyle.top = '-104px';
    warningBlankTextFieldDivStyle.color = 'white';
    warningBlankTextFieldDivStyle.margin = 'auto';
    warningBlankTextFieldDiv.textContent = 'Text field is blank';


    input.onkeypress = function() {myFunction()};

    function myFunction() {
      warningBlankTextFieldDivStyle.display = 'none';
    }

    smallWindow = (size) => {
      if (size.matches) {
        warningBlankTextFieldDivStyle.top = '-150px';
        warningBlankTextFieldDivStyle.width = '95%';
      } else {
        warningBlankTextFieldDivStyle.top = '-104px';
        warningBlankTextFieldDivStyle.width = '60%';
      }
    }

    const size = window.matchMedia("(max-width: 768px)");
    smallWindow(size);
    size.addListener(smallWindow);

//////////////////////////////////////////////////////////////

    header.appendChild(warningDuplicateDiv);
    warningDuplicateDivStyle.display = 'none';
    warningDuplicateDivStyle.backgroundColor = 'red';
    warningDuplicateDivStyle.height = '50px';
    warningDuplicateDivStyle.width = '60%';
    warningDuplicateDivStyle.textAlign = 'center';
    warningDuplicateDivStyle.lineHeight = '50px';
    warningDuplicateDivStyle.position = 'relative';
    warningDuplicateDivStyle.top = '-104px';
    warningDuplicateDivStyle.color = 'white';
    warningDuplicateDivStyle.margin = 'auto';
    warningDuplicateDiv.textContent = 'This name has already been entered';


    input.onkeypress = function() {displayNone()};

    function displayNone() {
      warningBlankTextFieldDivStyle.display = 'none';
      warningDuplicateDivStyle.display = 'none';
    }

    smallWindow = (size) => {
      if (size.matches) {
        warningDuplicateDivStyle.top = '-150px';
        warningDuplicateDivStyle.width = '95%';
      } else {
        warningDuplicateDivStyle.top = '-104px';
        warningDuplicateDivStyle.width = '60%';
      }
    }
    smallWindow(size);
    size.addListener(smallWindow);

    // Initialize display list
    var recentSearches = getRecentSearches();
    recentSearches.forEach(function(searchString) {
      const li = createLI(searchString['name'], searchString['select'], searchString['notes']);
      ul.appendChild(li);
      const listCount = document.querySelector('#invitedList').childElementCount;
      const textarea = document.getElementsByTagName('textarea');
        for (let i = 0; i < listCount; i++) {
            textarea[i].style.marginTop = '10px';
        }
    });

    ul.addEventListener('change', (e) => {
      if (e.target.tagName === 'SELECT') {
        var p = e.target.parentElement;
        const select = e.target;
        var index = Array.prototype.indexOf.call(ul.children, p);

        var searches = getRecentSearches(); // searches is the object that's returned from the recentSearches key's value within the localStorage object after it's been transformed from a string to an object.
        searches[index]['select'] = select.value;

        localStorage.setItem('recentSearches', JSON.stringify(searches)); //add the new edited searches object as a string to the localStorage object with a key of 'recentSearches'.
      }
    });

    ul.addEventListener('input', (e) => {
      if (e.target.tagName === 'TEXTAREA') {
        var p = e.target.parentElement.parentElement;
        const textarea = e.target;
        var index = Array.prototype.indexOf.call(ul.children, p);

        var searches = getRecentSearches(); // searches is the object that's returned from the recentSearches key's value within the localStorage object after it's been transformed from a string to an object.
        searches[index]['notes'] = textarea.value;

        localStorage.setItem('recentSearches', JSON.stringify(searches)); //add the new edited searches object as a string to the localStorage object with a key of 'recentSearches'.
      }
    });

});
