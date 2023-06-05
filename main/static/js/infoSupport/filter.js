let content = document.querySelectorAll(".contentCatalog");
let inputs  = document.querySelectorAll(".inputCatalog");

// names all categories
const categories = [];

for (let i = 0; i < inputs.length; i++) {
    categories.push(inputs[i].value);
}

var active_categories = [];

// check inputs, and write message input into Array
function check() {
    active_categories = [];
    inputs.forEach(i => {
        if (i.checked) active_categories.push(i.value);
    })
    getFiltred();
}

// check Entering active categories into word argument
function checkEntering(word) {
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < active_categories.length; j++) {
            if (categories[i] == active_categories[j] && active_categories[j] == word) {
                return true;   
            }
        }
    }
    return false;
}

function getFiltred() {
    content.forEach(k => {k.classList.add('hidden');})
    content.forEach(j => {if (checkEntering(j.classList[1])) j.classList.remove('hidden');})
}
