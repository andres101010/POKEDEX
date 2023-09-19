
import axios from 'axios';
import { useEffect,useState } from 'react';
// eslint-disable-next-line react/prop-types
const PokemonDetail = ({ match }) => {
  // eslint-disable-next-line no-undef
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        // eslint-disable-next-line react/prop-types
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
      }
    };

    fetchPokemonDetails();
  // eslint-disable-next-line react/prop-types
  }, [match.params.id]);

  return (
    <div>
      {pokemonData && (
        <div>
          <h1>ID: {pokemonData.id}</h1>
          <h1>Name: {pokemonData.name}</h1>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          {/* Agrega más detalles del Pokémon aquí */}
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;