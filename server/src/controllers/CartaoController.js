const db = require('../database/connection')

class CartaoController {
    async index(request, response){
        const trans = await db.transaction()

        const cartao = await trans('cartao').select('*').orderBy('id')
        response.json(cartao)
    }

    async show(request, response){

    }

    async create(request, response){
        const { descricao, bandeira } = request.body
        const cartao = {
            descricao, 
            bandeira
        }

        const trans = await db.transaction()

        try {
            const res = await trans('cartao').insert([cartao], ['id'])
            trans.commit() 
            return response.status(201).json({
                id: res[0].id, 
                success: 'Cartão cadastrado com sucesso :)'
            })
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ 
                error: 'Erro : ' + error
            })
        }
    }

    async update(request, response){
        const { id } = request.params
        const { descricao, bandeira } = request.body

        const cartao = {
            descricao,
            bandeira
        }

        const trans = await db.transaction()

        try {
            const res = await trans('cartao').update(cartao).where('id', id)
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro atualizado com sucesso.' })
            } else {
                return response.status(400).json({ success: 'Não foi possivel atualizar o registro.' })
            }  
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ error: 'Erro : ' + error })
        }
    }

    async destroy(request, response){
        const id = request.params.id

        const trans = await db.transaction()

        try {
            const res = await trans('cartao').where('id', id).del()
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro excluído com sucesso.'})
            } else {
                return response.status(400).json({ success: 'Não foi possivel excluir o registro.'})
            }
            
        } catch (error) {
            trans.rollback()

            return response.status(400).json({
                error: 'Erro : ' + error
            })
        }
    }
}

module.exports = CartaoController