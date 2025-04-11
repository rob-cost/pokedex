// Creation of an array with Pokemon details

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

// Loop which iterate with the array and print each item details

pokemonList.forEach ( list => {                                     
        document.write(` <p> Name: ${list.name} <br> Height: ${list.height} <br> Type: ${list.type} </p>`);      
})

