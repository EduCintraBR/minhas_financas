const express = require('express');
const cors = require('cors');
const app = express()

const routes = require('./src/routes')

app.use(express.json())
app.use(cors())
app.use(routes())

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
    console.log('Servidor is online')
})