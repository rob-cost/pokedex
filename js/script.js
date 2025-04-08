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
     type:'fire'
    },
    
    {
     name:'Squirtle',
     height:0.5,
     type:'water'
    }
];


for (ii = 0; ii < pokemonList.length; ii++) {               // for loop for select each obkect in the array

    if (pokemonList[ii].height > 0.6) {                     // condition to add a text only to a object with soecific value
                        
        document.write(pokemonList[ii].name + " (height: " + pokemonList[ii].height + ") " + " - Wow, that's big" +  "<br><br>" );  // print out 
    }

    else {
        
        document.write(pokemonList[ii].name + " (height: " + pokemonList[ii].height + ") " + "<br><br>" );  // print out
    }
    
}