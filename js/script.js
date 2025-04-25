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
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    button.classList.add('button-class');                               // style of the button
    listItem.appendChild(button);                                       // append childs to parents
    listPokemon.appendChild(listItem);
    button.setAttribute('tabindex', '0');
    button.addEventListener('click', function () {                       // shows in the console the details of the pokemon clicked
      showDetails(pokemon);
    });
  };

 
  // NAVIGATION WITH KEYBOARD
  
  let currentFocusIndex = 0;

  document.addEventListener('keydown', function (e) {
    const buttons = document.querySelectorAll('.pokemon-list .button-class');
    if (!buttons.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentFocusIndex = (currentFocusIndex + 1) % buttons.length;
      buttons[currentFocusIndex].focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentFocusIndex = (currentFocusIndex - 1 + buttons.length) % buttons.length;
      buttons[currentFocusIndex].focus();
    }

    if (e.key === 'Enter') {
      buttons[currentFocusIndex].click();
    }
  });

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
      item.imageUrl = details.sprites.other["official-artwork"].front_default;
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

    // create a modal window
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // create button element
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    // create a container for image and text
    let modalContentWrapper = document.createElement('div');
    modalContentWrapper.classList.add('modal-content-wrapper');

    // create title text element
    let titleElement = document.createElement('div');
    titleElement.innerText = title;
    titleElement.classList.add('modal-title');

    // create paragraph text element
    let contentElement = document.createElement('div');
    contentElement.innerText = text;
    contentElement.classList.add('modal-content');

    // create an image element
    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = `${title} image`;
    imageElement.classList.add('modal-img');

    // group the title and content together in one wrapper
    let textWrapper = document.createElement('div');
    textWrapper.classList.add('modal-text-wrapper');
    textWrapper.appendChild(titleElement);
    textWrapper.appendChild(contentElement);

    // wrap image and text in a container
    modalContentWrapper.appendChild(imageElement);
    modalContentWrapper.appendChild(textWrapper);

    // append childs to parents
    modal.appendChild(closeButtonElement);
    modal.appendChild(modalContentWrapper);
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
      let title = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);;
      let text = `Height: ${pokemon.height}\n\n Type: ${pokemon.types}\n\n Ability: ${pokemon.abilities}`;
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

