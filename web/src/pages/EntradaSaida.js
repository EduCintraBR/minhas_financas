import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Col, Row } from 'react-bootstrap';
import api from '../services/api'
import { FaTrash, FaEdit } from 'react-icons/fa'
import CF from 'react-currency-format';

const EntradaSaida = () => {
    const [ idEs, setIdES ] = useState(0)
    const [ entSai, setEntSai ] = useState([])
    const [ descricao, setDescricao ] = useState('')
    const [ valor, setValor ] = useState(0)
    const [ operacao, setOperacao ] = useState(1)

    useEffect(() => {
        api.get('entrada_saida').then((res) => {
            setEntSai(res.data)
        })
    }, [ idEs ])
    
    
    function handleInputDesc(value) {
        setDescricao(value)
    }
    function handleInputValor(value) {
        const val = parseFloat(value)
        setValor(val)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const entsai = { descricao, valor }

        if (operacao === 1) {
            let id = await api.post('entrada_saida', entsai)
            clearLocal()
            setIdES(id)
        } else if (operacao === 2) {
            let id = await api.put(`entrada_saida/${idEs}`, entsai)
            clearLocal()
            setIdES(id)
        }
    }
    async function handleUpdate(id, desc, valor) {
        localStorage.setItem('idES', id)
        localStorage.setItem('descES', desc)
        localStorage.setItem('valor', valor)
        handleValues()
    }
    async function handleDestroy(id) {
        api.delete(`/entrada_saida/${id}`).then(() => {
            setIdES(id)
        })
    }

    function handleValues() {
        setOperacao(2)
        const id = localStorage.getItem('idES')
        const desc = localStorage.getItem('descES')
        const valor = localStorage.getItem('valor')
        setIdES(id)
        setDescricao(desc)
        setValor(valor)
    }
    function clearLocal() {
        localStorage.removeItem('idES')
        localStorage.removeItem('descES')
        localStorage.removeItem('valor')
        setDescricao('')
        setValor(0)
        setOperacao(1)
    }

    return (
        <Container fluid="md">
            <h2 className="text-center my-4">Entradas e Saídas</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={9}>
                        <Form.Group controlId="formBasicDesc">
                            <Form.Label className="d-block font-weight-bold text-center">Descrição do Crédito/Débito</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome/descrição da sua renda ou débito" value={descricao} onChange={e => handleInputDesc(e.target.value)} required />
                        </Form.Group>
                    </Col>

                    <Col xs={3}>
                        <Form.Group controlId="formBasicVal">
                            <Form.Label className="d-block font-weight-bold text-center">Valor</Form.Label>
                            <CF 
                                value={isNaN(valor) ? '' : valor} 
                                decimalSeparator={'.'} 
                                customInput={Form.Control} 
                                onChange={e => handleInputValor(e.target.value)} 
                                required
                                />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="outline-success btn-block" type="submit">
                    Cadastrar Entrada / Saída
                </Button>
            </Form>
            <hr/>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    { entSai.map(es => (
                        <tr key={es.id}>
                            <td>{es.id}</td>
                            <td>{es.descricao}</td>
                            <td>R${es.valor}</td>
                            <td>
                                <FaEdit 
                                    size={24}
                                    onClick={() =>{handleUpdate(es.id, es.descricao, es.valor)}}
                                />
                            </td>
                            <td>
                                <FaTrash 
                                    size={24} 
                                    color="#b30000" 
                                    onClick={() =>{handleDestroy(es.id)}}    
                                /> 
                            </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default EntradaSaida