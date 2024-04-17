const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  
  if (data) {
    //Estiliza a imagem
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    // Determinar a URL da imagem do Pokémon com base em sua geração usando operador ternário
    const spritePath = data.id < 650 ? 
    ['sprites', 'versions', 'generation-v', 'black-white', 'animated', 'front_default'] :
    ['sprites', 'versions', 'generation-v', 'black-white', 'front_default'];

    // Construir a URL da imagem do Pokémon
    let spriteUrl = data;
    for (const key of spritePath) {
      spriteUrl = spriteUrl[key];
    }

    // Definir a URL da imagem do Pokémon
    pokemonImage.src = spriteUrl;
    
    input.value = '';
    searchPokemon = data.id;

  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found!';
    pokemonNumber.innerHTML = '';

  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }

});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);

});

// Adicionar event listeners para as teclas de seta para cima e para baixo
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    // Navegar para o Pokémon anterior
    navigatePokemon(-1);
  } else if (event.key === 'ArrowRight') {
    // Navegar para o próximo Pokémon
    navigatePokemon(1);
  }

  if (event.key === 'ArrowDown') {
    // Navegar para o Pokémon anterior
    navigatePokemon(-1);
  } else if (event.key === 'ArrowUp') {
    // Navegar para o próximo Pokémon
    navigatePokemon(1);
  }
});


// Função para navegar entre os Pokémon
const navigatePokemon = (direction) => {
  const newPokemonId = searchPokemon + direction;
  if (newPokemonId >= 1) {
    renderPokemon(newPokemonId);
  }
};

// Função renderPokemon e outras partes do código...


renderPokemon(searchPokemon);