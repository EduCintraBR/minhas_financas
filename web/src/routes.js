import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Balanco from './pages/Balanco'
import Cartao from './pages/Cartao'
import EntradaSaida from './pages/EntradaSaida'
import Item from './pages/Item'

const Routes = () => {
    return (
        <BrowserRouter>
           <Route component={Balanco} path="/" exact /> 
           <Route component={Cartao} path="/cartao" /> 
           <Route component={EntradaSaida} path="/entrada_saida" /> 
           <Route component={Item} path="/item" /> 
        </BrowserRouter>
    )
}

export default Routes