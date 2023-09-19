
import './App.css'
import Home from './page/Home'
import { useState } from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from './page/PokemonDetail';
function App() {
  const [dataApi,setDataApi] = useState([]);

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={ <Home dataApi={dataApi} setDataApi={setDataApi}/>}>
      </Route>
      <Route  path="/pokemon/:id" element={<PokemonDetail />}>
      </Route>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
