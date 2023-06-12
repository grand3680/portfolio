var content = document.querySelectorAll(".contentCatalog");
var inputs  = document.querySelectorAll(".inputCatalog");
var active_categories = [];
var categories = []; 

// names all categories
for (let i = 0; i < inputs.length; i++) {
    categories.push(inputs[i].value);
}


// check inputs, and write message input into Array
function check() {
    active_categories = [];
    inputs.forEach(i => {
        if (i.checked) active_categories.push(i.value);
    })
    console.log(active_categories);
    getFiltred();
}


// check Entering active categories into word argument
function checkEntering(word) {
    for (let j = 0; j < active_categories.length; j++) {
        if (word == active_categories[j]) {
            return true;   
        }
    }
    return false;
}


function getFiltred() {
    content.forEach(k => {k.classList.add('hidden');})
    content.forEach(j => {if (checkEntering(j.classList[1])) j.classList.remove('hidden');})
}

