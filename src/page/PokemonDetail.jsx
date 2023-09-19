import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

const PokemonDetail = () => {
  const [pokemonData, setPokemonData] = useState(null); // Cambia a null en lugar de un arreglo []
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  // Verifica si pokemonData es nulo antes de renderizar
  if (!pokemonData) {
    return <div>Cargando...</div>;
  }
  const abilidades = pokemonData.abilities
  const tipo = pokemonData.types
  const estadisticas  = pokemonData.stats
 
  return (
    <div style={{display:'flex'}}>
      <h1 style={{ color: 'white',margin:'auto' }}>Name: {pokemonData.name}</h1>
      <h1 style={{ color: 'white',position:'absolute' }}>ID: {pokemonData.id}</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} style={{ height: '400px', width: '400px' }} />
      <Grid container style={{ border: 'solid 2px red', borderRadius: '5px', display:'block' }}>
         
        {
            abilidades.map((ability, index) => (
            <div key={index}>
              <h1 style={{ color: 'white' }}>Ability: {ability.ability.name}</h1>
              <p style={{ color: 'white' }}>Is Hidden: {ability.is_hidden ? 'Yes' : 'No'}</p>
            </div>
          ))}
        {
            tipo.map((type, index) => (
            <div key={index}>
              <h1 style={{ color: 'white' }}>Type: {type.type.name}</h1>
            </div>
          ))}
              {estadisticas && estadisticas.length > 0 && estadisticas.map((stat, index) => (
                 <div key={index}>
                 <h1 style={{ color: 'white' }}>Stat {index + 1}: {stat.base_stat}</h1>
             </div>
         ))}

      </Grid>
      
    </div>
  );
};

export default PokemonDetail;