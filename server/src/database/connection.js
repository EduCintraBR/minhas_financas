const knex = require('knex')

const dbConnection = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin',
        database: 'minhas_financas'
    }
})

module.exports = dbConnection