// Creation of an array in an IIFE with Pokemon details

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=50&limit=50#';

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
    let listPokemon = $('.list-group');         
    let listItem = $('<li></li>');                       
    let button = $('<button></button>');  

    button.text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
    listItem.addClass('list-group-item');
    button.addClass('btn btn-block');               
    listItem.append(button);                               
    listPokemon.append(listItem);
    button.attr('tabindex', '0');
    button.on('click', function () {       
      showDetails(pokemon);
      $('#exampleModal').modal('show');
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

  // FETCH POKEMONS from API

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


  // FETCH DETAILS of Pokemon from API

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

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h3>' + item.name + '</h3>');
    let imageElement = $('<img class = "img-fluid">');
    imageElement.attr("alt", "Responsive image");
    imageElement.attr("src", item.imageUrl);
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    let abilitiesElement = $('<p>' + 'Ability : ' + item.abilities + '</p>');
    let typesElement = $('<p>' + 'Types : ' + item.types + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(abilitiesElement);
    modalBody.append(typesElement);

  }

  // SHOW DETAILS POKEMON

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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

