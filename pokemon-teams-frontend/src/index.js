const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let pokeList = document.createElement('ul')
let edited = null;

document.addEventListener("DOMContentLoaded", function(){
    const main = document.querySelector('main')

  getTrainers();
  function getTrainers(){
      fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(data => {
            addTrainers(data)
        })
  }

  function addTrainers(trainerArray){
    trainerArray.forEach(trainer => {
        showTrainer(trainer)
    })
  }

  function showTrainer(trainer){
      let newTrainer = makeTrainer(trainer);
      main.appendChild(newTrainer)
  }

  function makeTrainer(trainer){
      let div = document.createElement('div')
      div.className = 'card';
      div['data-id'] = trainer.id;

      const name = document.createElement('p');
      name.textContent = trainer.name;

      const addButton = document.createElement('button');
      addButton.textContent = "Add Pokemon"
      addButton['data-trainer-id'] = trainer.id

      addButton.addEventListener("click", function(){
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
                addPokemonListItem(data)
            })
        }
    })
    
    let pokeList = document.createElement('ul')   
    if(!!trainer.pokemons) {
      trainer.pokemons.forEach(pokemon => {
          addPokemonListItem(pokemon)
      })
    }

      div.appendChild(name);
      div.appendChild(addButton);
      div.appendChild(pokeList);

      return div
  }


  function addPokemonListItem(pokemon){
    let li = document.createElement('li');
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    let releaseBtn = document.createElement('button');
    releaseBtn.classname = 'release'
    releaseBtn.textContent = "Release"
    releaseBtn['data-pokemon-id'] = pokemon.id
    li.appendChild(releaseBtn)
    pokeList.appendChild(li)
}


})


    // fetch(`${TRAINERS_URL}/${trainer.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         "Content-Type": 'application/json',
    //         Accept: "application/json"
    //     },
    //     body: {
    //         pokemons: newPoke
    //     }
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //     const newCard = makeTrainer(data);
    //     document.querySelector("main").replaceChild(newCard, edited)
    //   })
    // }
