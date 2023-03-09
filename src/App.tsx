import { useState, useEffect } from 'react';
import { Pokemon, Form } from './types/types';
import Loader from './components/Loader';
import api from './services/api';

const App = () => {
    const [hasWon, toggleWon] = useState(false);
    const [pokemon, setPokemon] = useState<Pokemon>();
    // const [test, setTest] = useState(false);
    const [count, setCount] = useState({ hits: 0, errors: 0 });
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

        const { answer } = event.currentTarget;

        if (answer.value.replace(/\s/g, '').toLowerCase() === pokemon?.name) {
            toggleWon(true);
            alert('You won!');
            setCount({ ...count, hits: count.hits + 1 });
        } else {
            alert('Wrong answer :(');
            setCount({ ...count, errors: count.errors + 1 });
        }
    }

    const handleClick = () => {
        toggleWon(false);
        // setTest(!test);
    }

    if (loading) return <Loader />;

    return (
        <>
            <header>
                <h1>Guess Pokémon</h1>
            </header>
            
            <main>
                <h2 className='nes-text'>Who's that Pokémon?</h2> 
                <div className='guess-box'>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
                        className='pokemon-img'
                        style={{ filter: hasWon ? '' : 'brightness(0)' }}
                    />
                    {hasWon ? (
                        <div className='nes-field'>
                            <input type='text' className='nes-input is-success' value={pokemon?.name} style={{ textTransform: 'capitalize' }} readOnly />
                            <button onClick={() => location.reload()} className='nes-btn is-success'>Play again</button>
                            {/* <button onClick={handleClick} className='nes-btn is-success'>Play again</button> */}
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

                {/* <p>hits: {count.hits}, errors: {count.errors}</p> */}
                <div className='hearts'>
                    <i className='nes-icon is-large heart'></i>
                    <i className='nes-icon is-large heart is-half'></i>
                    <i className='nes-icon is-large heart is-transparent'></i>
                </div>
            </main>
        </>
    )
}

export default App;