const db = require('../database/connection')

class BalancoController {
    async index(request, response){
        const balanco = await db('balanco').select('*')
        response.json(balanco)
    }

    async show(request, response){

    }

    async create(request, response){
        const { mes, ano, credito, debito, saldo } = request.body
        const balanco = {
            mes,
            ano,
            credito,
            debito,
            saldo
        }

        const trans = await db.transaction()
        try {
            const id = await trans('balanco').insert(balanco, ['id'])
            trans.commit()
            return response.status(201).json({ success: 'Sucesso!, ID: ' + id[0].id})
        } catch (error) {
            trans.rollback()
            return response.status(400).json({
                error: 'Erro: ' + error
            })
        }
    }

    async update(request, response){
        const { id } = request.params
        const { mes, ano, credito, debito, saldo } = request.body

        const balanco = {
            mes,
            ano,
            credito,
            debito,
            saldo
        }
        const trans = await db.transaction()

        try {
            const res = await trans('balanco').update(balanco).where('id', id)            
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro atualizado com sucesso!' })
            } else {
                return response.status(400).json({ error: 'O registro não foi atualizado. '})
            }
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    async destroy(request, response){
        const { id } = request.params
        const trans = await db.transaction()

        try {
            const res = await trans('balanco').where('id', id).del()
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro excluído com sucesso.'})
            } else {
                return response.status(400).json({ error: 'Não foi possivel excluir o registro.'})
            }
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ error: error.message })
        }
    }
}

module.exports = BalancoController