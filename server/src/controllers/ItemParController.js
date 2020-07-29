const db = require('../database/connection')
const gera = require('../util/geraParcela')

class ItemParController {
    async index(request, response){
        const itemPar = await db('item_par').select('*')
        return response.json(itemPar)
    }

    async show(request, response){
        const params = request.query
        console.log(params)
    }

    async create(request, response){
        // const dados = request.body

        // const trans = await db.transaction()

        gera(1, 650, '01/11/2019', 10)

    }

    async update(request, response){

    }

    async destroy(request, response){

    }
}

module.exports = ItemParController