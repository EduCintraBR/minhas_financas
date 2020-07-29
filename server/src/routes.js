const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const BalancoController = require('./controllers/BalancoController')
const EntradaSaidaController = require('./controllers/EntradaSaidaController')
const CartaoController = require('./controllers/CartaoController')
const ItemController = require('./controllers/ItemController')
const ItemParController = require('./controllers/ItemParController')

const UserControl = new UserController()
const BalancoControl = new BalancoController()
const ESController = new EntradaSaidaController()
const CartaoControl = new CartaoController()
const ItemControl = new ItemController()
const ItemParControl = new ItemParController()

const Router = () => {
    routes.get('/', (request, response) => {
        response.send('Olá Mundo 2')
    })
    
    routes.get('/usuario', UserControl.index)

    //Balanco
    routes.get('/balanco', BalancoControl.index)
    routes.post('/balanco', BalancoControl.create)
    routes.put('/balanco/:id', BalancoControl.update)
    routes.delete('/balanco/:id', BalancoControl.destroy)
    
    // Cartões
    routes.get('/cartao', CartaoControl.index)
    routes.post('/cartao', CartaoControl.create)
    routes.put('/cartao/:id', CartaoControl.update)
    routes.delete('/cartao/:id', CartaoControl.destroy)

    // Fonte de renda
    routes.get('/entrada_saida', ESController.index)
    routes.put('/entrada_saida/:id', ESController.update)
    routes.post('/entrada_saida', ESController.create)
    routes.delete('/entrada_saida/:id', ESController.destroy)

    //Itens
    routes.get('/item', ItemControl.index)
    routes.post('/item', ItemControl.create)
    routes.put('/item/:id', ItemControl.update)
    routes.delete('/item/:id', ItemControl.destroy)

    //Itens parcela
    routes.get('/item-par', ItemParControl.index)
    routes.get('/item-par?id=id', ItemParControl.show)
    routes.post('/item-par', ItemParControl.create)
    routes.put('/item-par/:id', ItemParControl.update)
    routes.delete('/item-par/:id', ItemParControl.destroy)
    

    return routes
}


module.exports = Router