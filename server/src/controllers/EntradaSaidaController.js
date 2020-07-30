const db = require('../database/connection')

class EntradaSaidaController {
    async index(request, response) {
        const trans = await db.transaction()

        const fr = await trans('entrada_saida').select('*').orderBy('id')
        return response.json(fr)
    }

    async show(request, response){

    }

    async create(request, response) {
        const { descricao, valor } = request.body
        const entradaSaida = {
            descricao,
            valor
        }

        const trans = await db.transaction()

        try {
            const res = await trans('entrada_saida').insert([entradaSaida], ['id'])

            trans.commit() 
            return response.status(201).json({success: 'Fonte de renda cadastrada com sucesso, Id: ' + res[0].id})
            
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ error: 'Erro: ' + error.message })
        }
    }

    async update(request, response) {
        const { id } = request.params
        const { descricao, valor } = request.body

        const entradaSaida = {
            descricao,
            valor
        }

        const trans = await db.transaction()

        try {
            const res = await trans('entrada_saida').update(entradaSaida).where('id', id)
            trans.commit()

            if (res > 0) {
                return response.status(200).json({success: 'Registro atualizado com sucesso.'})
            } else {
                return response.status(400).json({error: 'O registro não foi atualizado.'})
            }  
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ error: 'Erro : ' + error })
        }
    }

    async destroy(request, response) {
        const id_fr = request.params.id

        const trans = await db.transaction()

        try {
            const res = await trans('entrada_saida').where('id', id_fr).del()
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro excluído com sucesso.'})
            } else {
                return response.status(400).json({ error: 'Não foi possivel excluir o registro.'})
            }
            
        } catch (error) {
            trans.rollback()

            return response.status(400).json({
                error: error.message
            })
        }

    }
}

module.exports = EntradaSaidaController