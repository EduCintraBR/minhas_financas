import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Minhas Finanças</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link href="/">Balanço</Nav.Link>
            <Nav.Link href="/cartao">Cartão</Nav.Link>
            <Nav.Link href="/entrada_saida">Entrada/Saída</Nav.Link>
            <Nav.Link href="/item">Item</Nav.Link>
          </Nav>
        </Navbar>
    )
}

export default Header