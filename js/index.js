let pokeNombreRef = document.getElementById("pokemon-nombre");
let buscadorBtn = document.getElementById("buscador-btn");
let result = document.getElementById("resultado");
let DatosPokemon = {};

//Se Obtiene info de la API
let getPokemon = () => {
    let pokemon = pokeNombreRef.value;
    let pokemonLower=pokemon.toLowerCase();

    let pokeApi=`https://pokeapi.co/api/v2/pokemon/${pokemonLower}`
    
    //Se valida que el input tenga valores.
    if (pokemon.length <= 0) {
        result.innerHTML = `<h3 class="msg">Por favor ingrese número/nombre del Pokemón </h3>`;
    }else {
        fetch(pokeApi)
            .then(res=>res.json())            
            .then(data=>{
                //Valida que tenga info
                if (Object.keys(data).length>0) {

                 DatosPokemon={
                        img:data.sprites.other.home.front_default,
                        nombre:data.name,
                        vida:data.stats[0].base_stat,
                        experiencia:data.base_experiencie,
                        ataque:data.stats[1].base_stat,
                        defensa:data.stats[2].base_stat,
                        ataqueEsp:data.stats[3].base_stat,
                        tipo:data.types[0].type.name
                    }
                    //Armado de HTML               
                    result.innerHTML = `
                        <div class="info">
                            <img src=${DatosPokemon.img} class="imgPoke">
                            <div>
                                <h2>${DatosPokemon.nombre}</h2>
                                <div class="tipo">
                                    <h4>Tipo:</h4>
                                    <h4>${DatosPokemon.tipo}</h4>
                                </div>
                                <div class="details">
                                    <h4>Ataque:</h4>
                                    <span>${DatosPokemon.ataque}</span>
                                    <h4>Defensa:</h4>
                                    <span>${DatosPokemon.defensa}</span>
                                    <h4>Ataque Especial:</h4>
                                    <span>${DatosPokemon.ataqueEsp}</span>
                                </div>
                                
                            </div>
                           
                        </div>
                        `;
                }                   
                else {
                    result.innerHTML = `<h3 class="msg">${DatosPokemon.nombre}</h3>`;
                }
            })        
                .catch(() => {
                    result.innerHTML = `<h3 class="msg">Ha ocurrido un Error :( <br>
                        ingresa Número ó nombre correcto del Pokemón.</h3>`;
                });                   
    }
};//Fin getPokemon


buscadorBtn.addEventListener("click", getPokemon);
window.addEventListener("load", getPokemon);

