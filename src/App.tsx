import { useState } from 'react';

const POKEMONS = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise',
  'caterpie',
  'metapod',
  'butterfree',
  'weedle',
  'kakuna',
  'beedrill',
  'pidgey',
  'pidgeotto',
  'pidgeot',
  'rattata',
  'raticate',
  'spearow',
  'fearow',
  'ekans',
  'arbok',
  'pikachu',
  'raichu',
  'sandshrew',
  'sandslash',
]

const MATCH = Math.floor(Math.random() * POKEMONS.length);

type Form = HTMLFormElement & {
  pokemon: HTMLInputElement;
}

const App = () => {
  const [hasWon, toggleWon] = useState(false);

  function handleSubmit(event: React.FormEvent<Form>) {
    event.preventDefault();

    const {pokemon} = event.currentTarget;

    if (pokemon.value.toLowerCase() === POKEMONS[MATCH]) {
      toggleWon(true);
      alert('You won!');
    } else {
      alert('Wrong answer :(');
    }
  }

  return (
    <div>
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${MATCH+1}.png`} 
        width={512} 
        height={512} 
        style={{imageRendering: 'pixelated', filter: hasWon ? '' : 'brightness(0)'}}
      />
      {hasWon ? (
        <button onClick={() => location.reload()} style={{width: '100%'}}>Play again</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type='text' name='pokemon' autoFocus/>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default App;