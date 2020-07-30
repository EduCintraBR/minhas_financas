import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col, Row, Table } from 'react-bootstrap'
import CF from 'react-currency-format'
import DatePicker, { registerLocale } from 'react-datepicker'
import { FaTrash, FaEdit } from 'react-icons/fa'
import api from '../services/api'

import "react-datepicker/dist/react-datepicker.css";

//Configurando localização
import ptbr from 'date-fns/locale/pt-BR'
registerLocale('pt-BR', ptbr)

const Item = () => {
    
    const [ idItem, setIdItem ] = useState(0)
    const [ descricao, setDescricao ] = useState('')
    const [ startDate, setStartDate ] = useState(new Date());
    const [ valorTotal, setValorTotal ] = useState(0)
    const [ flgRec, setFlgRec ] = useState('N')
    const [ item, setItem ] = useState([])
    
    useEffect(() => {
        api.get('/item').then(item => {
            setItem(item.data)
        })
    }, [ idItem ])

    async function handleUpdate(id, desc, data, valor, flg) {

    }
    async function handleDestroy(idItem) {
        const id = await api.delete(`/item/${idItem}`)
        setIdItem(id)
    }

    return (
        <React.Fragment>
        <Container fluid="md">
        <h2 className="text-center my-4">Itens</h2>
            <Form onSubmit={()=>{}}>
                <Row>
                    <Col xs={12}>
                        <Form.Group controlId="formBasicDesc">
                            <Form.Label className="d-block font-weight-bold text-center">Descrição do Item</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome ou descrição do seu item" onChange={()=>{}} required />
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
                                // value={isNaN(valor) ? '' : valor} 
                                decimalSeparator={'.'} 
                                customInput={Form.Control} 
                                // onChange={e => handleInputValor(e.target.value)} 
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={{ span: 2, offset: 1 }}>
                        <Form.Group controlId="formBasicCheckbox" className="mt-4">
                            <Form.Check type="checkbox" label="Divida recorrente?" checked={true} />
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
                    </tr>
                </thead>
                <tbody>
                    { item.map(i => (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.descricao}</td>
                            <td>{i.data_compra}</td>
                            <td>{i.valor_total}</td>
                            <td>{i.flg_recorrente}</td>
                            <td>
                                <FaEdit 
                                    size={24}
                                    onClick={() =>{handleUpdate(i.id, i.descricao, i.data_compra, i.valor_total, i.flg_recorrente)}}
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