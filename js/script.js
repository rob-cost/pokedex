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


    function printArrayDetails(list) {                                  // declaring a function
        for (ii = 0; ii < list.length; ii++) {               // for loop for select each obkect in the array
            if (list[ii].height > 0.6) {                     // condition to add a text only to a object with soecific value                   
                document.write(` <p> ${list[ii].name} (height: ${list[ii].height}) - Wow, that's big </p>`);      // print out result
            }
            else {
                document.write(` <p> ${list[ii].name} (height: ${list[ii].height}) </p>` );  // print out result
             } 
        }
    }



printArrayDetails(pokemonList);