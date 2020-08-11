import React from 'react';

const Balanco = () => {

    return (
        <React.Fragment>
            <div className="dashboard">
                <div className="titleDash">
                    <span>Balanço demonstrativo do Mês de Agosto / 2020</span>
                </div> 
            </div>
            <div className="cards">
                <div className="creditoCard">
                    <span className="titleCard">Crédito</span>
                    <span className="value">
                        R$0,00
                    </span>
                </div>
                <div className="debitoCard">
                    <span className="titleCard">Débito</span>
                    <span className="value">
                        R$0,00
                    </span>
                </div>
                <div className="saldoCard">
                    <span className="titleCard">Saldo</span>
                    <span className="value">
                        R$0,00
                    </span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Balanco