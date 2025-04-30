// Creation of an array in an IIFE with Pokemon details

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=50&limit=80#';

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
      item.imageUrl = details.sprites.other['official-artwork'].front_default;
      item.height = details.height;
      item.abilities = [];
      for (i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability['name']);
      }
      if (details.abilities.length > 1){
        item.abilities = item.abilities.join(', ');
      }
      item.types = details.types.map(function(typeInfo){
        return typeInfo.type.name;
      })
    }).catch(function (e) {
      console.error(e);
    });
  }

  // SHOW MODAL

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h3>' + item.name + '</h3>');
    let imageElement = $('<img class = "img-fluid">');
    imageElement.attr("alt", 'Pokemon-image');
    imageElement.attr("src", item.imageUrl);
    let heightElement = $('<div><b>Height:</b> ' + item.height + ' ft</div>');
    let abilitiesElement = $('<p><b>Ability:</b> ' + item.abilities + '</p>');
    let typesElement = $('<div class = "modal-types"></div>');

    item.types.forEach(function (type){
      let typeBadge = $('<div></div>')
        .addClass(`type-badge type-${type}`)
        .text(type);
    
      typesElement.append(typeBadge);
    });

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(typesElement);
    modalBody.append(heightElement);
    modalBody.append(abilitiesElement);
    

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
    showDetails: showDetails,
  };

})();


// SEARCH FUNCTION

$('#search-input').on('input', function(e){
  e.preventDefault();

  let searchName = $('#search-input').val().trim().toLowerCase();
  let pokeList = pokemonRepository.getAll();
  let groupList = $('.list-group');

  groupList.empty();

  let filterList = pokeList.filter(function (pokemon){
    return pokemon.name.toLowerCase().includes(searchName);
  })

  if (filterList.length > 0) {
    filterList.forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
    } else {
      groupList.append($('<li class="list-group-item text-center h3 text-dark"> No Pokemon Found </li>'));
    }
  });

// iterates inside the repository and add a list element for each object

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

