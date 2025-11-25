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
        <button onClick={prevPage} disabled={page === 0}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg></button>
        <span> {page + 1}</span>
        <button onClick={nextPage}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg></button>
      </div>
    </>
  );
}