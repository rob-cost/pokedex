// Creation of an array in an IIFE with Pokemon details

let pokemonRepository = (function () {
let pokemonList=[
    {
     name: 'Bulbasaur',
     height: 0.7, 
     type:['grass', 'poison']
    },

    {
     name: 'Charmander',
     height: 0.6,
     type:['fire']
    },
    
    {
     name: 'Squirtle',
     height: 0.5,
     type:['water']
    }
];

// add function for adding pokemon

function add(pokemon){
    console.log(typeof pokemon === 'object');
    console.log(Object.keys(pokemon).includes('name'));
    if (typeof pokemon === 'object'
        && Object.keys(pokemon).includes('name')
        && pokemon['name']
        && Object.keys(pokemon).includes('type')
        && pokemon['type']
        && Object.keys(pokemon).includes('height')
        && pokemon['height']
    ) {
        pokemonList.push(pokemon);
    }
    else {
        alert(`please insert the right value`)
    };
}

// return the objects in the array

function getAll(){
    return pokemonList;
}

// shows details of the pokemon chosen

function showDetails(pokemon) {
    console.log(pokemon);
};

// add a pokemon to an unordered list and creates a button for it
 
function addListItem(pokemon){
    let listPokemon = document.querySelector('.pokemon-list');          // assign a variable to an unordered list
    let listItem = document.createElement('li');                        // creates a list element and assign it to a var
    let button = document.createElement('button');                      // creates a button element and assign it to a var
    button.innerText = pokemon.name;                                    // assign the button input text to the name of the pokemon
    button.classList.add('button-class');                               // style of the button
    listItem.appendChild(button);                                       // append childs to parents
    listPokemon.appendChild(listItem);
    button.addEventListener('click', function (){                       // shows in the console the details of the pokemon clicked
        showDetails(pokemon);
    } );
};


return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
};

})();

// Adding a new Pokemon with add function

pokemonRepository.add({
    name: 'Pikachu',
    height: 0.5,
    type: ['electric']
});

// adding a search function

function pokemonSearch (name) {
    let pokeList = pokemonRepository.getAll();
    let nameLower = name.toLowerCase();
    let match = pokeList.filter(p => p.name.toLowerCase().includes(nameLower));
    if (match.length>0) {
        match.forEach(pokemonRepository.showDetails);
    }
    else {
        console.log(`There is no match with that element`);
    }
};



// iterates inside the repository and add a list element for each object

pokemonRepository.getAll().forEach(function (pokemon) { 
    pokemonRepository.addListItem(pokemon);
    
});



