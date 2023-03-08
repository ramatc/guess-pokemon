import { useState, useEffect } from 'react';
import { Pokemon, Form } from './types/types';
import Loader from './components/Loader';
import api from './services/api';

const App = () => {
  const [hasWon, toggleWon] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      api
        .random()
        .then(setPokemon)
        .finally(() => setLoading(false));
    }, 1500);
  }, []);
  
  const handleSubmit = (event: React.FormEvent<Form>) => {
    event.preventDefault();

    const {answer} = event.currentTarget;

    if (answer.value.replace(/\s/g, '').toLowerCase() === pokemon?.name) {
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
          <div className='nes-field'>
            <input type='text' className='nes-input is-success' value={pokemon?.name} style={{textTransform: 'capitalize'}} readOnly/>
            <button onClick={() => location.reload()} className='nes-btn is-success'>Play again</button>
          </div>
          ) : (
            <form onSubmit={handleSubmit}>
            <div className='nes-field'>
              <input type='text' id='answer' className='nes-input' placeholder='Pikachu...' autoFocus />
              <button type='submit' className='nes-btn is-primary'>Guess</button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default App;