const db = require('../database/connection')

class ItemController {
    async index(request, response){
        const trans = await db.transaction()

        const items = await trans('item').select('*').orderBy('id')
        return response.json(items)
    }

    async show(request, response){

    }

    async create(request, response){
        const { descricao, data_compra, valor_total, flg_recorrente } = request.body
        const item = {
            descricao,
            data_compra,
            valor_total,
            flg_recorrente
        }

        const trans = await db.transaction()

        try {
            const id = await trans('item').insert(item, ['id'])
            trans.commit()
            return response.status(201).json({ success: 'Sucesso!, id: ' + id[0].id })
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ error: error.message })
        }
    }

    async update(request, response){
        const { id } = request.params
        const { descricao, data_compra, valor_total, flg_recorrente } = request.body
        const item = {
            descricao,
            data_compra,
            valor_total,
            flg_recorrente
        }

        const trans = await db.transaction()

        try {
            const res = await trans('item').update(item).where('id', id)
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro atualizado com sucesso!' })
            } else {
                return response.status(400).json({ success: 'Não foi possível atualizar seu registro!' })
            }
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    async destroy(request, response){
        const { id } = request.params
        const trans = await db.transaction()

        try {
            const res = await trans('item').where('id', id).del()
            trans.commit()

            if (res > 0) {
                return response.status(200).json({ success: 'Registro excluído com sucesso.' })
            } else {
                return response.status(400).json({ error: 'Não foi possivel excluir o registro.' })
            }
        } catch (error) {
            trans.rollback()
            return response.status(400).json({ error: error.message })
        }
    }
}

module.exports = ItemController