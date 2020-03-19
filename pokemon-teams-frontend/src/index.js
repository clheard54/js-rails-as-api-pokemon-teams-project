
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
      div.id = trainer.id;

      const name = document.createElement('p');
      name.textContent = trainer.name;

      const addButton = document.createElement('button');
      addButton.textContent = "Add Pokemon"
      addButton['data-trainer-id'] = trainer.id

      addButton.addEventListener("click", function(){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": trainer.id
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if (!pokeList.children || pokeList.children.length < 6){
                addPokemonListItem(data)}
            })
    })
    
    let pokeList = document.createElement('ul')   
    if(!!trainer.pokemons) {
      trainer.pokemons.forEach(pokemon => {
        if (!pokeList.children || pokeList.children.length < 6){
        addPokemonListItem(pokemon)}
    })
    }

    function addPokemonListItem(pokemon){
        let li = document.createElement('li');
        li.textContent = `${pokemon.nickname} (${pokemon.species})`
        li.id = pokemon.id
        let releaseBtn = document.createElement('button');
        releaseBtn.className = 'release'
        releaseBtn.textContent = "Release"
        
        releaseBtn.addEventListener("click", function(){
            const deleter = document.getElementById(`${pokemon.id}`)
            console.log(deleter)
            fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                method: "DELETE",
            })
            .then(resp => resp.json())
            .then(() => deleter.parentElement.removeChild(deleter));
        })
    
        li.appendChild(releaseBtn)
        pokeList.appendChild(li)
    }



      div.appendChild(name);
      div.appendChild(addButton);
      div.appendChild(pokeList);

      
    return div
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
