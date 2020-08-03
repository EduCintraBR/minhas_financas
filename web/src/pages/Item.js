import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col, Row, Table } from 'react-bootstrap'
import CF from 'react-currency-format'
import DatePicker, { registerLocale } from 'react-datepicker'
import { FaTrash, FaEdit } from 'react-icons/fa'
import api from '../services/api'

import "react-datepicker/dist/react-datepicker.css";

//Configurando localização
import ptbr from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
registerLocale('pt-BR', ptbr)

const Item = () => {
    
    const [ idItem, setIdItem ] = useState(0)
    const [ descricao, setDescricao ] = useState('')
    const [ startDate, setStartDate ] = useState(new Date());
    const [ valorTotal, setValorTotal ] = useState(0)
    const [ flgRec, setFlgRec ] = useState('N')
    const [ flgParc, setFlgParc ] = useState(false)
    const [ operacao, setOperacao ] = useState(1)
    const [ item, setItem ] = useState([])
    
    useEffect(() => {
        api.get('/item').then(item => {
            setItem(item.data)
        })
    }, [ idItem ])

    function handleInputDesc(value) {
        setDescricao(value)
    }
    function handleInputValor(value) {
        setValorTotal(value)
    }
    function handleCheckRec(event) {
        event.target.checked ? setFlgRec('S') : setFlgRec('N')
    }
    function handleChekParc(event){
        event.target.checked ? setFlgParc(true) : setFlgParc(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const item = {
            descricao,
            data_compra: startDate,
            valor_total: valorTotal,
            flg_recorrente: flgRec,
            flg_parcelado: flgParc
        }
        
        if (operacao === 1) {
            let id = await api.post('/item', item)
            clearLocal()
            setIdItem(id)  
        } else if (operacao === 2) {
            let id = await api.put(`/item/${idItem}`, item)
            clearLocal()
            setIdItem(id)
        }
    }

    async function handleUpdate(id, desc, data, valor, flgRec, flgParc) {
        setOperacao(2)
        let DC = parseISO(data)
        DC = DC.toISOString()
        localStorage.setItem('idItem', id)
        localStorage.setItem('descItem', desc)
        localStorage.setItem('data_compra', DC)
        localStorage.setItem('valTotItem', valor)
        localStorage.setItem('flgRec', flgRec)
        localStorage.setItem('flgParc', flgParc)
        handleValues()
    }
    async function handleDestroy(idItem) {
        const id = await api.delete(`/item/${idItem}`)
        setIdItem(id)
    }

    function clearLocal(){
        localStorage.removeItem('idItem')
        localStorage.removeItem('descItem')
        localStorage.removeItem('data_compra')
        localStorage.removeItem('valTotItem')
        localStorage.removeItem('flgRec')
        localStorage.removeItem('flgParc')
        setDescricao('')
        setStartDate(new Date())
        setValorTotal(0)
        setFlgRec('N')
        setFlgParc(false)
        setOperacao(1)
    }

    function handleValues() {
        const id = localStorage.getItem('idItem')
        const desc = localStorage.getItem('descItem')
        const data_compra = localStorage.getItem('data_compra')
        const valor_total = localStorage.getItem('valTotItem')
        const flgRec = localStorage.getItem('flgRec')
        const flgParc = localStorage.getItem('flgParc')
        setIdItem(id)
        setDescricao(desc)
        setStartDate(new Date(data_compra))
        setValorTotal(valor_total)
        setFlgRec(flgRec)
        setFlgParc(flgParc)
    }

    return (
        <React.Fragment>
        <Container fluid="md">
        <h2 className="text-center my-4">Itens</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12}>
                        <Form.Group controlId="formBasicDesc">
                            <Form.Label className="d-block font-weight-bold text-center">Descrição do Item</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome ou descrição do seu item" onChange={e => handleInputDesc(e.target.value)} value={descricao} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Form.Group controlId="formBasicDtCompra">
                            <Form.Label className="d-block font-weight-bold text-center">Data de Compra</Form.Label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                locale='pt-BR'
                                customInput={<Form.Control />}
                                isClearable
                                />
                        </Form.Group>
                    </Col>

                    <Col md={{ span: 3, offset: 1 }}>
                        <Form.Group controlId="formBasicVal">
                            <Form.Label className="d-block font-weight-bold text-center">Valor Total</Form.Label>
                            <CF 
                                value={isNaN(valorTotal) ? '' : valorTotal} 
                                decimalSeparator={'.'} 
                                customInput={Form.Control} 
                                onChange={e => handleInputValor(e.target.value)} 
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={{ span: 2, offset: 1 }}>
                        <Form.Group controlId="formBasicCheckRec" className="mt-4">
                            <Form.Check type="checkbox" label="Divida recorrente?" onChange={handleCheckRec} checked={ flgRec === 'S' ? true : false } />
                        </Form.Group>
                    </Col>

                    <Col md={{ span: 2, offset: 1 }}>
                        <Form.Group controlId="formBasicCheckParc" className="mt-4">
                            <Form.Check type="checkbox" label="Compra parcelada?" onChange={handleChekParc} checked={ flgParc } />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Button variant="outline-success btn-block" type="submit">
                    Cadastrar Item
                </Button>
            </Form>
        </Container>
        
        <Container fluid>
            <Table className='mt-5' responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Data da Compra</th>
                        <th>Valor Total</th>
                        <th>Dívida Recorrente?</th>
                        <th>Compra Parcelada?</th>
                    </tr>
                </thead>
                <tbody>
                    { item.map(i => (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.descricao}</td>
                            <td>{i.data_compra}</td>
                            <td>{i.valor_total}</td>
                            <td>{i.flg_recorrente === 'S' ? 'Sim' : 'Não'}</td>
                            <td>{i.flg_parcelado === true ? 'Sim' : 'Não'}</td>
                            <td>
                                <FaEdit 
                                    size={24}
                                    onClick={() =>{handleUpdate(i.id, i.descricao, i.data_compra, i.valor_total, i.flg_recorrente, i.flg_parcelado)}}
                                />
                            </td>
                            <td>
                                <FaTrash 
                                    size={24} 
                                    color="#b30000" 
                                    onClick={() =>{handleDestroy(i.id)}}    
                                /> 
                            </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
        </React.Fragment>
    )
}

export default Item