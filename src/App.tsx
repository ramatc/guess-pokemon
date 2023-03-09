import { useState, useEffect } from 'react';
import { Pokemon, Form } from './types/types';
import Loader from './components/Loader';
import api from './services/api';

import win from './assets/audios/win.mp3';
import lose from './assets/audios/lose.mp3';

const App = () => {
    const [hasWon, toggleWon] = useState(false);
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [game, setGame] = useState<boolean>(true);
    const [errors, setErrors] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const winAudio = new Audio(win);
    const loseAudio = new Audio(lose);

    useEffect(() => {
        setTimeout(() => {
            api
                .random()
                .then(setPokemon)
                .finally(() => setLoading(false));
        }, 1500);
    }, [game]);
    
    const handleSubmit = (event: React.FormEvent<Form>) => {
        event.preventDefault();

        const { answer } = event.currentTarget;
        
        if(answer.value === '' || answer.value.startsWith(' ')) return;

        if (answer.value.replace(/\s/g, '').toLowerCase() === pokemon?.name) {
            winAudio.play();
            winAudio.volume = 0.3;
            toggleWon(true);
        } else {
            loseAudio.play();
            loseAudio.volume = 0.3;
            setErrors(prev => prev + 1);
            event.currentTarget.answer.value = '';
        }
    }

    const handleClick = () => {
        setLoading(true);
        toggleWon(false);
        setGame(!game);
        setErrors(0);
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
                        style={{ filter: hasWon || errors === 3 ? '' : 'brightness(0)' }}
                    />
                    
                    {hasWon || errors === 3 ? (
                        <div className='nes-field'>
                            <input type='text' className={`nes-input ${errors === 3 ? 'is-error': 'is-success'}`} value={pokemon?.name} style={{ textTransform: 'capitalize' }} readOnly />
                            <button onClick={handleClick} className={`nes-btn ${errors === 3 ? 'is-error': 'is-success'}`}>Play again</button>
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

                <div className='hearts'>
                    <i className={`nes-icon is-large heart ${errors > 2 && 'is-transparent'}`}></i>
                    <i className={`nes-icon is-large heart ${errors > 1 && 'is-transparent'}`}></i>
                    <i className={`nes-icon is-large heart ${errors > 0 && 'is-transparent'}`}></i>
                </div>
            </main>

            <div className='lists'>
                <ul className='nes-list is-disc'>
                    {errors > 0 && !hasWon && <li>The name starts with: {pokemon?.name[0].toUpperCase()}</li>}
                    {errors > 1 && !hasWon && <li>The name ends with: {pokemon?.name[pokemon.name.length-1]}</li>}
                    {errors > 2 && !hasWon && <li>The pokémon is <span>{pokemon?.name}</span></li>}
                </ul>
            </div>
        </>
    )
}

export default App;