// Creation of an array in an IIFE with Pokemon details

let pokemonRepository = (function () {
let pokemonList=[];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// add function for adding pokemon

function add(pokemon){
    if ( typeof pokemon === 'object' &&
         'name' in pokemon
       )
        {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }  
}

// return the objects in the array

function getAll(){
    return pokemonList;
}

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

function showLoadingMessage() {
    document.getElementById('loading-message').style.display = 'block';
  }
  
  function hideLoadingMessage() {
    document.getElementById('loading-message').style.display = 'none';
  }
  

// load pokemons from API

function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage;
    })
  };


  // load details of Pokemon from API

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  // shows details of the pokemon chosen

function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
        console.log(pokemon)
    });  
};


return {
    add: add,
    getAll: getAll,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
};

})();


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

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });