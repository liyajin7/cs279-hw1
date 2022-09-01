// SELECTORS

// to-do submission
document.querySelector('form').addEventListener('submit', handleSubmitForm);
    // document.querySelector retrieves reference to the <form> element
    // addEventListener registers handleSubmitForm event handler function to handle "submit" <form> event

// to-do completion / discarding
document.querySelector('ul').addEventListener('click', handleClickDiscardOrCheck);
    // anytime list output is clicked, runs event handler that handles to-do completion/discarding

// clearing all to-dos
document.getElementById('clearAll').addEventListener('click', handleClearAll);


// EVENT HANDLERS
function handleSubmitForm(event) {
    event.preventDefault();                         // makes sure default form submission behavior (of browser) doesn't take place
    let input = document.querySelector('input');    // retrieves ref to info inputted through form via info
    if (input.value != '')
        addToDo(input.value);
    input.value = '';                               // resets input's value to empty string
}

function handleClickDiscardOrCheck(event) {          // runs relevant helper depending on whether click comes from complete or discard button
    if (event.target.name == 'completeButton')
        completeToDo(event);
    if (event.target.name == 'discardButton')
        discardToDo(event);
}


// HELPER FUNCS
function addToDo(toDo) {
    let ul = document.querySelector('ul');          // retrieves ref to the ul element, stored in ul var
    let li = document.createElement('li');          // creates new li element containing output for each to-do entry, stored in li var
    li.innerHTML = `
        <span class="to-do-item">${toDo}</span>
        <button name="completeButton"><i class="fas fa-check-square"></i></button>
        <button name="discardButton" ><i class="fas fa-trash"></i></button> 
    `;                                              // insert inner HTML code for the li element; insert to-do-item text (input to function) within to-do, which also contains complete & discard buttons
    // FFD4D4. ; onmouseover="this.style.backgroundColor='#E50000'" onmouseout="this.style.backgroundColor=''"
    li.classList.add('to-do-list-item');
    ul.appendChild(li);                             // new li element added as child of ul element so it becomes visible in browser
}

function completeToDo(event) {
    let item = event.target.parentNode;                      // retrieves ref to parent node AKA list item to apply line-through text style to current item
    if (item.style.textDecoration == 'line-through') {
        item.style.textDecoration = 'none';
        // item.style.color = grey;
    }
    else
        item.style.textDecoration = 'line-through';
}

function discardToDo(event) {
    let item = event.target.parentNode;
    item.addEventListener('transitionend', function () {     // registers event handler function for CSS transition event for this node
        item.remove();
    } );

    item.classList.add('to-do-list-item-fall');
}

function handleClearAll() {
    document.querySelector('ul').innerHTML = '';
}