import { useState } from 'react';
import { useEffect } from 'react';
import './card.css';


export function Card() {

  const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
  };

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 9;

  const getPokemons = async (page) => {
    const offset = page * limit;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    const PokemonsConFoto = await Promise.all(data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
        type: details.types.map(t => t.type.name).join(', '),
        ability: details.abilities.map(a => a.ability.name).join(', ')
      };
    }));

    setPokemons(PokemonsConFoto);
  };


  useEffect(() => {
    getPokemons(page);
  }, [page]);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <>
      <div className="content">
        {pokemons.map(pokemon => (
          <div style={{  borderColor: typeColors[pokemon.type.split(', ')[0]] || '#000'}} className="divcard" key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <div class="type">
              <p style={{ backgroundColor: typeColors[pokemon.type.split(', ')[0]] || '#000' }}>{pokemon.type.split(', ')[0]}</p>
              {pokemon.type.split(', ')[1] && pokemon.type.split(', ')[1] !== '' && (
                <p style={{ backgroundColor: typeColors[pokemon.type.split(', ')[1]] || '#000' }}>
                  {pokemon.type.split(', ')[1] ?? ''}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 0}>Anterior</button>
        <span>Página {page + 1}</span>
        <button onClick={nextPage}>Siguiente</button>
      </div>
    </>
  );
}