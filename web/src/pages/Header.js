import React from 'react';

const Header = () => {
    return (
      <nav className="Nav">
        <div className="logo">
          MF$
        </div>
        <div id="menus">
          <ul>
            <li>
              <a href="/">Balanço</a>
            </li>
            <li>
              <a href="/cartao">Cartão</a>
            </li>
            <li>
              <a href="/entrada_saida">Entrada/Saída</a>
            </li>
            <li>
              <a href="/item">Item</a>
            </li>
          </ul>
        </div>
      </nav>

        // <Navbar className="Nav" variant="dark">
        // <Navbar.Brand href="#home">Minhas Finanças</Navbar.Brand>
        //   <Nav className="mx-auto">
        //     <Nav.Link href="/">Balanço</Nav.Link>
        //     <Nav.Link href="/cartao">Cartão</Nav.Link>
        //     <Nav.Link href="/entrada_saida">Entrada/Saída</Nav.Link>
        //     <Nav.Link href="/item">Item</Nav.Link>
        //   </Nav>
        // </Navbar>
    )
}

export default Header