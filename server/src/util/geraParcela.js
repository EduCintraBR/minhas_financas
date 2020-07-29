const db = require('../database/connection')

module.exports = function geraParcela (id_item, valor, dataInicial, qtdParcelas) {
    const valMes = valor / qtdParcelas
    let dataPar = dataInicial + 30

    const parcelas = []

    for (let i = 1; qtdParcelas <= qtdParcelas; i++) {
        parcelas.push({
            valor: valMes,
            dat_par: dataPar,
            id_item
        })
        dataPar = dataPar + 30 
    }
    console.log(parcelas)
}