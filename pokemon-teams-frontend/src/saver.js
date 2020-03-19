addButton.addEventListener("click", function(){
    if (!trainer.pokemons || trainer.pokemons.length <6){
      fetch(POKEMONS_URL)
      .then(resp => resp.json())
      .then(data => {
          console.log(data)
          let rando = data[Math.floor(Math.random() * data.length)];
          console.log(rando)
          addPokemonListItem(rando)
          let li = document.createElement('li');
          li.textContent = `${rando.nickname} (${rando.species})`
          let releaseBtn = document.createElement('button');
          releaseBtn.classname = 'release'
          releaseBtn.textContent = "Release"
          releaseBtn['data-pokemon-id'] = rando.id
          pokeList.appendChild(li)
          console.log(trainer.pokemons)
      })
  }
      // .then(rando => postPokemon(rando, trainer))
      // edited = div;
})

function postPokemon(pokemon, trainer){
    // if (!!trainer.pokemon){
    //     newPoke = trainer.pokemons.push(pokemon)
    // } else {
    //     newPoke = [pokemon]
    // }
    if (!trainer.pokemons || trainer.pokemons.length <6){
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
})