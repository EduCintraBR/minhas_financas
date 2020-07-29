const db = require('../database/connection')

class UserController{
    async index(request, response){
        const user = await db('usuario').select('*').first()
        return response.json(user)
    }
}

module.exports = UserController