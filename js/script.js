// Creation of an array in an IIFE with Pokemon details

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // ADD POKEMON

  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct');
    }
  }

  // RETURN LIST

  function getAll() {
    return pokemonList;
  }

  // ADD POKEMON TO LIST

  function addListItem(pokemon) {
    let listPokemon = document.querySelector('.pokemon-list');          // assign a variable to an unordered list
    let listItem = document.createElement('li');                        // creates a list element and assign it to a var
    let button = document.createElement('button');                      // creates a button element and assign it to a var
    button.innerText = pokemon.name;                                    // assign the button input text to the name of the pokemon
    button.classList.add('button-class');                               // style of the button
    listItem.appendChild(button);                                       // append childs to parents
    listPokemon.appendChild(listItem);
    button.addEventListener('click', function () {                       // shows in the console the details of the pokemon clicked
      showDetails(pokemon);
    });
  };

  // LOAD POKEMONS from API

  function loadList() {
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
    }).catch(function (e) {
      console.error(e);
    })
  };


  // LOAD DETAILS of Pokemon from API

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.abilities = [];
      for (i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability['name']);
      }
      if (details.abilities.length > 1){
        item.abilities = item.abilities.join(', ');
      }
      item.types = [];
      for (i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type['name']);
      }
      if (details.types.length > 1){
        item.types = item.types.join(', ');
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  // SHOW MODAL

  function showModal(title, text, imageUrl) {
    // assign a variable to html parent element
    let modalContainer = document.querySelector('#modal-container');

    // Clear all existing modal content
    modalContainer.innerHTML = '';

    // create a variable for div content
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // create button element
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // create title element
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    // create paragraph element
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    // create an image element
    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = `${title} image`;

    // append childs to parents
    modal.appendChild(closeButtonElement);
    modal.appendChild(imageElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    // makes container visible
    modalContainer.classList.add('is-visible');

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    };

    // removes modal if click outside container
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    // remove modal if ESC is pressed
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
  }

  

  // SHOW DETAILS POKEMON

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let title = pokemon.name;
      let text = `Height: ${pokemon.height}\n Type: ${pokemon.types}\n Ability: ${pokemon.abilities}`;
      let image = pokemon.imageUrl;
      showModal(title, text, image);
    });
  };


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();


// SEARCH FUNCTION

function pokemonSearch(name) {
  let pokeList = pokemonRepository.getAll();
  let nameLower = name.toLowerCase();
  let match = pokeList.filter(p => p.name.toLowerCase().includes(nameLower));
  if (match.length > 0) {
    match.forEach(pokemonRepository.showDetails);
  }
  else {
    console.log(`There is no match with that element`);
  }
};

// iterates inside the repository and add a list element for each object

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

