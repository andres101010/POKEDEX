/* eslint-disable react-hooks/exhaustive-deps */
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line react/prop-types
const Home = ({dataApi,setDataApi}) => {

useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacer una solicitud GET a la API de PokéAPI para obtener datos de los primeros 20 Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=20');
        
        // Extraer los resultados de la respuesta
        const { results } = response.data;

        // Mapear los resultados para obtener más detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return {
              id: pokemonResponse.data.id,
              name: pokemonResponse.data.name,
              sprite: pokemonResponse.data.sprites.front_default,
            };
          })
        );

        // Establecer los datos en el estado
        setDataApi(pokemonDetails);
      } catch (error) {
        console.error('Error al obtener los datos de los Pokémon:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
        <Typography variant='h2' color={'red'}>Pokedex</Typography>
        <Grid container>
          <Grid item style={{display:'flex', flexWrap:'wrap',gap:'20px',padding:'0px'}}>
           {
            // eslint-disable-next-line react/prop-types
            dataApi.map((row)=>(
                <Grid item key={row.id} style={{ border: 'solid 2px red', borderRadius: '5px', maxHeight: '400px', maxWidth: '300px' }}>
                <Link to={`/pokemon/${row.id}`}>
                  <p style={{ fontSize: '30px', color: 'white' }}>ID: {row.id}</p>
                  <p style={{ fontSize: '30px', color: 'white' }}>Name: {row.name}</p>
                  <img src={row.sprite} alt={row.name} style={{ width: '200px' }} />
                </Link>
              </Grid>
            ))
           }
           
          </Grid>
        </Grid>
    </div>
  )
}

export default Home