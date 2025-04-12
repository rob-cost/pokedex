// Creation of an array in an IIFE with Pokemon details

let pokemonRepository = (function () {
let pokemonList=[
    {
     name:'Bulbasaur',
     height:0.7, 
     type:['grass', 'poison']
    },

    {
     name:'Charmander',
     height:0.6,
     type:['fire']
    },
    
    {
     name:'Squirtle',
     height:0.5,
     type:['water']
    }
];

// Implementing two functions as keys

function add(pokemon){
    pokemonList.push(pokemon);
}

function getAll(){
    return pokemonList;
}

return {
    add: add,
    getAll: getAll
};

})();


// For.each loop that iterate in the array and print each item details

pokemonRepository.getAll().forEach( list => { 
    if (list.height > 0.6) {                                    
        document.write(` <p> Name: ${list.name} <br> Height: ${list.height} - wow, that's a big Pokemon <br> Type: ${list.type} </p>`); 
    }   
    else {
        document.write(` <p> Name: ${list.name} <br> Height: ${list.height} <br> Type: ${list.type} </p>`); 
    }  
});

