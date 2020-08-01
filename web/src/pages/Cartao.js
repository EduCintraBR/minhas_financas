import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table, Row, Col } from 'react-bootstrap'
import api from '../services/api'
import { FaTrash, FaEdit } from 'react-icons/fa'

const Cartao = () => {
    const [ operacao, setOperacao ] = useState(1)
    const [ cartao, setCartao ] = useState([])
    const [ idCartao, setIdCartao ] = useState(0)
    const [ descricao, setDescricao ] = useState('')
    const [ bandeira, setBandeira ] = useState('')
    
    useEffect(() => {
        api.get('cartao').then((res) => {
            setCartao(res.data)
        })
    }, [idCartao])
    
    function handleInputDesc(event) {
        const desc = event.target.value
        setDescricao(desc)
    }

    function handleInputBand(event) {
        const bandeira = event.target.value
        setBandeira(bandeira)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const cartao = { descricao, bandeira }
        try {
            if(idCartao === 0 && operacao === 1) {
                let id = await api.post('/cartao', cartao)
                //Apos a inserção resetar os campos
                clearLocal()
                setIdCartao(id)
            } else if(operacao === 2){
                let id = await api.put(`/cartao/${idCartao}`, cartao)
                //Apos a inserção resetar os campos
                clearLocal()
                setIdCartao(id)
            }
        } catch (error) {
            setIdCartao(0)
        }
    }

    async function handleDestroy(id) {
        api.delete(`/cartao/${id}`).then(() => {
            setIdCartao(id)
        })
    }
    async function handleUpdate(id, desc, band) {
        setOperacao(2)
        localStorage.setItem('idCartao', id)
        localStorage.setItem('descCartao', desc)
        localStorage.setItem('bandeiraCartao', band)
        handleValues()
    }

    function clearLocal(){
        localStorage.removeItem('idCartao')
        localStorage.removeItem('descCartao')
        localStorage.removeItem('bandeiraCartao')
        setDescricao('')
        setBandeira('')
    }

    function handleValues() {
        const id = localStorage.getItem('idCartao')
        const desc = localStorage.getItem('descCartao')
        const bandeira = localStorage.getItem('bandeiraCartao')
        setIdCartao(id)
        setDescricao(desc)
        setBandeira(bandeira)
    }

    return (
        <Container fluid="md">
            <h2 className="text-center my-4">Cartões</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={8}>
                        <Form.Group controlId="formBasicDesc">
                            <Form.Label className="d-block font-weight-bold text-center">Descrição do Cartão</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome ou descrição do seu cartão" value={descricao} onChange={handleInputDesc} required />
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group controlId="formBasicBand">
                            <Form.Label className="d-block font-weight-bold text-center">Bandeira</Form.Label>
                            <Form.Control type="text" placeholder="Mastercard, Visa..." value={bandeira} onChange={handleInputBand} required/>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="outline-success btn-block" type="submit">
                    Cadastrar Cartão
                </Button>
            </Form>
            <hr/>
            
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descrição</th>
                        <th>Bandeira</th>
                    </tr>
                </thead>
                <tbody>
                    { cartao.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.descricao}</td>
                            <td>{c.bandeira}</td>
                            <td>
                                <FaEdit 
                                    size={24}
                                    onClick={() =>{handleUpdate(c.id, c.descricao, c.bandeira)}}
                                />
                            </td>
                            <td>
                                <FaTrash 
                                    size={24} 
                                    color="#b30000" 
                                    onClick={() =>{handleDestroy(c.id)}}    
                                /> 
                            </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Cartao