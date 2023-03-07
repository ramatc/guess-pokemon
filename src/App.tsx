import { useState, useEffect } from 'react';
import { Pokemon, Form } from './types';
import Loader from './components/Loader';
import api from './api';

const App = () => {
  const [hasWon, toggleWon] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .random()
      .then(setPokemon)
      .finally(() => setLoading(false));
  }, []);
  
  console.log(pokemon);

  const handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();

    const {answer} = event.currentTarget;

    if (answer.value.toLowerCase() === pokemon?.name) {
      toggleWon(true);
      alert('You won!');
    } else {
      alert('Wrong answer :(');
    }
  }

  if (loading) return <Loader />;

  return (
    <main>
      <div className='guess-box'>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
          className='pokemon-img' 
          style={{filter: hasWon ? '' : 'brightness(0)'}}
        />
        {hasWon ? (
          <button onClick={() => location.reload()} className='nes-btn is-success'>Play again</button>
          ) : (
            <form onSubmit={handleSubmit}>
            <div className='nes-field'>
              <input type='text' id='answer' className='nes-input' autoFocus placeholder='Pikachu...'/>
              <button type='submit' className='nes-btn is-primary'>Guess</button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default App;