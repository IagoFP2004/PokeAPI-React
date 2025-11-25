import { useState } from 'react';
import { useEffect } from 'react';
import './card.css';


export function Card() {
  const [pokemons, setPokemons] = useState([]);

const getPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
    const data = await response.json();
    
    const PokemonsConFoto = await Promise.all(data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            moves: details.moves.length
        };
    }));
    
    setPokemons(PokemonsConFoto);
};

useEffect(() => {
    getPokemons();
}, []);
    return (
        <>
            <div className="content">
                {pokemons.map(pokemon => (
                    <div className="divcard" key={pokemon.id}>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <h2>{pokemon.name}</h2>
                        <p>Habilidades:</p>
                        <p>{pokemon.moves}</p>
                    </div>
                ))} 
            </div>
        </>
    );
}